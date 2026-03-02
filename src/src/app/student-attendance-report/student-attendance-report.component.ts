import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Constants } from '../util/constants';
import { StudentAttendanceReportApiService } from './student-attendance-report-api.service';
import { EnvironmentService } from '../environment.service';
import { AuthService } from '../auth.service';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
@Component({
  selector: 'app-student-attendance-report',
  standalone: true,
  imports: [CommonModule, CalendarModule, ToastModule, DropdownModule, DatePipe, InputTextModule, TableModule, ConfirmPopupModule, FormsModule, ReactiveFormsModule, HighchartsChartModule],
  providers: [ConfirmationService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './student-attendance-report.component.html',
  styleUrl: './student-attendance-report.component.css'
})
export class StudentAttendanceReportComponent implements OnInit {
  rangeDates!: Date[];
  date!: Date;
  minDate!: Date;
  maxDate!: Date;
  ctrlCodes: any[] | undefined;
  selectedCtrlCode: any;
  portalAttendance: any[] = [];
  selectedPortalConfig: any;
  deleteLoading = false;
  deleteCnfText = "Confirm";
  enableSearchLoading = false;
  searchText = "";
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_STUDENT_ATTENDANCE_REPORT;
  readWriteRoles: String[] = Constants.PORTAL_STUDENT_ATTENDANCE_REPORT;
  action: any;
  userId: any;
studentName: any;
className: any;
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private studentAttendanceReportApiService: StudentAttendanceReportApiService,
    private environment: EnvironmentService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    // Default range: last 7 days
    this.rangeDates = [lastWeek, today];

    // Optional: restrict selection to this month
    this.minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let obj = this.authService.getStudentDetails();
    this.studentName = obj?.studentName ? obj?.studentName : '';
    this.className = obj?.className ? obj?.className + " - " + obj?.sectionName : '';
    this.getAttendanceReport();
  }

  getAttendanceReport() {
    let studentId = this.authService.getStudentId();
    this.studentAttendanceReportApiService.getAttendanceReport(studentId, this.getDate(this.rangeDates[0]), this.getDate(this.rangeDates[1])).subscribe({
      next: (response) => {
        this.portalAttendance = response?.data;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  getDate(objectDate: any) {
    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    let year = objectDate.getFullYear();
    return year + "-" + month + "-" + day;
  }

  reset() {
    this.selectedCtrlCode = undefined;
    this.portalAttendance = [];
    this.searchText = "";
    this.applyFilterGlobal(this.searchText, 'contains');
    this.tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
    this.dt1!._rows = 8;
  }
  onSelect() {
    if (this.rangeDates != null && this.rangeDates[0] != null) {
      this.minDate = this.rangeDates[0];
      this.maxDate = new Date();
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate());
      const utc2 = Date.UTC(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate());
      let dateRange = Math.floor((utc2 - utc1) / _MS_PER_DAY);
      if (dateRange <= 365) {
        this.maxDate = new Date();
      } else {
        this.maxDate.setDate(this.minDate.getDate());
        this.maxDate.setMonth(this.minDate.getMonth());
        this.maxDate.setFullYear(this.minDate.getFullYear() + 1);
      }
    } else {
      this.defaultDateRangeInitializor();
    }
  }

  defaultDateRangeInitializor() {
    let today = new Date();
    let year = today.getFullYear();
    let minYear = year - 3;
    this.maxDate = new Date();
    this.minDate = new Date();
    if (minYear <= 2022) {
      this.minDate.setDate(1);
      this.minDate.setMonth(0);
      this.minDate.setFullYear(2023);
    } else {
      this.minDate.setFullYear(minYear);
    }
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

  @ViewChild('dt1') dt1: Table | undefined;
  applyFilterGlobal(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }

  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }

  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }
}
