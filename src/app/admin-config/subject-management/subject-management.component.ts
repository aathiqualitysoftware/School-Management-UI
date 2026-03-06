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
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Constants } from '../../util/constants';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SubjectManagementApiService } from './subject-management-api.service';
@Component({
  selector: 'app-subject-management',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ButtonModule, ConfirmPopupModule, TableModule, Button, FormsModule, DialogModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './subject-management.component.html',
  styleUrl: './subject-management.component.css'
})
export class SubjectManagementComponent {

  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';

  Classes: any[] = [];
  sections: any[] = [];

  selectedclass: any;
  selectedsection: any;

  subjects: any[] = [];
  subjecttypes: any[] = [];
  teachers: any[] = [];

  allClassSubjects: any[] = [];
  classSubjects: any[] = [];
  selectedclssubject: any;

  constructor(
    private router: Router, private fb: FormBuilder, private messageService: MessageService, private subjectApiService: SubjectManagementApiService,
    private environment: EnvironmentService,
    private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    if (history.state.isPageReload) {
      if (history.state.backPageData) {
        let backPageData = history.state.backPageData;
        this.classSubjects = backPageData.classSubjects;
        if (history.state?.user) {
          this.classSubjects.forEach((user, index) => {
            if (user.id == history.state.user.id) {
              this.classSubjects[index] = history.state.user;
            }
          });
        }
        this.classSubjects = backPageData.classSubjects;
        this.allClassSubjects = backPageData.allClassSubjects;
        this.tableMultiSortingMetaData = backPageData.tableMultiSortingMetaData;
        this.tableRows = backPageData.tableRows;
        this.searchText = backPageData.searchText;

        this.Classes = backPageData.Classes;
        this.subjects = backPageData.subjects;
        this.subjecttypes = backPageData.subjecttypes;
        this.teachers = backPageData.teachers;
        this.sections = backPageData.sections;

        this.selectedclass = backPageData.selectedclass;
        this.selectedsection = backPageData.selectedsection;

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
      alldata: this.subjectApiService.getAllMasterData(),
      sections: this.subjectApiService.getsections(),
      subjects: this.subjectApiService.getsubjects(),
      teachers: this.subjectApiService.getstaff(),
      classSubjects: this.subjectApiService.getsubjectmanlistData()
    }).subscribe((res: any) => {
      debugger;
      this.sections = res.sections;
      this.Classes = res.alldata?.data?.classesList || [];
      this.subjects = res.subjects;
      this.teachers = res.teachers;
      this.subjecttypes = res.alldata?.data?.subjectTypesList || [];
      this.allClassSubjects = res.classSubjects;
      this.classSubjects = [...this.allClassSubjects];

      this.loadclasssubjectdata(this.classSubjects);
    });
  }

  getClassName(id: number) {
    return this.Classes?.find(c => c.masterId == id)?.name || '';
  }

  getSubjectName(id: number) {
    return this.subjects?.find(s => s.id == id)?.name || '';
  }

  getSectionName(id: number) {
    return this.sections?.find(s => s.id == id)?.sectionName || '';
  }
  getstaffname(id: any) {
    return this.teachers?.find(s => s.staffId == id)?.firstName || '';
  }
  getTypeName(id: number) {
    debugger;
    return this.subjecttypes?.find(s => s.masterId == id)?.name || '';
  }
  loadclasssubjectdata(classSubjectsdata: any) {

    this.classSubjects = classSubjectsdata.map((clssub: any) => {

      const className = this.getClassName(clssub?.classId);
      const subjectName = this.getSubjectName(clssub?.subjectId);
      const sectionName = this.getSectionName(clssub?.sectionId);
      debugger;
      const subjectTypeName = this.getTypeName(clssub.typeId);
      const staffName = this.getstaffname(clssub.staffId);
      return {
        ...clssub,
        className,
        subjectName,
        sectionName,
        subjectTypeName,
        staffName
      };
    });

    console.log(this.classSubjects);
  }
  resetFilter() {
    this.selectedsection = null;
    this.selectedclass = null;
    this.dt1!.clear();
    this.onloaddata();
  }
  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }
  filteredSections: any[] = [];
  onClassChange() {
    if (!this.sections || !this.selectedclass?.masterId) {
      this.filteredSections = [];
      return;
    }
    this.filteredSections = this.sections.filter(
      section => section.classId === this.selectedclass?.masterId
    );
    this.selectedsection = "";
  }


  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }

  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }
  getCurrentPageState() {
    let state = {
      selectedclass: this.selectedclass,
      selectedsection: this.selectedsection,
      classSubjects: this.classSubjects,
      allClassSubjects: this.allClassSubjects,
      Classes: this.Classes,
      subjects: this.subjects,
      subjecttypes: this.subjecttypes,
      teachers: this.teachers,
      sections: this.sections,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }
  getdatabysearch() {

    // if (!this.selectedclass || !this.selectedsection) return;
    // this.classSubjects = this.allClassSubjects.filter(item =>
    //   item.classId === this.selectedclass.id &&
    //   item.sectionId === this.selectedsection.id
    // );
    if (this.selectedclass.masterId) {
      this.dt1!.filter(this.selectedclass.masterId, 'classId', 'equals');
    }

    if (this.selectedsection.id) {
      this.dt1!.filter(this.selectedsection.id, 'sectionId', 'equals');
    }
  }
  createSubject() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/create-subject-management";
    this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
  }

  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/create-subject-management";
    this.router.navigate([url], { queryParams: { action: 'edit', id: data.id }, state: { subjectData: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/create-subject-management";
    this.router.navigate([url], { queryParams: { action: 'view', id: data.id }, state: { subjectData: data, backPageData: this.getCurrentPageState() } });
  }
  cancelPopup() {
    this.confirmationService.close()
  }

  confirmPopup() {
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.subjectApiService.deleteclssubById(this.selectedclssubject?.id).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Subject Management deleted successfully!', 'Subject Management has been deleted successfully');
        this.removeUserFromArray(this.selectedclssubject?.id);
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
    this.selectedclssubject = subject;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }

  removeUserFromArray(id: any) {
    const index = this.classSubjects.findIndex(item => item.id === id);
    this.classSubjects = this.classSubjects.slice(0, index).concat(this.classSubjects.slice(index + 1))
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
