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
import { HttpErrorResponse } from '@angular/common/http';
import { EnvironmentService } from '../../environment.service';
import { Router } from '@angular/router';
import { FeeCollectionApiService } from './fee-collection-api.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-fee-collection',
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
  ], templateUrl: './fee-collection.component.html',
  styleUrl: './fee-collection.component.css'
})
export class FeeCollectionComponent {
  enableSearchLoading = false;

  academicYears: any[] = [];
  classes: any[] = [];
  filteredInvoices: any[] = [];

  feeslist = [
    {
      studentId: 34,
      studentName: 'Test Test',
      parentName: 'Test Father',
      classId: 14,
      class: 'Class 1',
      section: "A",
      sectionId: 2,
      total: 500,
      paid: 500,
      balance: 0,
      status: 'Paid',
      academicYearId: 1
    },
    {
      studentId: 44,
      studentName: 'testing testing',
      parentName: 'sh5lhd',
      classId: 14,
      class: 'Class 2',
      section: "A",
      sectionId: 1,
      total: 59500,
      paid: 25600,
      balance: 33900,
      status: 'Partial',
      academicYearId: 2
    },
    {
      studentId: 38,
      studentName: 'two testing four',
      parentName: 'testing four parent',
      classId: 14,
      class: 'Class 1',
      sectionId: 1,
      section: "A",
      total: 31500,
      paid: 0,
      balance: 31500,
      status: 'Pending',
      academicYearId: 1
    }
  ];
  statusList: any[] = [];
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  selectedYear: any;
  selectedClass: any;
  selectedSection: any;
  studentIdSearch = '';
  filteredTransactions: any[] = [];

  searchText = "";
  constructor(private feesapiservice: FeeCollectionApiService, private messageService: MessageService, private router: Router,
    private environment: EnvironmentService) {

  }
  ngOnInit() {

    this.filteredInvoices = [...this.feeslist];
    this.onloaddata();
  }
  filteredSections: any[] = [];
  sections: any[] = [];
  onClassChange() {
    debugger;
    var selclass: any = this.selectedClass;
    debugger;
    if (!this.sections || !selclass?.masterId) {
      this.filteredSections = [];
      return;
    }
    this.filteredSections = this.sections.filter(
      section => section.classId === selclass?.masterId
    );
    this.selectedSection = "";
  }
  onloaddata() {
    forkJoin({
      years: this.feesapiservice.getacademicyear(),
      alldata: this.feesapiservice.getAllMasterData(),
      section: this.feesapiservice.getsections()
    }).subscribe((res: any) => {
      this.classes = res.alldata?.data?.classesList || [];
      this.academicYears = res.years || [];
      this.sections = res.section || [];
    });
  }

  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/fees/create-fee-collection";
    this.router.navigate([url], { queryParams: { action: 'edit' }, state: { Data: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/fees/create-fee-collection";
    this.router.navigate([url], { queryParams: { action: 'view' }, state: { Data: data, backPageData: this.getCurrentPageState() } });
  }
  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }
  getCurrentPageState() {
    let state = {
      selectedYear: this.selectedYear,
      selectedClass: this.selectedClass,
      selectedSection: this.selectedSection,
      feeslist: this.feeslist,
      classes: this.classes,
      academicYears: this.academicYears,
      sections: this.sections,
      filteredSections: this.filteredSections,
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
    debugger;
    this.filteredInvoices = this.feeslist.filter(i =>
      (!this.selectedClass || this.selectedClass === 'All' || i.classId === this.selectedClass.masterId) &&
      (!this.selectedYear || this.selectedYear === 'All' || i.academicYearId === this.selectedYear.id) &&
      (!this.selectedSection || this.selectedSection === 'All' || i.sectionId === this.selectedSection.id)
    );
  }
  resetFilter() {
    this.selectedYear = null; this.selectedClass = null; this.selectedSection = null;
    this.filteredInvoices = this.feeslist;
  }

  resetInvoiceFilters() {

    this.selectedYear = this.academicYears[0];
    this.selectedClass = 'All';
    this.selectedSection = 'All';
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
