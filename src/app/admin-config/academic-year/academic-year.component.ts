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
import { AcademicYearApiService } from './academic-year-api.service';
@Component({
  selector: 'app-academic-year',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ButtonModule, ConfirmPopupModule, TableModule, Button, FormsModule, DialogModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './academic-year.component.html',
  styleUrl: './academic-year.component.css'
})
export class AcademicYearComponent {
  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 8;
  searchText = '';
  years: any[] = [];
  selectedyear: any;
  constructor(
    private router: Router, private fb: FormBuilder, private messageService: MessageService, private academicyearApiService: AcademicYearApiService,
    private environment: EnvironmentService,
    private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    if (history.state.isPageReload) {
      if (history.state.backPageData) {
        let backPageData = history.state.backPageData;
        this.years = backPageData.years;
        if (history.state?.user) {
          this.years.forEach((user, index) => {
            if (user.id == history.state.user.id) {
              this.years[index] = history.state.user;
            }
          });
        }
        this.years = backPageData.years;
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
    this.getyeardata();;
  }
  getyeardata() {
    this.academicyearApiService.getyeardata().subscribe({
      next: (response) => {
        const yeardata = response;
        this.years = yeardata;
        this.years = yeardata.map((sub: any) => {
          const fromDate = new Date(sub.fromDate);
          const toDate = new Date(sub.toDate);
          return {
            ...sub,
            formattedfromDate: this.formatDate(fromDate),
            formattedtoDate: this.formatDate(toDate)
          };
        });
      }
    });
  }
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }

  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }
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
      years: this.years,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }

  createYear() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/years/create-year";
    this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
  }

  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/years/create-year";
    this.router.navigate([url], { queryParams: { action: 'edit', id: data.id }, state: { yearData: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/academicyear/create-academic-year";
    this.router.navigate([url], { queryParams: { action: 'view', id: data.id }, state: { yearData: data, backPageData: this.getCurrentPageState() } });
  }
  cancelPopup() {
    this.confirmationService.close()
  }

  confirmPopup() {
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.academicyearApiService.deleteyearById(this.selectedyear?.id).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Academic Year deleted successfully!', 'Academic Year has been deleted successfully');
        this.removeUserFromArray(this.selectedyear?.id);
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

  confirm(event: Event, year: any) {
    this.selectedyear = year;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }
  removeUserFromArray(id: any) {
    const index = this.years.findIndex(item => item.id === id);
    this.years = this.years.slice(0, index).concat(this.years.slice(index + 1))
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
