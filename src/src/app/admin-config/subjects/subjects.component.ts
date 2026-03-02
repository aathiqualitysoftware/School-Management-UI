import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EnvironmentService } from '../../environment.service';
import { SubjectsApiService } from './subjects-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Constants } from '../../util/constants';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ButtonModule, ConfirmPopupModule, TableModule, Button, FormsModule, DialogModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;
  Departments: any[] = [];
  selecteddept: any;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';
  subjects: any[] = [];
  selectedsubject: any;

  constructor(
    private router: Router, private fb: FormBuilder, private messageService: MessageService, private subjectApiService: SubjectsApiService,
    private environment: EnvironmentService,
    private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    if (history.state.isPageReload) {
      if (history.state.backPageData) {
        let backPageData = history.state.backPageData;
        this.subjects = backPageData.subjects;
        if (history.state?.user) {
          this.subjects.forEach((user, index) => {
            if (user.id == history.state.user.id) {
              this.subjects[index] = history.state.user;
            }
          });
        }
        this.subjects = backPageData.subjects;
        this.tableMultiSortingMetaData = backPageData.tableMultiSortingMetaData;
        this.tableRows = backPageData.tableRows;
        this.selecteddept = backPageData.selecteddept;
        this.searchText = backPageData.searchText;
        this.Departments = backPageData.Departments;

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
  onloaddata() {
    forkJoin({
      subjects: this.subjectApiService.getsubject(),
      departments: this.subjectApiService.getAllMasterData()
    }).subscribe(({ subjects, departments }: any) => {
      this.Departments = departments?.data?.departmentList || [];
      const subjdata = subjects;
      this.subjects = subjdata;
      this.subjects = subjdata.map((sub: any) => {
        const createddate = new Date(sub.createdAt);
        const Assigned = sub.isAssigned ? 'Yes' : 'No';
        const deptName = this.getDeptName(sub?.department);
        return {
          ...sub,
          formattedcreatedDate: this.formatDate(createddate),
          Assigned: Assigned,
          departmentname: deptName
        };
      });
    });

    // this.getsubjectdata();
    // this.getAllmasterdata();
  }
  resetFilter() {
    this.selecteddept = null;
    this.dt1!.clear();
    this.onloaddata();
  }
  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }

  getdatabydept(event: any) {
    debugger;
    if (event.masterId) {
      this.dt1!.filter(event.masterId, 'department', 'equals');
      console.log(this.dt1!.filter(event.masterId, 'department', 'contains'));
    } else {
      this.dt1!.clear(); // reset filter if cleared
    }
  }
  getDeptName(id: number) {
    return this.Departments?.find(c => c.masterId == id)?.name || '';
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }

  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }
  getCurrentPageState() {
    let state = {
      selecteddept: this.selecteddept,
      subjects: this.subjects,
      Departments: this.Departments,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }
  createSubject() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/create-subject";
    this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
  }

  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/create-subject";
    this.router.navigate([url], { queryParams: { action: 'edit', id: data.id }, state: { subjectData: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/create-subject";
    this.router.navigate([url], { queryParams: { action: 'view', id: data.id }, state: { subjectData: data, backPageData: this.getCurrentPageState() } });
  }
  cancelPopup() {
    this.confirmationService.close()
  }

  confirmPopup() {
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.subjectApiService.deletesubjectById(this.selectedsubject?.id).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Subject deleted successfully!', 'Subject has been deleted successfully');
        this.removeUserFromArray(this.selectedsubject?.id);
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

  confirm(event: Event, subject: any) {
    this.selectedsubject = subject;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }


  removeUserFromArray(id: any) {
    const index = this.subjects.findIndex(item => item.id === id);
    this.subjects = this.subjects.slice(0, index).concat(this.subjects.slice(index + 1))
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
