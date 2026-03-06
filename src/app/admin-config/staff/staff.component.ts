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
import { EnvironmentService } from '../../environment.service';
import { AuthService } from '../../auth.service';
import { StaffApiService } from './staff-api.service';
@Component({
    selector: 'app-staff',
    standalone: true,
    imports: [CommonModule, ToastModule, DropdownModule, DatePipe, InputTextModule, TableModule, ConfirmPopupModule, FormsModule, ReactiveFormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ConfirmationService, MessageService],
    templateUrl: './staff.component.html',
    styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
    departments: any[] | undefined;
    selectedDepartment: any;
    staffs: any[] = [];
    selectedStaff: any;
    deleteLoading = false;
    deleteCnfText = "Confirm";
    enableSearchLoading = false;
    searchText = "";
    tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
    tableRows = 5;
    userRoles: any = [];
    readOnlyRoles: String[] = Constants.PORTAL_ADMIN;
    readWriteRoles: String[] = Constants.PORTAL_ADMIN;

    masterDataList: any[] | undefined;

    nationalityList: any[] | undefined;
    departmentsList: any[] | undefined;
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
        private staffApiService: StaffApiService,
        private environment: EnvironmentService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        if (history.state.isPageReload) {
            if (history.state.backPageData) {
                let backPageData = history.state.backPageData;
                this.staffs = backPageData.staffs;
                if (history.state?.user) {
                    this.staffs.forEach((user, index) => {
                        if (user.id == history.state.user.id) {
                            this.staffs[index] = history.state.user;
                        }
                    });
                }
                this.selectedDepartment = backPageData.selectedDepartment;
                this.departments = backPageData.departments;
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
        this.staffApiService.getMasterData().subscribe({
            next: (response) => {
                this.masterDataList = response?.data;
                this.departments = response?.data?.departmentList;
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

    onDepartment(event: any) {
        if (this.selectedDepartment != null) {
            event.value.name = event.value.name;
        }
    }


    getStaff() {
        this.enableSearchLoading = true;
        this.staffs = [];
        this.searchText = "";
        this.applyFilterGlobal(this.searchText, 'contains');
        this.tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
        this.dt1!._rows = 8;
        this.deleteLoading = false;
        this.staffApiService.getStaffData(this.selectedDepartment.masterId).subscribe({
            next: (response) => {
                this.staffs = response;
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
        this.selectedDepartment = undefined;
        this.staffs = [];
        this.searchText = "";
        this.applyFilterGlobal(this.searchText, 'contains');
        this.tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
        this.dt1!._rows = 8;
        this.selectedStaff = undefined;
    }

    createNav() {
        let backPageState: any = { backPageData: this.getCurrentPageState() };
        history.replaceState(backPageState, "", window.location.href);
        let url = this.environment.getConfig('basePath') + "/admin-config/staff/create-staff";
        this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
    }

    editContent(staff: any) {
        let backPageState: any = { backPageData: this.getCurrentPageState() };
        history.replaceState(backPageState, "", window.location.href);
        let url = this.environment.getConfig('basePath') + "/admin-config/staff/create-staff";
        this.router.navigate([url], { queryParams: { action: 'edit', userId: staff.id }, state: { staff: staff, backPageData: this.getCurrentPageState() } });
    }

    viewContent(staff: any) {
        let backPageState: any = { backPageData: this.getCurrentPageState() };
        history.replaceState(backPageState, "", window.location.href);
        let url = this.environment.getConfig('basePath') + "/admin-config/staff/create-staff";
        this.router.navigate([url], { queryParams: { action: 'view', userId: staff.id }, state: { staff: staff, backPageData: this.getCurrentPageState() } });
    }

    getCurrentPageState() {
        let state = {
            selectedDepartment: this.selectedDepartment,
            departments: this.departments,
            staffs: this.staffs, searchText: this.searchText,
            tableMultiSortingMetaData: this.dt1!._multiSortMeta,
            tableRows: this.dt1!._rows
        };
        return state
    }

    confirmPopup() {
        this.deleteLoading = true;
        this.deleteCnfText = "Deleting...";
        this.staffApiService.delete(this.selectedStaff?.id).subscribe({
            next: (response) => {
                this.deleteLoading = false;
                this.deleteCnfText = "Confirm";
                this.confirmationService.close();
                this.showToast('SUCCESS', 'Staff deleted successfully!', 'Staff has been deleted successfully');
                this.removeUserFromArray(this.selectedStaff?.id);
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

    removeUserFromArray(staffId: any) {
        const index = this.staffs.findIndex(item => item.staff === staffId);
        this.staffs = this.staffs.slice(0, index).concat(this.staffs.slice(index + 1))
    }

    cancelPopup() {
        this.confirmationService.close()
    }

    confirm(event: Event, staff: any) {
        this.selectedStaff = staff;
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
