import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../../util/constants';
import { StudentApiService } from './student-api.service';
import { EnvironmentService } from '../../environment.service';
import { AuthService } from '../../auth.service';
@Component({
    selector: 'app-student',
    standalone: true,
    imports: [CommonModule, ToastModule, DropdownModule, DatePipe, InputTextModule, TableModule, ConfirmPopupModule, FormsModule, ReactiveFormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ConfirmationService, MessageService],
    templateUrl: './student.component.html',
    styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
    classes: any[] | undefined;
    selectedClass: any;
    sectionDisabled: boolean = true;
    sections: any[] | undefined;
    selectedSection: any;
    students: any[] = [];
    selectedStudent: any;
    deleteLoading = false;
    deleteCnfText = "Confirm";
    enableSearchLoading = false;
    searchText = "";
    tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
    tableRows = 5;
    userRoles: any = [];
    readOnlyRoles: String[] = Constants.PORTAL_ADMIN;
    readWriteRoles: String[] = Constants.PORTAL_ADMIN;

    nationalityList: any[] | undefined;
    classesList: any[] | undefined;
    sectionsList: any[] | undefined;
    academicYearList: any[] | undefined;
    gendersList: any[] | undefined;
    religionsList: any[] | undefined;
    categoriesList: any[] | undefined;
    bloodGroupsList: any[] | undefined;
    languagesList: any[] | undefined;

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private studentApiService: StudentApiService,
        private environment: EnvironmentService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        if (history.state.isPageReload) {
            if (history.state.backPageData) {
                let backPageData = history.state.backPageData;
                this.students = backPageData.students;
                if (history.state?.user) {
                    this.students.forEach((user, index) => {
                        if (user.id == history.state.user.id) {
                            this.students[index] = history.state.user;
                        }
                    });
                }
                this.selectedClass = backPageData.selectedClass;
                this.classes = backPageData.classes;
                this.sectionDisabled = false;
                this.sections = backPageData.sections;
                this.selectedSection = backPageData.selectedSection;
                this.tableMultiSortingMetaData = backPageData.tableMultiSortingMetaData;
                this.tableRows = backPageData.tableRows
                setTimeout(() => {
                    this.searchText = backPageData.searchText;
                    this.applyFilterGlobal(this.searchText, 'contains');
                    let backPageState: any = { backPageData: this.getCurrentPageState() };
                    history.replaceState(backPageState, "", window.location.href);
                }, 50);
            } else {
                this.getMasterData();
            }
        } else {
            this.getMasterData();
        }
        this.userRoles = this.authService.getUserRole();
    }

    isRoleReadOnly() {

        return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
    }

    isRoleReadWrite() {
        return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
    }

    getMasterData() {
        this.studentApiService.getAllMasterData().subscribe({
            next: (response: any) => {
                this.classes = response?.data?.classesList || [];
            },
            error: (err: HttpErrorResponse) => {
                this.segregateErrors(err);
            },
            complete: () => { }
        });
    }
    getSectionData(classId: any) {
        this.studentApiService.getSectionData(classId).subscribe({
            next: (response) => {
                this.sections = response;
            },
            error: (err: HttpErrorResponse) => {
                this.segregateErrors(err);
            },
            complete: () => { }
        });
    }

    @ViewChild('dt1') dt1: Table | undefined;
    applyFilterGlobal(searchText: any, stringVal: any) {
        this.dt1!.filterGlobal(searchText, stringVal);
    }

    onClass(event: any) {
        if (this.selectedClass != null) {
            event.value.classLabel = event.value.className;
            this.sectionDisabled = false;
            this.getSectionData(this.selectedClass.masterId);
        } else {
            this.sections = [];
            this.sectionDisabled = true;
            this.selectedSection = undefined;
        }
    }

    onSection(event: any) {
        if (event.value != null) {
            event.value.sectionLabel = event.value.sectionName;
        }
    }

    getStudent() {
        this.enableSearchLoading = true;
        this.students = [];
        this.searchText = "";
        this.applyFilterGlobal(this.searchText, 'contains');
        this.tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
        this.dt1!._rows = 8;
        this.deleteLoading = false;
        this.studentApiService.getStudentData(this.selectedClass.masterId, this.selectedSection.id).subscribe({
            next: (response) => {
                this.students = response;
                this.enableSearchLoading = false;
            },
            error: (err: HttpErrorResponse) => {
                this.segregateErrors(err);
                this.enableSearchLoading = false;
            },
            complete: () => { }
        });
    }

    reset() {
        this.selectedClass = undefined;
        this.sections = undefined;
        this.sectionDisabled = true;
        this.selectedSection = undefined;
        this.students = [];
        this.searchText = "";
        this.applyFilterGlobal(this.searchText, 'contains');
        this.tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
        this.dt1!._rows = 8;
        this.selectedStudent = undefined;
    }

    createUserNav() {
        let backPageState: any = { backPageData: this.getCurrentPageState() };
        history.replaceState(backPageState, "", window.location.href);
        let url = this.environment.getConfig('basePath') + "/admin-config/create-student";
        this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
    }

    editContent(student: any) {
        let backPageState: any = { backPageData: this.getCurrentPageState() };
        history.replaceState(backPageState, "", window.location.href);
        let url = this.environment.getConfig('basePath') + "/admin-config/create-student";
        this.router.navigate([url], { queryParams: { action: 'edit', userId: student.id }, state: { student: student, backPageData: this.getCurrentPageState() } });
    }

    viewContent(student: any) {
        let backPageState: any = { backPageData: this.getCurrentPageState() };
        history.replaceState(backPageState, "", window.location.href);
        let url = this.environment.getConfig('basePath') + "/admin-config/create-student";
        this.router.navigate([url], { queryParams: { action: 'view', userId: student.id }, state: { student: student, backPageData: this.getCurrentPageState() } });
    }

    getCurrentPageState() {
        let state = {
            selectedSection: this.selectedSection, selectedClass: this.selectedClass,
            classes: this.classes,
            students: this.students, sections: this.sections, searchText: this.searchText,
            tableMultiSortingMetaData: this.dt1!._multiSortMeta,
            tableRows: this.dt1!._rows
        };
        return state
    }

    confirmPopup() {
        this.deleteLoading = true;
        this.deleteCnfText = "Deleting...";
        this.studentApiService.deleteUserById(this.selectedStudent?.studentId).subscribe({
            next: (response) => {
                this.deleteLoading = false;
                this.deleteCnfText = "Confirm";
                this.confirmationService.close();
                this.showToast('SUCCESS', 'Student deleted successfully!', 'Student has been deleted successfully');
                this.removeUserFromArray(this.selectedStudent?.id);
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

    showToast(status: string, heading: string, toastMessage: string) {
        if (status == 'SUCCESS') {
            this.messageService.add({ key: 'tcc', severity: 'success', life: 5000, summary: heading, detail: toastMessage });
        } else if (status == 'WARNING') {
            this.messageService.add({ key: 'tcc', severity: 'warn', life: 10000, summary: heading, detail: toastMessage });
        } else if (status == 'ERROR') {
            this.messageService.add({ key: 'tcc', severity: 'error', life: 10000, summary: heading, detail: toastMessage });
        }
    }

    removeUserFromArray(studentId: any) {
        const index = this.students.findIndex(item => item.student === studentId);
        this.students = this.students.slice(0, index).concat(this.students.slice(index + 1))
    }

    cancelPopup() {
        this.confirmationService.close()
    }

    confirm(event: Event, student: any) {
        this.selectedStudent = student;
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure? You cannot undo this.'
        });
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
}
