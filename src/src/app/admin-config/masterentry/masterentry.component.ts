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
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MasterEntryApiService } from './masterentry-api.service';
@Component({
  selector: 'app-masterentry',
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
  templateUrl: './masterentry.component.html',
  styleUrl: './masterentry.component.css'
})
export class MasterentryComponent {
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  formname = "";
  formid: any;
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;
  active: any[] = [{ label: "Yes", value: true }, { label: "No", value: false }];
  constructor(
    private masterentryapiservice: MasterEntryApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }
  masterForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    active: new FormControl("", [Validators.required]),
    order: new FormControl(""),
    description: new FormControl("")
  });
  async ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
        this.formname = params['FormName'];
        this.formid = params['id'];
      }
    });
    if (this.action == 'edit' || this.action == 'view') {
      let mastConfig: any;
      if (history.state.Data) {
        mastConfig = history.state.Data;
      }
      if (mastConfig) {
        this.masterForm.patchValue({
          name: mastConfig.name,
          description: mastConfig.description,
          order: mastConfig.displayOrder,
          active: this.active.find(
            d => d.value === mastConfig.isActive
          ) || null
        });
      }
      this.editPortalConfig = mastConfig;
      this.showUpdateButton = true;
    } else {
      this.masterForm.enable();
    }
  }
  navigateMenu(url: any) {
    this._location.back();
  }
  onEdit() {
    debugger;
    this.showLoading = true;
    let saveConfig: any = {};
    let mastConfig: any = this.masterForm.value;

    saveConfig.createdBy = null;
    saveConfig.createdDate = new Date();
    saveConfig.parentMasterId = null;
    saveConfig.masterTypeId = this.editPortalConfig.masterTypeId;
    saveConfig.modifiedBy = null;
    saveConfig.modifiedDate = null;
    saveConfig.name = mastConfig?.name;
    saveConfig.isActive = mastConfig?.active?.value;
    saveConfig.displayOrder = mastConfig?.order;
    saveConfig.description = mastConfig?.description;
    saveConfig.masterId = this.editPortalConfig.masterId;
    this.masterentryapiservice.updatemast(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', this.formname + ' updated successfully!', this.formname + ' has been updated successfully');
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
    this.masterForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.masterForm.value;
    let saveConfig: any = {};

    saveConfig.createdBy = null;
    saveConfig.masterTypeId = this.formid;
    saveConfig.createdDate = new Date();
    saveConfig.parentMasterId = null;
    saveConfig.modifiedBy = null;
    saveConfig.modifiedDate = null;
    saveConfig.name = portalConfig?.name;
    saveConfig.isActive = portalConfig?.active?.value;
    saveConfig.displayOrder = portalConfig?.order;
    saveConfig.description = portalConfig?.description;
    this.masterentryapiservice.savemast(saveConfig).subscribe({
      next: (response) => {
        this.masterForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', this.formname + ' created successfully!', 'New ' + this.formname + ' has been created successfully');
        this.masterForm.reset();

      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.masterForm.enable();
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
      required: "Name is required."
    },
    active: {
      required: "Active Status is required."
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
