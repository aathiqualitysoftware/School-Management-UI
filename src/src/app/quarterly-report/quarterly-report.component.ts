
import { CommonModule, DatePipe, Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { EnvironmentService } from '../environment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import * as html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QuarterlyReportApiService } from './quarterly-report-api.service';
import { Constants } from '../util/constants';
import { Table, TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

interface Subject {
  name: string;
  marks: number;
  total: number;
  grade: string;
}



@Component({
  selector: 'app-quarterly-report',
  standalone: true,
  imports: [CommonModule, CalendarModule, ToastModule, DropdownModule, DatePipe,ChartModule, InputTextModule, TableModule, ConfirmPopupModule, FormsModule, ReactiveFormsModule, HighchartsChartModule],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './quarterly-report.component.html',
  styleUrl: './quarterly-report.component.css'
})
export class QuarterlyReportComponent implements OnInit {
  buttonDisabled = false;
  dashBoardPageDisabled = false;
  averageMarks = 0;
  averageGrade = '';

  student: any = {}; // initialize to empty object

  subjects: any = [
  ];

  attendance : any;

  remarks: any = {
   
  };

  barData: any = {
    
  };

  barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Academic Performance' }
    }
  };

  pieData: any = {
  };

  pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Attendance Summary' }
    }
  };
  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;

  deleteLoading = false;
  deleteCnfText = "Confirm";
  enableSearchLoading = false;
  searchText = "";
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_STUDENT_QUARTERLY_REPORT;
  readWriteRoles: String[] = Constants.PORTAL_STUDENT_QUARTERLY_REPORT;
  action: any;
  userId: any;
  portalExam: any[] = [];
  portalExamDashboard: any;
  constructor(
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private quarterlyReportApiService: QuarterlyReportApiService,
    private environment: EnvironmentService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.getExamReport();
  }

  getExamReport() {
    let studentId = this.authService.getStudentId();
    this.quarterlyReportApiService.getExamReport(studentId).subscribe({
      next: (response) => {
        this.portalExam = response?.data;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  async getExamDashBoardReport(examReport: any) {
    let studentId = this.authService.getStudentId();
    this.quarterlyReportApiService.getExamDashboardReport(studentId, examReport.examTypeId, examReport.academicYear).subscribe({
      next: (response) => {
        this.portalExamDashboard = response?.data;
        this.dashBoardData(examReport);
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  goback(){
    this.dashBoardPageDisabled = false;
  }
  async viewContent(examReport: any) {
   await this.getExamDashBoardReport(examReport);
    this.dashBoardPageDisabled = true;
  }
  async dashBoardData(examReport: any){
    this.averageMarks = examReport?.avgMarks;
    this.averageGrade = examReport?.gradeName;
    this.attendance = {
      workingDays: this.portalExamDashboard[0]?.totalDays,
      presentDays: this.portalExamDashboard[0]?.presentDays,
      percentage: this.portalExamDashboard[0]?.attendancePercentage
    };
     this.remarks = {
    text: this.portalExamDashboard[0]?.remarks,
    teacher: this.portalExamDashboard[0]?.teacherName,
  };
  this.pieData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [this.portalExamDashboard[0]?.presentDays, this.portalExamDashboard[0]?.totalDays - this.portalExamDashboard[0]?.presentDays],
        backgroundColor: ['#66BB6A', '#EF5350']
      }
    ]
  };

  this.student = {
    name: this.portalExamDashboard[0]?.studentName,
    class: this.portalExamDashboard[0]?.className + ' - ' + this.portalExamDashboard[0]?.sectionName,
    rollNo: this.portalExamDashboard[0]?.rollNumber,
    quarter: examReport.examTypeName,
    reportDate: this.portalExamDashboard[0]?.issuedDate
  };

  this.subjects = this.portalExamDashboard.map((element: any): Subject => ({
  name: element.subjectName,
  marks: element.marks,
  total: element.totalMark,
  grade: element.gradeName
}));

// ✅ Chart data
this.barData = {
  labels: this.subjects.map((s: any) => s.name),
  datasets: [
    {
      label: 'Marks',
      data: this.subjects.map((s: any) => s.marks),
      backgroundColor: '#42A5F5'
    }
  ]
};
  }
  async downloadContent(examReport: any) {
    await this.getExamDashBoardReport(examReport);
     this.dashBoardPageDisabled = false;
    await this.downloadPDF();
  }
  downloadPDF(): void {
  const element = this.reportContent.nativeElement;

  // Temporarily show the element for rendering
  
  element.style.display = 'block';

  html2canvas(element, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Hidden_Report.pdf');

    // Hide it again
    if (!this.dashBoardPageDisabled) {
      element.style.display = 'none';
    }
  });
  }
//  async downloadPDF() {
//     this.buttonDisabled = true;
//     html2canvas(this.reportContent.nativeElement).then(canvas => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${this.portalExamDashboard[0]?.studentName}_Report.pdf`);
//       this.buttonDisabled = false;
//     });
//   }

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
