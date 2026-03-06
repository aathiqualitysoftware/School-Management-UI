
import { CommonModule, Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { EnvironmentService } from '../environment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentAttendanceReportApiService } from '../student-attendance-report/student-attendance-report-api.service';
import { StudentTimeTableApiService } from './student-time-table-api.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-student-time-table',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ProgressSpinnerModule, InputTextModule, PasswordModule, MultiSelectModule, OverlayPanelModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './student-time-table.component.html',
  styleUrl: './student-time-table.component.css'
})
export class StudentTimeTableComponent implements OnInit {
  classId: any;
  sectionId: any
  timeTableList: any = [];
  showLoading = false;
  className: any;
  constructor(private router: Router,
    private studentTimeTableApiService: StudentTimeTableApiService,
    private messageService: MessageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private _location: Location,
    private environment: EnvironmentService) {
  }
  async ngOnInit() {
     let obj = this.authService.getStudentDetails();
    this.className = obj?.className ? obj?.className + " - " + obj?.sectionName : '';
    await this.validateQueryParam();
    this.timeTableList = await this.getTimeTableByClassIdAndSectionId();
  }
  async getTimeTableByClassIdAndSectionId(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.studentTimeTableApiService.getTimeTableByClassIdAndSectionId(1,1).subscribe({
        next: (response) => {
          resolve(response?.data);
        },
        error: (err: HttpErrorResponse) => {
          this.segregateErrors(err);
          reject(err);
        },
        complete: () => { }
      });
    });
  }
  async validateQueryParam() {
    this.route.queryParams.subscribe(params => {
      this.classId = params['classId'];
      this.sectionId = params['sectionId'];
    });
  }
  segregateErrors(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.showToast("WARNING", "Session Expired!", "Session Expired! Please Re-Login");
    } else if (err.status.toString().startsWith('4')) {
      this.showToast("WARNING", "Exception Occured!", err.error?.exceptions ? err.error?.exceptions[0] : err.error.message);
    } else if (err.status.toString().startsWith('5')) {
      this.showToast("ERROR", "Error Occured!", err.error.message);
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
// Helper: insert lunch break after configured period
  getSubjectsWithLunch(day: any): string[] {
    const beforeLunch = day.subjects.slice(0, day.afterLunchPeriod);
    const afterLunch = day.subjects.slice(day.afterLunchPeriod);
    return [...beforeLunch, 'Lunch Break', ...afterLunch];
  }

}
