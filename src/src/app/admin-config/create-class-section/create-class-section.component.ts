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
import { CreateClassSectionApiService } from './create-class-section-api.service';
@Component({
  selector: 'app-create-class-section',
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
  templateUrl: './create-class-section.component.html',
  styleUrl: './create-class-section.component.css'
})
export class CreateClassSectionComponent {
  active: any[] = [{ label: "Yes", value: true }, { label: "No", value: false }];
  classes: any[] = [];
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;

  constructor(
    private createsectionApiService: CreateClassSectionApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }
  sectionForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    class: new FormControl("", [Validators.required]),
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
      if (history.state.sectionData) {
        Config = history.state.sectionData;
      }
      if (Config) {
        this.sectionForm.patchValue({
          name: Config.sectionName,
          class: this.classes.find(
            d => d.masterId === Config.classId
          ) || null,
          active: this.active.find(
            d => d.value === Config.isActive
          ) || null
        });
      }
      this.editPortalConfig = Config;
      this.showUpdateButton = true;
    } else {
      this.sectionForm.enable();
    }
  }
  async onloaddata() {
    await Promise.all([
      this.getclasses()
    ]);
  }
  async getclasses() {
    var classes: any = await firstValueFrom(this.createsectionApiService.getAllMasterData());
    this.classes = classes?.data?.classesList || [];
  }
  navigateMenu(url: any) {
    this._location.back();
  }

  onEdit() {
    debugger;
    this.showLoading = true;
    let saveConfig: any = {};

    let Config: any = this.sectionForm.value;

    saveConfig.sectionName = Config?.name;
    saveConfig.classId = Config?.class?.masterId;
    saveConfig.isActive = Config?.active?.value;
    saveConfig.createdBy = null;
    saveConfig.createdAt = null;
    saveConfig.updatedBy = null;
    saveConfig.updatedAt = null;
    saveConfig.id = this.editPortalConfig.id;
    this.createsectionApiService.updatesection(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Section updated successfully!', 'Section has been updated successfully');
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
    this.sectionForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.sectionForm.value;
    let saveConfig: any = {};

    saveConfig.sectionName = portalConfig?.name;
    saveConfig.classId = portalConfig?.class?.masterId;
    saveConfig.isActive = portalConfig?.active?.value;
    saveConfig.createdBy = null;
    saveConfig.createdAt = null;
    saveConfig.updatedBy = null;
    saveConfig.updatedAt = null;
    this.createsectionApiService.savesection(saveConfig).subscribe({
      next: (response) => {
        this.sectionForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Section created successfully!', 'New Section has been created successfully');
        this.sectionForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.sectionForm.enable();
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
      required: "Section Name is required."
    }, class: {
      required: "Class is required."
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
