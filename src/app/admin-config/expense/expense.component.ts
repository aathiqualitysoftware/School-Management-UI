import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Constants } from '../../util/constants';
import { EnvironmentService } from '../../environment.service';
import { forkJoin } from 'rxjs';
import { ExpenseApiService } from './expense-api.service';
@Component({
  selector: 'app-expense',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ToastModule, ConfirmPopupModule,
    TableModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, TooltipModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  tableMultiSortingMetaData = [{ field: 'createdDateTime', order: -1 }];
  tableRows = 5;
  searchText = '';
  selectedexpense: any;
  expenses: any[] = [];
  expenseForm!: FormGroup;
  deleteLoading = false;
  deleteCnfText = "Confirm";
  userRoles: String[] = [];
  readOnlyRoles: String[] = Constants.PORTAL_DESKTOP;
  readWriteRoles: String[] = Constants.PORTAL_DESKTOP;
  enableSearchLoading = false;

  constructor(private fb: FormBuilder, private router: Router,
    private confirmationService: ConfirmationService,
    private environment: EnvironmentService, private expenseapiservice: ExpenseApiService, private messageService: MessageService) { }

  ngOnInit() {
    debugger;
    if (history.state.isPageReload) {
      if (history.state.backPageData) {
        let backPageData = history.state.backPageData;
        this.expenses = backPageData.expenses;
        if (history.state?.user) {
          this.expenses.forEach((user, index) => {
            if (user.ExpenseId == history.state.user.ExpenseId) {
              this.expenses[index] = history.state.user;
            }
          });
        }
        this.expenses = backPageData.expenses;
        this.tableMultiSortingMetaData = backPageData.tableMultiSortingMetaData;
        this.tableRows = backPageData.tableRows;
        this.searchText = backPageData.searchText;

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
      expense: this.expenseapiservice.getexpenselistData()
    }).subscribe((res: any) => {
      this.expenses = res.expense;
    });
  }


  isRoleReadOnly() {
    return this.readOnlyRoles.some(ai => this.userRoles.includes(ai));
  }

  isRoleReadWrite() {
    return this.readWriteRoles.some(ai => this.userRoles.includes(ai));
  }

  confirm(event: Event, expense: any) {
    this.selectedexpense = expense;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure? You cannot undo this.'
    });
  }

  @ViewChild('dt1') dt1: Table | undefined;
  applyGlobalFilter(searchText: any, stringVal: any) {
    this.dt1!.filterGlobal(searchText, stringVal);
  }

  resetFilter() {
    this.selectedexpense = null;
    this.onloaddata();
  }

  createContent() {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/expense/create-expense";
    this.router.navigate([url], { queryParams: { action: 'save' }, state: { backPageData: this.getCurrentPageState() } });
  }

  editContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/expense/create-expense";
    this.router.navigate([url], { queryParams: { action: 'edit'}, state: { expenseData: data, backPageData: this.getCurrentPageState() } });
  }

  viewContent(data: any) {
    let backPageState: any = { backPageData: this.getCurrentPageState() };
    history.replaceState(backPageState, "", window.location.href);
    let url = this.environment.getConfig('basePath') + "/admin-config/expense/create-expense";
    this.router.navigate([url], { queryParams: { action: 'view'}, state: { expenseData: data, backPageData: this.getCurrentPageState() } });
  }

  getCurrentPageState() {
    let state = {
      selectedexpense: this.selectedexpense,
      expenses: this.expenses,
      searchText: this.searchText,
      tableMultiSortingMetaData: this.tableMultiSortingMetaData,
      tableRows: this.tableRows
    };
    return state;
  }

  cancelPopup() {
    this.confirmationService.close()
  }

  confirmPopup() {
    this.deleteLoading = true;
    this.deleteCnfText = "Deleting...";
    this.expenseapiservice.deleteexpenseById(this.selectedexpense?.id).subscribe({
      next: (response) => {
        this.deleteLoading = false;
        this.deleteCnfText = "Confirm";
        this.confirmationService.close();
        this.showToast('SUCCESS', 'Expense deleted successfully!', 'Expense has been deleted successfully');
        this.removeUserFromArray(this.selectedexpense?.id);
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

  removeUserFromArray(userid: any) {
    const index = this.expenses.findIndex(item => item.id === userid);
    this.expenses = this.expenses.slice(0, index).concat(this.expenses.slice(index + 1))
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
