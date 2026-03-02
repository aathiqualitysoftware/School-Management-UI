import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { CreateSubjectApiService } from './create-subject-api.service';
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
import { SubjectsApiService } from '../subjects/subjects-api.service';

@Component({
  selector: 'app-create-subject',
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
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.css'
})
export class CreateSubjectComponent {
  departments: any[] = [];
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;
  assigned: any[] = [{ label: "Yes", value: true }, { label: "No", value: false }];
  constructor(
    private createSubjectApiService: CreateSubjectApiService, private subjectapiservice: SubjectsApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }

  subjectForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    department: new FormControl("", [Validators.required]),
    assigned: new FormControl("", [Validators.required])
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
      console.log(subjectConfig.department);
      console.log(this.departments);
      if (subjectConfig) {
        this.subjectForm.patchValue({
          name: subjectConfig.name,
          department: this.departments.find(
            d => d.masterId == subjectConfig.department
          ) || null,
          assigned: subjectConfig.isAssigned ? subjectConfig.isAssigned : false
        });
      }
      this.editPortalConfig = subjectConfig;
      this.showUpdateButton = true;
    } else {
      this.subjectForm.enable();
    }
  }
  async onloaddata() {
    await this.getAllmasterdata();
  }
  async getAllmasterdata() {
    try {
      const response: any = await firstValueFrom(
        this.subjectapiservice.getAllMasterData()
      );
      this.departments = response?.data?.departmentList || [];
    } catch (err) {
      console.error(err);
    }
  }
  // getAllmasterdata() {
  //   this.subjectapiservice.getAllMasterData().subscribe({
  //     next: (response: any) => {
  //       this.departments = response?.data?.departmentList || [];
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // }
  navigateMenu(url: any) {
    this._location.back();
  }
  onEdit() {
    debugger;
    this.showLoading = true;
    let saveConfig: any = {};

    let subjectConfig: any = this.subjectForm.value;

    saveConfig.name = subjectConfig?.name;
    saveConfig.isAssigned = subjectConfig?.assigned;
    saveConfig.department = subjectConfig?.department?.masterId;
    saveConfig.createdAt = new Date().toISOString();
    saveConfig.id = this.editPortalConfig.id;
    this.createSubjectApiService.updatesubject(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Subject updated successfully!', 'Subject has been updated successfully');
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

    saveConfig.name = portalConfig?.name;
    saveConfig.isAssigned = portalConfig?.assigned;
    saveConfig.department = portalConfig?.department?.masterId;
    saveConfig.createdAt = new Date().toISOString();
    saveConfig.id = "";
    this.createSubjectApiService.savesubject(saveConfig).subscribe({
      next: (response) => {
        this.subjectForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Subject created successfully!', 'New Subject has been created successfully');
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
    name: {
      required: "Subject Name is required."
    }, department: {
      required: "Department is required."
    }, assigned: {
      required: "Assigned is required."
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
