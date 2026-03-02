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
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateDesignationApiService } from './create-designation-api.service';
@Component({
  selector: 'app-create-designation',
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

  templateUrl: './create-designation.component.html',
  styleUrl: './create-designation.component.css'
})
export class CreateDesignationComponent {

  active: any[] = [{ label: "Yes", value: true }, { label: "No", value: false }];
  departments: any[] = [];
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;

  constructor(
    private createdesgapiservice: CreateDesignationApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }
  desgForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    department: new FormControl("", [Validators.required]),
    active: new FormControl("", [Validators.required]),
    description: new FormControl("")
  });
  async ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    await this.onloaddata();
    debugger;
    if (this.action == 'edit' || this.action == 'view') {
      let desgConfig: any;
      if (history.state.desgData) {
        desgConfig = history.state.desgData;
      }
      if (desgConfig) {
        this.desgForm.patchValue({
          name: desgConfig.designationName,
          description: desgConfig.description,
          department: this.departments.find(
            d => d.masterId == desgConfig.departmentId
          ) || null,
          active: this.active.find(
            d => d.value === desgConfig.isActive
          ) || null
        });
      }
      this.editPortalConfig = desgConfig;
      this.showUpdateButton = true;
    } else {
      this.desgForm.enable();
    }
  }
  async onloaddata() {
    await this.getAllmasterdata();
  }
  async getAllmasterdata() {
    try {
      const response: any = await firstValueFrom(
        this.createdesgapiservice.getAllMasterData()
      );
      this.departments = response?.data?.departmentList || [];
    } catch (err) {
      console.error(err);
    }
  }
  navigateMenu(url: any) {
    this._location.back();
  }
  onEdit() {
    debugger;
    this.showLoading = true;
    let saveConfig: any = {};
    let desgConfig: any = this.desgForm.value;
    saveConfig.designationName = desgConfig?.name;
    saveConfig.designationId = this.editPortalConfig?.designationId;
    saveConfig.departmentId = desgConfig?.department?.masterId;
    saveConfig.description = desgConfig?.description;
    saveConfig.isActive = desgConfig?.active?.value;
    saveConfig.createdAt = null;
    saveConfig.id = this.editPortalConfig.id;
    this.createdesgapiservice.updatedesg(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Designation updated successfully!', 'Designation has been updated successfully');
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
    this.desgForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.desgForm.value;
    let saveConfig: any = {};
    saveConfig.designationName = portalConfig?.name;
    saveConfig.designationId = "";
    saveConfig.departmentId = portalConfig?.department?.masterId;
    saveConfig.description = portalConfig?.description;
    saveConfig.isActive = portalConfig?.active?.value;
    saveConfig.createdAt = null;
    this.createdesgapiservice.savedesg(saveConfig).subscribe({
      next: (response) => {
        this.desgForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Designation created successfully!', 'New Designation has been created successfully');
        this.desgForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.desgForm.enable();
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
      required: "Designation Name is required."
    }, category: {
      required: "Department is required."
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
