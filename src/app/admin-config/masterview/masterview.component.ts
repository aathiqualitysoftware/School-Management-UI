import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Constants } from '../../util/constants';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../environment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MasterViewApiService } from './masterview-api.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-masterview',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ButtonModule, ConfirmPopupModule, TableModule, Button, FormsModule, DialogModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './masterview.component.html',
  styleUrl: './masterview.component.css'
})
export class MasterviewComponent {
  allMasters: any[] = [];
  masters: any[] = [];
  selectedmast: any;
  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';
  mastercombo: any[] = [];
  // = [{ value: 1, name: 'Academic Year' }, { value: 2, name: 'Department' }, { value: 3, name: 'Exam Type' }];
  selectedcombo: any;
  constructor(
    private router: Router, private fb: FormBuilder, private messageService: MessageService, private masterviewapiservice: MasterViewApiService,
    private environment: EnvironmentService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    debugger;

    if (history.state.isPageReload) {
      if (history.state.backPageData) {
        let backPageData = history.state.backPageData;
        this.masters = backPageData.masters;
        if (history.state?.user) {
          this.masters.forEach((user, index) => {
            if (user.id == history.state.user.id) {
              this.masters[index] = history.state.user;
            }
          });
        }
        this.masters = backPageData.masters;
        this.allMasters = backPageData.allmasters;
        this.tableMultiSortingMetaData = backPageData.tableMultiSortingMetaData;
        this.tableRows = backPageData.tableRows;
        this.searchText = backPageData.searchText;
        this.mastercombo = backPageData.mastercombo;

        setTimeout(() => {
          this.searchText = backPageData.searchText;
          this.applyGlobalFilter(this.searchText, 'contains');
          let backPageState: any = { backPageData: this.getCurrentPageState() };
          history.replaceState(backPageState, "", window.location.href);
        }, 50);
      } else {
        this.onloaddata();
      }
    } else {
      this.onloaddata();
    }
  }
  // onloaddata() {
  //   this.getmasterdata();
  //   this.getmastertypedata();
  // }

  onloaddata() {
    forkJoin({
      types: this.masterviewapiservice.getmastertypedata(),
      masters: this.masterviewapiservice.getmasterdata()
    }).subscribe(({ types, masters }) => {

      this.mastercombo = types;

      this.masters = masters.map((sub: any) => {
        return {
          ...sub,
          active: sub.isActive ? 'Yes' : 'No',
          mastername: this.getmastName(sub.masterTypeId)
        };
      });

      this.allMasters = this.masters;
    });
  }
  // getmastertypedata() {
  //   this.masterviewapiservice.getmastertypedata().subscribe({
  //     next: (response) => {
  //       const data = response;
  //       this.mastercombo = data;
  //     }
  //   });
  // }
  formname = "";
  formid: any;
  onMasterChange(event: any) {
    debugger;
    if (event.value) {
      this.formname = event.value.typeName;
      this.formid = event.value.masterTypeId;
    } else {
      this.formname = "";
      this.formid = null;
    }
  }
  getmasterdet(selmast: any) {
    debugger;
    this.masters = this.allMasters.filter(
      x => x.masterTypeId === selmast.masterTypeId
    );
  }
  getmastName(id: number) {
    return this.mastercombo?.find(c => c.masterTypeId == id)?.typeName || '';
  }
  // getmasterdata() {
  //   this.masterviewapiservice.getmasterdata().subscribe({
  //     next: (response) => {
  //       const data = response;
  //       this.masters = data;
  //       this.masters = data.map((sub: any) => {
  //         const Active = sub.isActive ? 'Yes' : 'No';
  //         const mastername = this.getmastName(sub?.masterTypeId);
  //         return {
  //           ...sub,
  //           active: Active,
  //           mastername: mastername
  //         };
  //       });

  //       this.allMasters = this.masters;
  //     }
  //   });
  // }
  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }

  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }
  resetFilter() {
    this.dt1!.clear();
    this.masters = [...this.allMasters];
    this.selectedcombo = "";
  }
  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }
  getCurrentPageState() {
    let state = {
      masters: this.masters,
      allmasters: this.allMasters,
      mastercombo: this.mastercombo,
      selectedcombo: this.selectedcombo,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }
  createMaster() {
    if (!this.formname) {
      this.showToast('WARNING', 'Master Selection', 'Please select Master Dropdown');
      return;
    }
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/masters/create-master";
    this.router.navigate([url], { queryParams: { action: 'save', FormName: this.formname, id: this.formid }, state: { backPageData: this.getCurrentPageState() } });
  }

  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/masters/create-master";
    this.router.navigate([url], { queryParams: { action: 'edit', id: data.id, FormName: this.formname ? this.formname : data.mastername }, state: { Data: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/masters/create-master";
    this.router.navigate([url], { queryParams: { action: 'view', id: data.id, FormName: this.formname ? this.formname : data.mastername }, state: { Data: data, backPageData: this.getCurrentPageState() } });
  }
  cancelPopup() {
    this.confirmationService.close()
  }

  confirmPopup() {
    debugger;
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.masterviewapiservice.deletemasterById(this.selectedmast?.masterId).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Master deleted successfully!', 'Master has been deleted successfully');
        this.removeUserFromArray(this.selectedmast?.masterId);
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
      },
      complete: () => { }
    });
  }

  confirm(event: Event, data: any) {
    this.selectedmast = data;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }
  removeUserFromArray(id: any) {
    const index = this.masters.findIndex(item => item.masterId === id);
    this.masters = this.masters.slice(0, index).concat(this.masters.slice(index + 1))
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

  showToast(status: string, heading: string, toastMessage: string) {
    if (status == 'SUCCESS') {
      this.messageService.add({ key: 'tcc', severity: 'success', life: 5000, summary: heading, detail: toastMessage });
    } else if (status == 'WARNING') {
      this.messageService.add({ key: 'tcc', severity: 'warn', life: 10000, summary: heading, detail: toastMessage });
    } else if (status == 'ERROR') {
      this.messageService.add({ key: 'tcc', severity: 'error', life: 10000, summary: heading, detail: toastMessage });
    }
  }
}
