import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ExamsApiService } from './exams-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Constants } from '../../util/constants';
import { EnvironmentService } from '../../environment.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-exams',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ToastModule, ConfirmPopupModule,
    TableModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, TooltipModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css'
})
export class ExamsComponent {
  constructor(private fb: FormBuilder, private router: Router,
    private confirmationService: ConfirmationService,
    private environment: EnvironmentService, private examapiservice: ExamsApiService, private messageService: MessageService) { }
  years: any[] = [];
  selectedYear: any;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';
  selectedexam: any;
  exams: any[] = [];
  examForm!: FormGroup;
  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;

  ngOnInit() {
    debugger;
    if (history.state.isPageReload) {
      if (history.state.backPageData) {
        let backPageData = history.state.backPageData;
        this.exams = backPageData.exams;
        if (history.state?.user) {
          this.exams.forEach((user, index) => {
            if (user.ExamId == history.state.user.ExamId) {
              this.exams[index] = history.state.user;
            }
          });
        }
        this.exams = backPageData.exams;
        this.tableMultiSortingMetaData = backPageData.tableMultiSortingMetaData;
        this.tableRows = backPageData.tableRows;

        this.selectedYear = backPageData.selectedYear;
        this.years = backPageData.years;
        this.classSubjects = backPageData.classSubjects;
        this.classes = backPageData.classes;
        this.subjects = backPageData.subjects;
        this.sections = backPageData.sections;
        this.types = backPageData.types;
        this.searchText = backPageData.searchText;

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

  getdatbyacademicyear() {
    debugger;
    this.examapiservice.getdatbyacademicyear(this.selectedYear?.id).subscribe({
      next: (response) => {
        const examData = response;
        this.loadclasssubjectdata(examData);
      }
    });
  }

  onloaddata() {
    forkJoin({
      years: this.examapiservice.getyears(),
      alldata: this.examapiservice.getAllMasterData(),
      exams: this.examapiservice.getexamlistData(),
      subjects: this.examapiservice.getsubjects(),
      sections: this.examapiservice.getsections(),
      classSubjects: this.examapiservice.getall()
    }).subscribe((res: any) => {

      this.classes = res.alldata?.data?.classesList || [];
      this.years = res.years || [];
      this.types = res.alldata?.data?.examTypeList || [];
      this.exams = res.exams;
      this.subjects = res.subjects;
      this.sections = res.sections;
      this.classSubjects = res.classSubjects;

      this.loadclasssubjectdata(this.exams);
    });
  }

  classSubjects: any[] = [];
  classes: any[] = [];
  subjects: any[] = [];
  sections: any[] = [];
  types: any[] = [];

  getClassName(id: number) {
    return this.classes?.find(c => c.masterId == id)?.name || '';
  }

  getSubjectName(id: number) {
    return this.subjects?.find(s => s.id == id)?.name || '';
  }

  getSectionName(id: number) {
    return this.sections?.find(s => s.id == id)?.sectionName || '';
  }

  getTypeName(id: number) {
    debugger;
    return this.types?.find(s => s.masterId == id)?.name || '';
  }


  loadclasssubjectdata(examData: any[]) {

    this.exams = examData.map((exam: any) => {

      const csData = this.classSubjects.find(
        (x: any) => x.id == exam.classSubjectId
      );

      const className = this.getClassName(csData?.classId);
      const subjectName = this.getSubjectName(csData?.subjectId);
      const sectionName = this.getSectionName(csData?.sectionId);
      const typeName = this.getTypeName(exam.examTypeId);

      const start = new Date(exam.startDate);
      const end = new Date(exam.endDate);

      return {
        ...exam,
        classId: csData?.classId,
        subjectId: csData?.subjectId,
        sectionId: csData?.sectionId,
        className,
        subjectName,
        sectionName,
        typeName,
        formattedStartDate: this.formatDate(start),
        formattedEndDate: this.formatDate(end)
      };
    });
  }
  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }

  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }

  confirm(event: Event, exam: any) {
    this.selectedexam = exam;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }

  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }

  resetFilter() {
    this.selectedYear = null;
    this.onloaddata();
  }

  createExam() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/exams/create-exam";
    this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
  }

  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/exams/create-exam";
    this.router.navigate([url], { queryParams: { action: 'edit', examId: data.ExamId }, state: { examData: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/exams/create-exam";
    this.router.navigate([url], { queryParams: { action: 'view', examId: data.ExamId }, state: { examData: data, backPageData: this.getCurrentPageState() } });
  }

  getCurrentPageState() {
    let state = {
      selectedYear: this.selectedYear,
      exams: this.exams,
      years: this.years,
      classSubjects: this.classSubjects,
      classes: this.classes,
      subjects: this.subjects,
      sections: this.sections,
      types: this.types,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }

  cancelPopup() {
    this.confirmationService.close()
  }

  confirmPopup() {
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.examapiservice.deleteexamById(this.selectedexam?.id).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Exam deleted successfully!', 'Exam has been deleted successfully');
        this.removeUserFromArray(this.selectedexam?.id);
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

  removeUserFromArray(userid: any) {
    const index = this.exams.findIndex(item => item.id === userid);
    this.exams = this.exams.slice(0, index).concat(this.exams.slice(index + 1))
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
