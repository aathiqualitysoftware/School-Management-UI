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
import { CreateRoleApiService } from './create-role-api.service';
import { RoleApiService } from '../role/role-api.service';

@Component({
  selector: 'app-create-role',
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
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent {
  categories: any[] = [];
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;
  roles: any[] = [];
  constructor(
    private createroleApiService: CreateRoleApiService, private roleapiservise: RoleApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }
  roleForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required])
  });
  async ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    this.roles = this.roleapiservise.getRoles();
    await this.onloaddata();
    if (this.action == 'edit' || this.action == 'view') {
      let roleConfig: any;
      if (history.state.rolesData) {
        roleConfig = history.state.rolesData;
      }
      if (roleConfig) {
        this.roleForm.patchValue({
          name: roleConfig.roleName,
          category: this.categories.find(
            d => d.masterId == roleConfig.roleCategory
          ) || null
        });
      }
      this.editPortalConfig = roleConfig;
      this.showUpdateButton = true;
    } else {
      this.roleForm.enable();
    }
  }
  async onloaddata() {
    await this.getcategories();
  }
  async getcategories() {
    try {
      const response: any = await firstValueFrom(
        this.createroleApiService.getAllMasterData()
      );
      this.categories = response?.data?.roleCategoryList || [];
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

    let roleConfig: any = this.roleForm.value;

    saveConfig.roleName = roleConfig?.name;
    saveConfig.roleCategory = roleConfig?.category?.masterId;
    saveConfig.roleId = this.editPortalConfig.roleId;
    this.createroleApiService.updaterole(saveConfig).subscribe({
      next: (response) => {
        const updatedRoles = response;
        this.roleapiservise.setRoles(updatedRoles); // 🔥 update shared state

        this.showLoading = false;
        this.showToast('SUCCESS', 'Role updated successfully!', 'Role has been updated successfully');
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
    this.roleForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.roleForm.value;
    let saveConfig: any = {};

    saveConfig.roleName = portalConfig?.name;
    saveConfig.roleCategory = portalConfig?.category?.masterId;
    this.createroleApiService.saverole(saveConfig).subscribe({
      next: (response) => {
        const updatedRoles = response;
        this.roleapiservise.setRoles(updatedRoles);
        this.roleForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Role created successfully!', 'New Role has been created successfully');
        this.roleForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.roleForm.enable();
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
    }, category: {
      required: "Category is required."
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
