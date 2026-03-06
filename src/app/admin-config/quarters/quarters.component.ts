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
import { QuartersApiService } from './quarters-api.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-quarters',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ButtonModule, ConfirmPopupModule, TableModule, Button, FormsModule, DialogModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './quarters.component.html',
  styleUrl: './quarters.component.css'
})
export class QuartersComponent {

  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';
  quarters: any[] = [];
  years: any[] = [];
  selectedqrt: any;
  selectedyear: any = "";
  constructor(
    private router: Router, private fb: FormBuilder, private messageService: MessageService, private quartesApiService: QuartersApiService,
    private environment: EnvironmentService,
    private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    if (history.state.isPageReload) {
      if (history.state.backPageData) {
        let backPageData = history.state.backPageData;
        this.quarters = backPageData.quarters;
        if (history.state?.user) {
          this.quarters.forEach((user, index) => {
            if (user.id == history.state.user.id) {
              this.quarters[index] = history.state.user;
            }
          });
        }
        this.quarters = backPageData.quarters;
        this.tableMultiSortingMetaData = backPageData.tableMultiSortingMetaData;
        this.tableRows = backPageData.tableRows;
        this.searchText = backPageData.searchText;
        this.years = backPageData.years;

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
      years: this.quartesApiService.getyeardata(),
      quarters: this.quartesApiService.getqrtdata()
    }).subscribe(({ years, quarters }) => {
      this.years = years;
      this.quarters = quarters.map((sub: any) => {
        const formattedstartDate = new Date(sub.startDate);
        const formattedendDate = new Date(sub.endDate);
        const Active = sub.isActive ? 'Yes' : 'No';
        return {
          ...sub,
          formattedstartDate: this.formatDate(formattedstartDate),
          formattedendDate: this.formatDate(formattedendDate),
          Active: Active,
          academicYear: this.getYearName(sub?.academicYearId)
        };
      });
      console.log(this.quarters);
    });
  }

  getdatabyyear(event: any) {
    debugger;
    if (event.id) {
      this.dt1!.filter(event.id, 'academicYearId', 'equals');
      console.log(this.dt1!.filter(event.id, 'academicYearId', 'contains'));
    } else {
      this.dt1!.clear(); // reset filter if cleared
    }
  }
  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }

  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }
  getYearName(id: number) {
    return this.years?.find(c => c.id == id)?.name || '';
  }
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  resetFilter() {
    this.dt1!.clear();
    this.selectedyear = null;
    this.onloaddata();
  }
  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }
  getCurrentPageState() {
    let state = {
      quarters: this.quarters,
      years: this.years,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }

  createQuarter() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/quarters/create-quarter";
    this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
  }

  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/quarters/create-quarter";
    this.router.navigate([url], { queryParams: { action: 'edit', id: data.id }, state: { QuarterData: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/quarters/create-quarter";
    this.router.navigate([url], { queryParams: { action: 'view', id: data.id }, state: { QuarterData: data, backPageData: this.getCurrentPageState() } });
  }
  cancelPopup() {
    this.confirmationService.close()
  }

  confirmPopup() {
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.quartesApiService.deleteqrtById(this.selectedqrt?.quarterId).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Quarter deleted successfully!', 'Quarter has been deleted successfully');
        this.removeUserFromArray(this.selectedqrt?.quarterId);
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

  confirm(event: Event, desg: any) {
    this.selectedqrt = desg;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }
  removeUserFromArray(id: any) {
    const index = this.quarters.findIndex(item => item.quarterId === id);
    this.quarters = this.quarters.slice(0, index).concat(this.quarters.slice(index + 1))
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
