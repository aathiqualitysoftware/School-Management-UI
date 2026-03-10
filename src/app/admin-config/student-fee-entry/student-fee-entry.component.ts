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
import { StudentFeeEntryApiService } from './student-fee-entry-api.service';
@Component({
  selector: 'app-student-fee-entry',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ButtonModule, ConfirmPopupModule, TableModule, Button, FormsModule, DialogModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './student-fee-entry.component.html',
  styleUrl: './student-fee-entry.component.css'
})
export class StudentFeeEntryComponent {

  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';
  selecteddata: any;
  studentFeeList: any[] = [
    {
      "id": 1,
      "studentName": "Arun",
      "className": "Class 5",
      "sectionName": "A",
      "collectionType": "Term Fee",
      "dueDate": "2026-03-10",
      "totalFee": 7000,
      "feeDetails": [
        {
          "feeHeadName": "Tuition Fee",
          "amount": 5000
        },
        {
          "feeHeadName": "Transport Fee",
          "amount": 2000
        }
      ]
    }, {
      "id": 2,
      "studentName": "Aadhithya",
      "className": "Class 5",
      "sectionName": "A",
      "collectionType": "Term Fee",
      "dueDate": "2026-03-10",
      "totalFee": 3000,
      "feeDetails": [
        {
          "feeHeadName": "Tuition Fee",
          "amount": 1500
        },
        {
          "feeHeadName": "Transport Fee",
          "amount": 1500
        }
      ]
    }
  ];

  constructor(
    private studentfeeentryapiservice: StudentFeeEntryApiService,
    private router: Router, private fb: FormBuilder, private messageService: MessageService,
    private environment: EnvironmentService,
    private confirmationService: ConfirmationService) { }
  expandedRowKeys: any = {};

  onRowExpand(rowData: any) {
    this.expandedRowKeys = {};
    this.expandedRowKeys[rowData.id] = true;
  }
  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }
  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }
  onloaddata() {

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
      studentFeeList: this.studentFeeList,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }
  CreateFeeEntry() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/studentfeeentry/create-studentfeeentry";
    this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
  }


  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/studentfeeentry/create-studentfeeentry";
    this.router.navigate([url], { queryParams: { action: 'edit' }, state: { StudentFeeData: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/studentfeeentry/create-studentfeeentry";
    this.router.navigate([url], { queryParams: { action: 'view' }, state: { StudentFeeData: data, backPageData: this.getCurrentPageState() } });
  }
  cancelPopup() {
    this.confirmationService.close()
  }

  confirmPopup() {
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.studentfeeentryapiservice.delete(this.selecteddata?.id).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Student Fee Entry deleted successfully!', 'Student Fee Entry has been deleted successfully');
        this.removeUserFromArray(this.selecteddata?.id);
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
    this.selecteddata = data;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }

  removeUserFromArray(id: any) {
    const index = this.studentFeeList.findIndex(item => item.id === id);
    this.studentFeeList = this.studentFeeList.slice(0, index).concat(this.studentFeeList.slice(index + 1))
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
