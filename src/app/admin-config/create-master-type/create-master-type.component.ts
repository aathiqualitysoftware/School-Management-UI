import { CommonModule, Location } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateMasterTypeApiService } from './create-master-type-api.service';
@Component({
  selector: 'app-create-master-type',
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
  templateUrl: './create-master-type.component.html',
  styleUrl: './create-master-type.component.css'
})
export class CreateMasterTypeComponent {
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;
  active: any[] = [{ label: "Yes", value: true }, { label: "No", value: false }];
  constructor(
    private createtypeapiservice: CreateMasterTypeApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }
  mastertypeForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    active: new FormControl("", [Validators.required])
  });
  async ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    if (this.action == 'edit' || this.action == 'view') {
      let Config: any;
      if (history.state.mastertypeData) {
        Config = history.state.mastertypeData;
      }
      if (Config) {
        this.mastertypeForm.patchValue({
          name: Config.typeName,
          active: this.active.find(a => a.value === Config.isActive) || null
        });
      }
      this.editPortalConfig = Config;
      this.showUpdateButton = true;
    } else {
      this.mastertypeForm.enable();
    }
  }
  navigateMenu(url: any) {
    this._location.back();
  }
  onEdit() {
    debugger;
    this.showLoading = true;
    let saveConfig: any = {};

    let typeConfig: any = this.mastertypeForm.value;

    saveConfig.typeName = typeConfig?.name;
    saveConfig.typeCode = typeConfig?.name
      ?.replace(/\s+/g, '')
      ?.toUpperCase();
    saveConfig.isActive = typeConfig?.active?.value;
    saveConfig.createdDate = new Date();
    saveConfig.createdBy = null;
    saveConfig.masterTypeId = this.editPortalConfig.masterTypeId;
    this.createtypeapiservice.updatemast(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Master Type updated successfully!', 'Master Type has been updated successfully');
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
    this.mastertypeForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.mastertypeForm.value;
    let saveConfig: any = {};

    saveConfig.createdDate = new Date();
    saveConfig.createdBy = null;
    saveConfig.typeName = portalConfig?.name;
    saveConfig.typeCode = portalConfig?.name
      ?.replace(/\s+/g, '')
      ?.toUpperCase();
    saveConfig.isActive = portalConfig?.active?.value;
    saveConfig.masterTypeId = null;
    this.createtypeapiservice.savemast(saveConfig).subscribe({
      next: (response) => {
        this.mastertypeForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Master Type created successfully!', 'New Master Type has been created successfully');
        this.mastertypeForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.mastertypeForm.enable();
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
      required: "Master Type Name is required."
    }, active: {
      required: "Status is required."
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
