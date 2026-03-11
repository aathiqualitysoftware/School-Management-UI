import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EnvironmentService } from '../../environment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Constants } from '../../util/constants';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MarkEntryApiService } from './mark-entry-api.service';
@Component({
  selector: 'app-mark-entry',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ButtonModule, ConfirmPopupModule, TableModule, Button, FormsModule, DialogModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './mark-entry.component.html',
  styleUrl: './mark-entry.component.css'
})
export class MarkEntryComponent {

  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';

  Classes: any[] = [];
  sections: any[] = [];
  subjects: any[] = [];
  exams: any[] = [];

  selectedclass: any;
  selectedsection: any;
  selectedsubject: any;
  selectedexam: any;

  showLoading: boolean = false;
  students: any[] = [];
  constructor(
    private router: Router, private fb: FormBuilder, private messageService: MessageService, private markentryapiservice: MarkEntryApiService,
    private environment: EnvironmentService,
    private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.onloaddata();
  }
  markEntryForm = this.fb.group({
    class: [null],
    section: [null],
    exam: [null],
    subject: [null],
    marks: this.fb.array([])
  });
  get marksArray() {
    return this.markEntryForm.get('marks') as FormArray;
  }
  getSectionData(classId: any) {
    this.markentryapiservice.getSectionData(classId).subscribe({
      next: (response) => {
        this.sections = response;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  filteredsubjects: any[] = [];
  getclasssection() {
    debugger;
    if (this.selectedclass && this.selectedsection) {
      this.markentryapiservice.getclasssection(this.selectedclass.masterId, this.selectedsection.id).subscribe({
        next: (response) => {
          this.filteredsubjects = response
            .map((r: any) => {
              const subject = this.subjects.find((s: any) => s.id == r.subjectId);
              if (subject) {
                return {
                  ClassSubjectId: r.id,
                  subjectId: subject.id,
                  name: subject.name
                };
              }
              return null;
            })
            .filter((x: any) => x != null);
        },
        error: (err: HttpErrorResponse) => {
          this.segregateErrors(err);
        },
        complete: () => { }
      });
    }
  }
  filteredExam: any[] = [];
  getexambyclasssubject() {
    if (this.selectedclass && this.selectedsection && this.selectedsubject) {
      this.filteredExam = this.exams.filter((exam: any) =>
        exam.classSubjectId == this.selectedsubject.ClassSubjectId
      );
    }
  }
  getstudentdata() {
    this.markentryapiservice.getStudentsByClassSection(this.selectedclass.masterId, this.selectedsection.id).subscribe({
      next: (response) => {
        this.students = response.map((stu: any) => ({
          ...stu,
          mark: null,
          grade: '',
          status: '',
          rank: null
        }));
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  markChange(i: number) {
    const student = this.students[i];
    if (Number(student.mark) > 100) {
      student.mark = 100;
    }
    if (Number(student.mark) < 0) {
      student.mark = 0;
    }
    if (!student.mark && student.mark !== 0) {
      student.grade = "";
      student.status = "";
      student.rank = "";
      this.calculateRank();
      return;
    }
    const mark = Number(student.mark);
    student.grade = this.getGrade(mark);
    student.status = mark >= 50 ? 'Pass' : 'Fail';
    this.calculateRank();
  }
  calculateRank() {
    const validStudents = this.students.filter(s => s.mark !== null && s.mark !== undefined && s.mark !== '');
    const sorted = [...validStudents].sort((a, b) => b.mark - a.mark);
    sorted.forEach((s, index) => {
      const student = this.students.find(x => x.studentId == s.studentId);
      if (student) {
        student.rank = index + 1;
      }
    });
  }
  getGrade(mark: number) {
    if (mark >= 90) return 'A+';
    if (mark >= 80) return 'A';
    if (mark >= 70) return 'B';
    if (mark >= 60) return 'C';
    if (mark >= 50) return 'D';
    return 'F';
  }
  resetFilter() {
    this.selectedclass = "";
    this.selectedsection = "";
    this.selectedsubject = "";
    this.selectedexam = "";
    this.students = [];
    this.dt1!.clear();
  }
  @ViewChild('dt1') dt1: Table | undefined;
  onSubmit() {

    this.showLoading = true;
    let data: any = this.students;

    this.markentryapiservice.save(data).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Mark Entry created successfully!', 'Students Mark Entry has been created successfully');
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.showLoading = false;
      },
      complete: () => { }
    });
  }
  onloaddata() {
    forkJoin({
      alldata: this.markentryapiservice.getAllMasterData(),
      subjects: this.markentryapiservice.getsubjects(),
      exams: this.markentryapiservice.getexams()
    }).subscribe((res: any) => {
      debugger;
      this.Classes = res.alldata?.data?.classesList || [];
      this.subjects = res.subjects;
      this.exams = res.exams;
    });
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
