import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { firstValueFrom } from 'rxjs';
import { CreateSubjectManagementApiService } from './create-subject-management-api.service';

@Component({
  selector: 'app-create-subject-management',
  standalone: true,
  imports: [
    ReactiveFormsModule, ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ToastModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, OverlayPanelModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './create-subject-management.component.html',
  styleUrl: './create-subject-management.component.css'
})
export class CreateSubjectManagementComponent {
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;

  Classes: any[] = [];
  sections: any[] = [];
  subjects: any[] = [];
  subjecttypes: any[] = [];
  teachers: any[] = [];
  constructor(
    private createSubjectApiService: CreateSubjectManagementApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }

  subjectForm = new FormGroup({
    class: new FormControl("", [Validators.required]),
    section: new FormControl("", [Validators.required]),
    subject: new FormControl("", [Validators.required]),
    subjecttype: new FormControl("", [Validators.required]),
    teacher: new FormControl("", [Validators.required])
  });

  async ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    await this.onloaddata();
    if (this.action == 'edit' || this.action == 'view') {
      let subjectConfig: any;
      if (history.state.subjectData) {
        subjectConfig = history.state.subjectData;
      }
      if (subjectConfig) {
        const selectedClass = this.Classes.find(x => x.masterId == subjectConfig.classId);
        this.subjectForm.patchValue({
          class: selectedClass,
          // section: this.sections.find(
          //   d => d.id === subjectConfig.sectionId
          // ) || null,
          subject: this.subjects.find(
            d => d.id == subjectConfig.subjectId
          ) || null,
          subjecttype: this.subjecttypes.find(
            d => d.masterId == subjectConfig.typeId
          ) || null,
          teacher: this.teachers.find(
            d => d.staffId == subjectConfig.staffId
          ) || null,
        });

        this.onClassChange();
        const selectedSection = this.filteredSections.find(
          x => x.id == subjectConfig.sectionId
        );

        this.subjectForm.patchValue({
          section: selectedSection
        });
      }
      this.editPortalConfig = subjectConfig;
      this.showUpdateButton = true;
    } else {
      this.subjectForm.enable();
    }
  }
  filteredSections: any[] = [];
  onClassChange() {
    debugger;
    var selclass: any = this.subjectForm.controls.class.value;
    debugger;
    if (!this.sections || !selclass?.masterId) {
      this.filteredSections = [];
      return;
    }
    this.filteredSections = this.sections.filter(
      section => section.classId === selclass?.masterId
    );
    this.subjectForm.controls.section.setValue("");
  }
  async onloaddata() {
    await Promise.all([
      this.getclasses(),
      this.getsection(),
      this.getsubject(),
      this.getsubjecttype(),
      this.getteacher()
    ]);
  }
  async getclasses() {
    var classes: any = await firstValueFrom(this.createSubjectApiService.getAllMasterData());
    this.Classes = classes?.data?.classesList || [];
  }
  async getsection() {
    this.sections = await firstValueFrom(this.createSubjectApiService.getsections());
  }
  async getsubject() {
    this.subjects = await firstValueFrom(this.createSubjectApiService.getsubjects());
  }
  async getsubjecttype() {
    var type: any = await firstValueFrom(this.createSubjectApiService.getAllMasterData());
    this.subjecttypes = type?.data?.subjectTypesList || [];
  }
  async getteacher() {
    this.teachers = await firstValueFrom(this.createSubjectApiService.getstaff());
  }
  navigateMenu(url: any) {
    this._location.back();
  }
  onEdit() {
    debugger;
    this.showLoading = true;
    let saveConfig: any = {};

    let subjectConfig: any = this.subjectForm.value;

    saveConfig.classId = subjectConfig?.class?.masterId;
    saveConfig.sectionId = subjectConfig?.section?.id;
    saveConfig.subjectId = subjectConfig?.subject?.id;
    saveConfig.typeId = subjectConfig?.subjecttype?.masterId;
    saveConfig.staffId = subjectConfig?.teacher?.staffId;
    saveConfig.id = this.editPortalConfig.id;
    this.createSubjectApiService.updatesubjectman(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Subject Management updated successfully!', 'Subject Management has been updated successfully');
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
    this.subjectForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.subjectForm.value;
    let saveConfig: any = {};

    saveConfig.classId = portalConfig?.class?.masterId;
    saveConfig.sectionId = portalConfig?.section?.id;
    saveConfig.subjectId = portalConfig?.subject?.id;
    saveConfig.typeId = portalConfig?.subjecttype?.masterId;
    saveConfig.staffId = portalConfig?.teacher?.staffId;
    saveConfig.id = "";
    this.createSubjectApiService.savesubjectman(saveConfig).subscribe({
      next: (response) => {
        this.subjectForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Subject Management created successfully!', 'New Subject Management has been created successfully');
        this.subjectForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.subjectForm.enable();
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
    class: {
      required: "Class is required."
    }, section: {
      required: "Section is required."
    }, subject: {
      required: "Subject is required."
    }, subjecttype: {
      required: "Subject Type is required."
    }, teacher: {
      required: "Assigned Teacher is required."
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
  ngOnDestroy() {
    history.pushState({ backPageData: history.state.backPageData, isPageReload: true, portalConfigs: this.editPortalConfig }, "")
  }

}
