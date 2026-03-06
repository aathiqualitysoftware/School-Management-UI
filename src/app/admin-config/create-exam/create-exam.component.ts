import { CommonModule, Location } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CreateExamApiService } from './create-exam-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ExamsApiService } from '../exams/exams-api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ReactiveFormsModule, ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, OverlayPanelModule
  ],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.css'
})
export class CreateExamComponent {
  subjects: any[] = [];
  classes: any[] = [];
  sections: any[] = [];
  examTypes: any[] = [];
  years: any[] = [];
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  name: any;
  editPortalConfig: any;

  constructor(
    private createexamApiService: CreateExamApiService, private examapiservice: ExamsApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute
  ) { }

  examForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    subject: new FormControl("", [Validators.required]),
    class: new FormControl("", [Validators.required]),
    section: new FormControl("", [Validators.required]),
    startDate: new FormControl(null as Date | null, [Validators.required]),
    endDate: new FormControl(null as Date | null, [Validators.required]),
    type: new FormControl("", [Validators.required]),
    year: new FormControl("", [Validators.required])
  }, { validators: this.dateRangeValidator() });

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    await this.onloaddata();
    if (this.action == 'edit' || this.action == 'view') {
      let examConfig: any;
      if (history.state.examData) {
        examConfig = history.state.examData;
      }
      if (examConfig) {

        const selectedClass = this.classes.find(x => x.masterId == examConfig.classId);
        this.examForm.patchValue({
          name: examConfig.uniqueExamCode,
          subject: this.subjects.find(x => x.id == examConfig.subjectId),
          class: selectedClass,
          startDate: new Date(examConfig.startDate),
          endDate: new Date(examConfig.endDate),
          type: this.examTypes.find(x => x.masterId == examConfig.examTypeId),
          year: this.years.find(x => x.id == examConfig.academicYearId)
        });

        this.onClassChange();
        const selectedSection = this.filteredSections.find(
          x => x.id == examConfig.sectionId
        );

        this.examForm.patchValue({
          section: selectedSection
        });
      }
      console.log(this.examForm.value);
      this.editPortalConfig = examConfig;
      this.showUpdateButton = true;
    } else {
      this.examForm.enable();
    }
  }

  async onloaddata() {
    await Promise.all([
      this.getAllmasterdata(),
      this.getsectiondata(),
      this.getsubjectdata(),
      this.loadClassSubjects(),
      this.getyears()
    ]);
  }
  async getyears() {
    this.years = await firstValueFrom(this.createexamApiService.getyears());
  }
  getAllmasterdata() {
    this.createexamApiService.getAllMasterData().subscribe({
      next: (response: any) => {
        this.classes = response?.data?.classesList || [];
        this.examTypes = response?.data?.examTypeList || [];

      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  async getsubjectdata() {
    this.subjects = await firstValueFrom(this.createexamApiService.getsubjects());
  }
  async getsectiondata() {
    this.sections = await firstValueFrom(this.createexamApiService.getsections());
  }

  formatDate(date: any) {
    if (!date) return null;
    const d = new Date(date);
    return d.getFullYear() + '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
      ('0' + d.getDate()).slice(-2);
  }

  navigateMenu(url: any) {
    this._location.back();
  }

  dateRangeValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get('startDate')?.value;
      const end = group.get('endDate')?.value;
      if (!start || !end) return null;
      const startDate = new Date(start);
      const endDate = new Date(end);
      return endDate >= startDate ? null : { dateInvalid: true };
    };
  }

  classSubjects: any[] = [];
  loadClassSubjects() {
    this.examapiservice.getall().subscribe(cs => {
      debugger;
      this.classSubjects = cs;
    });
  }
  onEdit() {
    debugger;
    this.showLoading = true;
    let saveConfig: any = {};
    let examConfig: any = this.examForm.value;

    const selectedClassId = examConfig?.class?.masterId;
    const selectedSubjectId = examConfig?.subject?.id;
    const selectedSectionId = examConfig?.section?.id;
    const matchedClassSubject = this.classSubjects.find(cs =>
      cs.classId == selectedClassId &&
      cs.subjectId == selectedSubjectId &&
      cs.sectionId == selectedSectionId
    );
    // if (!matchedClassSubject) {
    //   alert("Class-Subject-Section combination not found!");
    //   this.examForm.enable();
    //   this.showLoading = false;
    //   return;
    // }
    saveConfig.uniqueExamCode = examConfig?.name;
    saveConfig.classSubjectId = matchedClassSubject?.id;
    saveConfig.startDate = examConfig?.startDate;
    saveConfig.endDate = examConfig?.endDate;
    saveConfig.examTypeId = examConfig?.type?.masterId;
    saveConfig.academicYearId = examConfig?.year?.id;
    saveConfig.id = this.editPortalConfig.id;
    this.createexamApiService.updateexam(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Exam updated successfully!', 'Exam has been updated successfully');
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.showLoading = false;
      },
      complete: () => { }
    });
  }
  onSubmit() {
    debugger;
    this.examForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.examForm.value;
    let saveConfig: any = {};
    const selectedClassId = portalConfig?.class?.masterId;
    const selectedSubjectId = portalConfig?.subject?.id;
    const selectedSectionId = portalConfig?.section?.id;
    const matchedClassSubject = this.classSubjects.find(cs =>
      cs.classId == selectedClassId &&
      cs.subjectId == selectedSubjectId &&
      cs.sectionId == selectedSectionId
    );
    if (!matchedClassSubject) {
      alert("Class-Subject-Section combination not found!");
      this.examForm.enable();
      this.showLoading = false;
      return;
    }

    saveConfig.uniqueExamCode = portalConfig?.name;
    saveConfig.classSubjectId = matchedClassSubject?.id;
    saveConfig.startDate = portalConfig?.startDate;
    saveConfig.endDate = portalConfig?.endDate;
    saveConfig.examTypeId = portalConfig?.type?.masterId;
    saveConfig.academicYearId = portalConfig?.year?.id;
    // saveConfig.ExamId = "";
    this.createexamApiService.saveexam(saveConfig).subscribe({
      next: (response) => {
        this.examForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Exam created successfully!', 'New Exam has been created successfully');
        this.examForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.examForm.enable();
        this.showLoading = false;
      },
      complete: () => { }
    });
  }
  getErrorMessage(fieldName: any, examFormErrors: any) {
    if (this.action != 'view') {
      let keys = Object.keys(examFormErrors)
      return this.formErrorMessage[fieldName][keys[0]];
    }
  }

  formErrorMessage: any = {
    name: {
      required: "Exam Name is required."
    }, subject: {
      required: "subject is required.",
    }, class: {
      required: "Class is required.",
    }, section: {
      required: "Section is required.",
    }, startDate: {
      required: "StartDate is required.",
    }, endDate: {
      required: "EndDate is required.",
    }, type: {
      required: "ExamType is required.",
    }, year: {
      required: "AcademicYear is required.",
    },
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
  filteredSections: any[] = [];
  onClassChange() {
    debugger;
    var selclass: any = this.examForm.controls.class.value;
    debugger;
    if (!this.sections || !selclass?.masterId) {
      this.filteredSections = [];
      return;
    }
    this.filteredSections = this.sections.filter(
      section => section.classId === selclass?.masterId
    );
    this.examForm.controls.section.setValue("");
  }
  ngOnDestroy() {
    history.pushState({ backPageData: history.state.backPageData, isPageReload: true, portalConfigs: this.editPortalConfig }, "")
  }
}
