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
import { CreateExpenseApiService } from './create-expense-api.service';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [
    ReactiveFormsModule, ProgressSpinnerModule,
    CommonModule,
    FormsModule, CalendarModule,
    ToastModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, OverlayPanelModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css'
})
export class CreateExpenseComponent {

  active: any[] = [{ label: "Yes", value: true }, { label: "No", value: false }];
  expenses: any[] = [];
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;
  expenseheads: any[] = [];
  constructor(
    private createexpenseapiservice: CreateExpenseApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }

  expenseForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    expensehead: new FormControl("", [Validators.required]),
    date: new FormControl<Date | null>(null, [Validators.required]),
    description: new FormControl(""),
    invoice: new FormControl(""),
    amount: new FormControl("", [Validators.required])
  });
  async ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    await this.onloaddata();
    debugger;
    if (this.action == 'edit' || this.action == 'view') {
      let expenseConfig: any;
      if (history.state.expenseData) {
        expenseConfig = history.state.expenseData;
      }
      if (expenseConfig) {
        this.expenseForm.patchValue({
          name: expenseConfig.name,
          description: expenseConfig.description,
          expensehead: this.expenseheads.find(
            d => d.masterId == expenseConfig.expenseHeadId
          ) || null,
          invoice: expenseConfig.invoiceNumber,
          date: new Date(expenseConfig.date),
          amount: expenseConfig.amount
        });
      }
      this.editPortalConfig = expenseConfig;
      this.showUpdateButton = true;
    } else {
      this.expenseForm.enable();
    }
  }
  async onloaddata() {
    await this.getAllmasterdata();
  }
  async getAllmasterdata() {
    try {
      const response: any = await firstValueFrom(
        this.createexpenseapiservice.getAllMasterData()
      );
      this.expenseheads = response?.data?.expenseHeadList || [];
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
    let desgConfig: any = this.expenseForm.value;
    saveConfig.name = desgConfig?.name;
    saveConfig.invoiceNumber = desgConfig?.invoice;
    saveConfig.expenseHeadId = desgConfig?.expensehead?.masterId;
    saveConfig.description = desgConfig?.description;
    saveConfig.date = desgConfig?.date;
    saveConfig.amount = desgConfig?.amount;
    saveConfig.id = this.editPortalConfig.id;
    this.createexpenseapiservice.updateexpense(saveConfig).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Expense updated successfully!', 'Expense has been updated successfully');
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
    this.expenseForm.disable();
    this.showLoading = true;
    let portalConfig: any = this.expenseForm.value;
    let saveConfig: any = {};
    saveConfig.name = portalConfig?.name;
    saveConfig.invoiceNumber = portalConfig?.invoice;
    saveConfig.expenseHeadId = portalConfig?.expensehead?.masterId;
    saveConfig.description = portalConfig?.description;
    saveConfig.date = portalConfig?.date;
    saveConfig.amount = portalConfig?.amount;
    this.createexpenseapiservice.saveexpense(saveConfig).subscribe({
      next: (response) => {
        this.expenseForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Expense created successfully!', 'New Expense has been created successfully');
        this.expenseForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.expenseForm.enable();
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
      required: "Expense Name is required."
    }, expensehead: {
      required: "Expense Head is required."
    }, date: {
      required: "Date is required."
    }, amount: {
      required: "Amount is required."
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
