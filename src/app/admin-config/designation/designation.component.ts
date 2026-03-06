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
import { DesignationApiService } from './designation-api.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ButtonModule, ConfirmPopupModule, TableModule, Button, FormsModule, DialogModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent {

  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';
  designations: any[] = [];
  departments: any[] = [];
  selecteddesg: any;
  constructor(
    private router: Router, private fb: FormBuilder, private messageService: MessageService, private designationApiService: DesignationApiService,
    private environment: EnvironmentService,
    private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    debugger;
    if (history.state.isPageReload) {
      if (history.state.backPageData) {
        let backPageData = history.state.backPageData;
        this.designations = backPageData.designations;
        if (history.state?.user) {
          this.designations.forEach((user, index) => {
            if (user.id == history.state.user.id) {
              this.designations[index] = history.state.user;
            }
          });
        }
        this.designations = backPageData.designations;
        this.tableMultiSortingMetaData = backPageData.tableMultiSortingMetaData;
        this.tableRows = backPageData.tableRows;
        this.searchText = backPageData.searchText;
        this.departments = backPageData.departments;
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

  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }
  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }
  getDeptName(id: number) {
    return this.departments?.find(c => c.masterId == id)?.name || '';
  }
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  onloaddata() {
    forkJoin({
      desg: this.designationApiService.getdesgdata(),
      departments: this.designationApiService.getAllMasterData()
    }).subscribe(({ desg, departments }: any) => {
      debugger;
      this.departments = departments?.data?.departmentList || [];
      const data = desg;
      this.designations = data;
      console.log(this.departments);
      this.designations = data.map((sub: any) => {
        const createddate = new Date(sub.createdAt);
        const Active = sub.isActive ? 'Yes' : 'No';
        const deptName = this.getDeptName(sub?.departmentId);
        return {
          ...sub,
          formattedcreatedDate: this.formatDate(createddate),
          Active: Active,
          departmentname: deptName
        };
      });
      console.log(this.designations);
    });
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
      designations: this.designations,
      departments: this.departments,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }
  createDesg() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/designation/create-designation";
    this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
  }
  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/designation/create-designation";
    this.router.navigate([url], { queryParams: { action: 'edit', id: data.id }, state: { desgData: data, backPageData: this.getCurrentPageState() } });
  }
  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/designation/create-designation";
    this.router.navigate([url], { queryParams: { action: 'view', id: data.id }, state: { desgData: data, backPageData: this.getCurrentPageState() } });
  }
  cancelPopup() {
    this.confirmationService.close()
  }
  confirmPopup() {
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.designationApiService.deletedesgById(this.selecteddesg?.id).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Designation deleted successfully!', 'Designation has been deleted successfully');
        this.removeUserFromArray(this.selecteddesg?.id);
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
    this.selecteddesg = desg;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }
  removeUserFromArray(id: any) {
    const index = this.designations.findIndex(item => item.id === id);
    this.designations = this.designations.slice(0, index).concat(this.designations.slice(index + 1))
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
