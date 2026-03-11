import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CreateAttendanceApiService } from './create-attendance-api.service';
import { EnvironmentService } from '../../environment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputSwitchModule } from 'primeng/inputswitch';
@Component({
  selector: 'app-create-attendance',
  standalone: true,
  providers: [ConfirmationService, MessageService, DatePipe],
  imports: [RadioButtonModule, CalendarModule,
    DropdownModule,
    TableModule, InputSwitchModule,
    ToastModule, ProgressSpinnerModule,
    InputTextModule, ReactiveFormsModule, CommonModule, FormsModule,
    DialogModule,
    ButtonModule, TooltipModule
  ],
  templateUrl: './create-attendance.component.html',
  styleUrl: './create-attendance.component.css'
})
export class CreateAttendanceComponent {
  allPresent: boolean = false;
  classes: any[] = [];
  sections: any[] = [];
  minDate!: Date;
  maxDate!: Date;
  students: any[] = []; enableSearchLoading = false;
  selectedSession: any;
  sessions: any[] = [];
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  selectedDate!: Date;
  selectedClass: any;
  selectedSection: any;
  attendance: any[] = [];
  filteredSections: any[] = [];
  filteredattendance: any[] = [];
  showLoading = false;
  constructor(
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private createattapiservice: CreateAttendanceApiService,
    private environment: EnvironmentService
  ) { }
  ngOnInit() {
    const today = new Date();
    // this.minDate = new Date(today.getFullYear(), today.getMonth(), 2);
    // this.maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.setDefaults();
    this.onLoadData();
  }

  onLoadData() {
    this.getclassdata();
    this.getsectiondata();
    this.getstudentdata();
    this.getAllmasterdata();
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
  getStudentName(id: number) {
    return this.students?.find(c => c.id == id)?.firstName || '';
  }
  getAllmasterdata() {
    this.createattapiservice.getAllMasterData().subscribe({
      next: (response: any) => {
        this.sessions = response?.data?.sessionList || [];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getattendance() {
    const formattedDate = this.formatDate(this.selectedDate);
    const classId = this.selectedClass?.masterId;
    const sectionId = this.selectedSection?.id;
    this.createattapiservice.getattendancedata(formattedDate, classId, sectionId).subscribe({
      next: (response) => {
        var att = response;
        this.attendance = response;
        this.attendance = att.map((sub: any) => {
          return {
            ...sub,
            name: this.getStudentName(sub?.studentId)
          };
        });
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  getstudentdata() {
    this.createattapiservice.getStudentData().subscribe({
      next: (response) => {
        this.students = response?.data;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  getsectiondata() {
    this.createattapiservice.getSectionData().subscribe({
      next: (response) => {
        this.sections = response;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  getclassdata() {
    this.createattapiservice.getAllMasterData().subscribe({
      next: (response: any) => {
        this.classes = response?.data?.classesList || [];
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  onClassChange() {
    debugger; if (!this.sections || !this.selectedClass) {
      this.filteredSections = [];
      return;
    }
    this.filteredSections = this.sections.filter(
      section => section.classId === this.selectedClass.masterId
    );

    this.selectedSection = null;
  }
  loadSectionsByClass() {
    if (this.selectedClass) {
      this.filteredSections = this.sections.filter(
        s => s.classId === this.selectedClass.masterId
      );
    } else {
      this.filteredSections = [];
    }
  }
  setDefaults() {
    const today = new Date();
    this.selectedDate = today;
    this.selectedClass = "";
    this.selectedSection = "";
    this.applyFilter();
  }

  applyFilter() {
    this.filteredattendance = this.attendance.filter(s =>
      (!this.selectedClass || s.class === this.selectedClass.name) &&
      (!this.selectedSection || s.section === this.selectedSection.name)
    );
  }

  checkAllPresent() {
    const allPresent = this.attendance.every(s => s.attendanceStatus === true);
    this.allPresent = allPresent;
  }

  setAllPresent() {
    if (this.allPresent) {
      this.attendance.forEach(student => {
        student.attendanceStatus = true;
      });
    } else {
      this.attendance.forEach(student => {
        student.attendanceStatus = false;
      });
    }
  }

  resetFilters() {
    this.setDefaults();
  }

  saveAttendance() {
    this.showLoading = true;
    if (this.attendance.length == 1) {
      const attendanceRecord = {
        studentId: this.attendance[0].studentId,
        // attendanceDate: this.formatDate(this.selectedDate),
        attendanceDate: this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd'),
        attendanceStatus: this.attendance[0].attendanceStatus,
        session: this.selectedSession.masterId,
        createdBy: "SYSTEM",
        createdDateTime: new Date(),
        updatedBy: "SYSTEM",
        updatedDateTime: new Date()
      };
      this.createattapiservice.saveAttendace(attendanceRecord).subscribe({
        next: (response) => {
          this.showLoading = false;
          this.showToast('SUCCESS', 'Attendance created successfully!', 'New Attendance has been created successfully');
        },
        error: (err: HttpErrorResponse) => {
          this.segregateErrors(err);
          this.showLoading = false;
        },
        complete: () => { }
      });
    } else if (this.attendance.length > 1) {
      const payload = this.attendance.map((student: any) => ({
        studentId: this.attendance[0].studentId,
        attendanceDate: this.formatDate(this.selectedDate),
        attendanceStatus: this.attendance[0].attendanceStatus,
        session: this.selectedSession.masterId,
        createdBy: "SYSTEM",
        createdDateTime: new Date(),
        updatedBy: "SYSTEM",
        updatedDateTime: new Date()

      }));

      this.createattapiservice.saveBulkAttendace(payload).subscribe({
        next: (response) => {
          this.showLoading = false;
          this.showToast('SUCCESS', 'Attendance created successfully!', 'New Attendance has been created successfully');
        },
        error: (err: HttpErrorResponse) => {
          this.segregateErrors(err);
          this.showLoading = false;
        },
        complete: () => { }
      });
    }
  }
  showToast(status: string, heading: string, toastMessage: string) {
    if (status == 'SUCCESS') {
      this.messageService.add({ key: 'tc', severity: 'success', life: 5000, summary: heading, detail: toastMessage });
    } else if (status == 'WARNING') {
      this.messageService.add({ key: 'tc', severity: 'warn', life: 10000, summary: heading, detail: toastMessage });
    } else if (status == 'ERROR') {
      this.messageService.add({ key: 'tc', severity: 'error', life: 10000, summary: heading, detail: toastMessage });
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
}
