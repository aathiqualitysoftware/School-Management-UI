import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { FeesApiService } from './fees-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvironmentService } from '../../environment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fees',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ToastModule,
    TableModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, TabViewModule
  ],
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.css'
})
export class FeesComponent {
  enableSearchLoading = false;

  academicYears: any[] = [];
  classes: any[] = [];
  filteredInvoices: any[] = [];

  feeslist = [
    {
      studentId: 34,
      studentName: 'Test Test',
      parentName: 'Test Father',
      class: 'Class 1',
      total: 500,
      paid: 500,
      balance: 0,
      status: 'Paid'
    },
    {
      studentId: 44,
      studentName: 'testing testing',
      parentName: 'sh5lhd',
      class: 'Class 2',
      total: 59500,
      paid: 25600,
      balance: 33900,
      status: 'Partial'
    },
    {
      studentId: 38,
      studentName: 'two testing four',
      parentName: 'testing four parent',
      class: 'Class 1',
      total: 31500,
      paid: 0,
      balance: 31500,
      status: 'Pending'
    }
  ];
  statusList: any[] = [];
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  selectedYear: any;
  selectedClass: any;
  selectedStatus: any;
  studentIdSearch = '';
  filteredTransactions: any[] = [];
 
  searchText = "";
  constructor(private feesapiservice: FeesApiService, private messageService: MessageService, private router: Router,
    private environment: EnvironmentService) {

  }
  ngOnInit() {

    this.filteredInvoices = [...this.feeslist];
    this.onloaddata();
  }
  onloaddata() {
    this.getAcademicYear();
    this.getclassdata();
    this.getfeestatus();
  }
  getfeestatus() {
    this.feesapiservice.getfeestatus().subscribe({
      next: (response) => {
        this.statusList = response;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  getAcademicYear() {
    this.feesapiservice.getacademicyear().subscribe({
      next: (response) => {
        this.academicYears = response;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  getclassdata() {
    this.feesapiservice.getclasses().subscribe({
      next: (response) => {
        this.classes = response?.data;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  saveStatus(inv: any) {

    inv.savedStatus = inv.status;

    

  }
  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }
  getCurrentPageState() {
    let state = {
      selectedYear: this.selectedYear,
      selectedClass: this.selectedClass,
      selectedStatus: this.selectedStatus,
      feeslist: this.feeslist,
      classes: this.classes,
      academicYears: this.academicYears,
      statusList: this.statusList,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }
  transactionhistory() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/fees/transaction-history";
    this.router.navigate([url], { queryParams: { action: 'view' }, state: { backPageData: this.getCurrentPageState() } });
  }
  applyInvoiceFilter() {
    this.filteredInvoices = this.feeslist.filter(i =>
      (!this.selectedClass || this.selectedClass === 'All' || i.class === this.selectedClass) &&
      (!this.selectedStatus || this.selectedStatus === 'All' || i.status === this.selectedStatus)
    );
  }
  resetFilter() {
    this.selectedYear = null; this.selectedClass = null; this.selectedStatus = null;
  }

  resetInvoiceFilters() {

    this.selectedYear = this.academicYears[0];
    this.selectedClass = 'All';
    this.selectedStatus = 'All';
    this.studentIdSearch = '';

    this.applyInvoiceFilter();
  }

  openLedger(invoice: any) {
    console.log("ledger", invoice);
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
