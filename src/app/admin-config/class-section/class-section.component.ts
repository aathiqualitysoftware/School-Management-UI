import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Constants } from '../../util/constants';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../environment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ClassSectionApiService } from './class-section-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-class-section',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ButtonModule, ConfirmPopupModule, TableModule, Button, FormsModule, DialogModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './class-section.component.html',
  styleUrl: './class-section.component.css'
})
export class ClassSectionComponent {
  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';
  sections: any[] = [];
  classes: any[] = [];
  selectedsection: any;
  constructor(
    private router: Router, private fb: FormBuilder, private messageService: MessageService, private sectionApiService: ClassSectionApiService,
    private environment: EnvironmentService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    if (history.state.isPageReload) {
      if (history.state.backPageData) {
        let backPageData = history.state.backPageData;
        this.sections = backPageData.sections;
        if (history.state?.user) {
          this.sections.forEach((user, index) => {
            if (user.id == history.state.user.id) {
              this.sections[index] = history.state.user;
            }
          });
        }
        this.sections = backPageData.sections;
        this.classes = backPageData.classes;
        this.tableMultiSortingMetaData = backPageData.tableMultiSortingMetaData;
        this.tableRows = backPageData.tableRows;
        this.searchText = backPageData.searchText;

        setTimeout(() => {
          this.searchText = backPageData.searchText;
          this.applyGlobalFilter(this.searchText, 'contains');
          let backPageState: any = { backPageData: this.getCurrentPageState() };
          history.replaceState(backPageState, "", window.location.href);
        }, 50);
      } else {
        this.onloaddata();
      }
    } else {
      this.onloaddata();
    }
  }

  onloaddata() {
    forkJoin({
      classes: this.sectionApiService.getAllMasterData(),
      sections: this.sectionApiService.getsectiondata()
    }).subscribe(({ classes, sections }: any) => {
      this.classes = classes?.data?.classesList || [];
      this.sections = sections.map((sub: any) => {
        const Active = sub.isActive ? 'Yes' : 'No';
        const className = this.getClassName(sub?.classId);
        return {
          ...sub,
          active: Active,
          className: className
        };
      });
    });
  }
  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }

  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }
  getClassName(id: number) {
    return this.classes?.find(c => c.masterId == id)?.name || '';
  }
  // getsectiondata() {
  //   this.sectionApiService.getsectiondata().subscribe({
  //     next: (response) => {
  //       const data = response;
  //       this.sections = data;
  //       this.sections = data.map((sub: any) => {
  //         const Active = sub.isActive ? 'Yes' : 'No';
  //         const className = this.getClassName(sub?.classId);
  //         return {
  //           ...sub,
  //           Active: Active,
  //           className: className
  //         };
  //       });

  //     }
  //   });
  // }
  // getclassdata() {
  //   this.sectionApiService.getclassdata().subscribe({
  //     next: (response) => {
  //       const data = response;
  //       this.classes = data;
  //     }
  //   });
  // }
  resetFilter() {
    this.dt1!.clear();
    this.onloaddata();
  }
  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }

  getCurrentPageState() {
    let state = {
      sections: this.sections,
      classes: this.classes,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }
  createSection() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/class-sections/create-section";
    this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
  }

  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/class-sections/create-section";
    this.router.navigate([url], { queryParams: { action: 'edit', id: data.id }, state: { sectionData: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/class-sections/create-section";
    this.router.navigate([url], { queryParams: { action: 'view', id: data.id }, state: { sectionData: data, backPageData: this.getCurrentPageState() } });
  }
  cancelPopup() {
    this.confirmationService.close()
  }

  confirmPopup() {
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.sectionApiService.deletesectionById(this.selectedsection?.id).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Section deleted successfully!', 'Section has been deleted successfully');
        this.removeUserFromArray(this.selectedsection?.id);
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
      },
      complete: () => { }
    });
  }

  confirm(event: Event, data: any) {
    this.selectedsection = data;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }
  removeUserFromArray(id: any) {
    const index = this.sections.findIndex(item => item.id === id);
    this.sections = this.sections.slice(0, index).concat(this.sections.slice(index + 1))
  }

  segregateErrors(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.showToast("WARNING", "Session Expired!", "Session Expired! Please Re-Login");
    } else if (err.status.toString().startsWith('4')) {
      this.showToast("WARNING", "Exception Occurred!", err.error?.exceptions ? err.error?.exceptions[0] : err.error.message);
    } else if (err.status.toString().startsWith('5')) {
      this.showToast("ERROR", "Error Occurred!", err.error.message);
    }
  }

  showToast(status: string, heading: string, toastMessage: string) {
    if (status == 'SUCCESS') {
      this.messageService.add({ key: 'tcc', severity: 'success', life: 5000, summary: heading, detail: toastMessage });
    } else if (status == 'WARNING') {
      this.messageService.add({ key: 'tcc', severity: 'warn', life: 10000, summary: heading, detail: toastMessage });
    } else if (status == 'ERROR') {
      this.messageService.add({ key: 'tcc', severity: 'error', life: 10000, summary: heading, detail: toastMessage });
    }
  }

}
