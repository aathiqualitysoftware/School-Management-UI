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
import { config, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateQuartersApiService } from './create-quarters-api.service';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-create-quarters',
  standalone: true,
  imports: [
    ReactiveFormsModule, ProgressSpinnerModule,
    CommonModule, CalendarModule,
    FormsModule,
    ToastModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, OverlayPanelModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './create-quarters.component.html',
  styleUrl: './create-quarters.component.css'
})
export class CreateQuartersComponent {
  active: any[] = [{ label: "Yes", value: true }, { label: "No", value: false }];
  years: any[] = [];
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;

  constructor(
    private createquarterApiService: CreateQuartersApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }
  quarterForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    year: new FormControl("", [Validators.required]),
    startDate: new FormControl(null as Date | null, [Validators.required]),
    endDate: new FormControl(null as Date | null, [Validators.required]),
    active: new FormControl("", [Validators.required])
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
      let Config: any;
      if (history.state.QuarterData) {
        Config = history.state.QuarterData;
      }
      if (Config) {
        this.quarterForm.patchValue({
          name: Config.quarterName,
          year: this.years.find(
            d => d.id === Config.academicYearId
          ) || null,
          startDate: new Date(Config.startDate),
          endDate: new Date(Config.endDate),
          active: this.active.find(a => a.value === Config.isActive) || null
        });
      }
      this.editPortalConfig = Config;
      this.showUpdateButton = true;
    } else {
      this.quarterForm.enable();
    }
  }
  async onloaddata() {
    await Promise.all([
      this.getyears()
    ]);
  }
  async getyears() {
    this.years = await firstValueFrom(this.createquarterApiService.getyears());
  }
  navigateMenu(url: any) {
    this._location.back();
  }
  onEdit() {
    debugger;
    this.showLoading = true;
    let saveConfig: any = {};

    let Config: any = this.quarterForm.value;
    saveConfig.quarterName = Config?.name;
    saveConfig.academicYearId = Config?.year?.id;
    saveConfig.startDate = Config?.startDate;
    saveConfig.endDate = Config?.endDate;
    saveConfig.isActive = Config?.active?.value;
    saveConfig.createdDate = new Date();
    saveConfig.modifiedDate = null;

    saveConfig.quarterId = this.editPortalConfig.quarterId;
    this.createquarterApiService.updatequarter(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Quarter updated successfully!', 'Quarter has been updated successfully');
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
    this.quarterForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.quarterForm.value;
    let saveConfig: any = {};

    saveConfig.quarterName = portalConfig?.name;
    saveConfig.academicYearId = portalConfig?.year?.id;
    saveConfig.startDate = portalConfig?.startDate;
    saveConfig.endDate = portalConfig?.endDate;
    saveConfig.isActive = portalConfig?.active?.value;
    saveConfig.createdDate = null;
    saveConfig.modifiedDate = null;
    this.createquarterApiService.savequarter(saveConfig).subscribe({
      next: (response) => {
        this.quarterForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Quarter created successfully!', 'New Quarter has been created successfully');
        this.quarterForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.quarterForm.enable();
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
      required: "Role Name is required."
    }, year: {
      required: "Academic Year is required."
    }, startDate: {
      required: "Start Date is required."
    }, endDate: {
      required: "End Date is required."
    }, active: {
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
