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
import { CreateAcademicYearApiService } from './create-academic-year-api.service';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-create-academic-year',
  standalone: true,
  imports: [
    ReactiveFormsModule, ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ToastModule,
    DropdownModule,
    InputTextModule, CalendarModule,
    ButtonModule, OverlayPanelModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './create-academic-year.component.html',
  styleUrl: './create-academic-year.component.css'
})
export class CreateAcademicYearComponent {

  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;
  constructor(
    private createacademicyearapiservice: CreateAcademicYearApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }
  yearForm = new FormGroup({
    name: new FormControl(""),
    fromdate: new FormControl<Date | null>(null, [Validators.required]),
    todate: new FormControl<Date | null>(null, [Validators.required]),
    totalworkingdays: new FormControl<number | null>(null,[Validators.required])
  });
  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    if (this.action == 'edit' || this.action == 'view') {
      let yearConfig: any;
      if (history.state.yearData) {
        yearConfig = history.state.yearData;
      }
      if (yearConfig) {
        this.yearForm.patchValue({
          name: yearConfig.name,
          fromdate: new Date(yearConfig.fromDate),
          todate: new Date(yearConfig.toDate),
          totalworkingdays: yearConfig.totalWorkingDays
        });

        this.yearForm.get('fromdate')?.valueChanges.subscribe(() => {
          this.calculateAcademicYear();
        });

        this.yearForm.get('todate')?.valueChanges.subscribe(() => {
          this.calculateAcademicYear();
        });
      }
      this.editPortalConfig = yearConfig;
      this.showUpdateButton = true;
    } else {
      this.yearForm.enable();
    }
  }
  calculateAcademicYear() {
    const fromDate = this.yearForm.get('fromdate')?.value ?? null;
    const toDate = this.yearForm.get('todate')?.value ?? null;


    if (fromDate && toDate && toDate > fromDate) {

      const startYear = fromDate.getFullYear();
      const endYear = startYear + 1;

      this.yearForm.get('name')?.setValue(`${startYear}-${endYear}`);
      let totalDays = 0;
      let currentDate = new Date(fromDate);

      while (currentDate <= toDate) {
        if (currentDate.getDay() !== 0) { // 0 = Sunday
          totalDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      this.yearForm.get('totalworkingdays')?.setValue(totalDays);

    } else {
      this.yearForm.get('name')?.setValue('');
      this.yearForm.get('totalworkingdays')?.setValue(null);
    }
  }
  navigateMenu(url: any) {
    this._location.back();
  }

  onEdit() {
    debugger;
    this.showLoading = true;
    let saveConfig: any = {};

    let Config: any = this.yearForm.getRawValue();

    saveConfig.name = Config?.name;
    saveConfig.fromDate = Config?.fromdate;
    saveConfig.toDate = Config?.todate;
    saveConfig.totalWorkingDays = Config?.totalworkingdays;
    saveConfig.id = this.editPortalConfig.id;
    this.createacademicyearapiservice.updateyear(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Academic Year updated successfully!', 'Academic Year has been updated successfully');
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
    this.yearForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.yearForm.getRawValue();

    let saveConfig: any = {};

    saveConfig.name = portalConfig?.name;
    saveConfig.fromDate = portalConfig?.fromdate;
    saveConfig.toDate = portalConfig?.todate;
    saveConfig.totalWorkingDays = portalConfig?.totalworkingdays;
    this.createacademicyearapiservice.saveyear(saveConfig).subscribe({
      next: (response) => {
        this.yearForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Academic Year created successfully!', 'New Academic Year has been created successfully');
        this.yearForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.yearForm.enable();
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
      required: "From Date is required."
    }, category: {
      required: "To Date is required."
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
