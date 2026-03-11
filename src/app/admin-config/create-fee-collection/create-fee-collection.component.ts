import { CommonModule, Location } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateFeeCollectionApiService } from './create-fee-collection-api.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-create-fee-collection',
  standalone: true,
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ReactiveFormsModule, ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, OverlayPanelModule
  ], templateUrl: './create-fee-collection.component.html',
  styleUrl: './create-fee-collection.component.css'
})
export class CreateFeeCollectionComponent {
  action = 'save';

  sections: any[] = [];
  students = [{
    "studentId": 12, "firstName": "vency", "classId": 14, "sectionId": 2, "academicYearId": 3, "class": 'Class 1', "section": "A", "Total": 8000, "PaidAmount": 3000,
    "BalAmount": 4500, "collectionType": "Monthly", "dueDate": "2026-03-30", "discountType": "Percentage", "discountValue": 500, "finalAmount": 7500,
    "feeDetails": [{ "feeHeadId": 1, "feeHeadName": "Tuition Fee", "amount": 5000, "paidAmount": 1000 },
    { "feeHeadId": 2, "feeHeadName": "Transport Fee", "amount": 2000, "paidAmount": 1000 },
    { "feeHeadId": 3, "feeHeadName": "Exam Fee", "amount": 1000, "paidAmount": 1000 }]
  }];
  studentFees: any[] = [];

  selectedPortalConfig: any;

  showLoading = false;
  showUpdateButton = false;
  portalConfigs: any[] | undefined; editPortalConfig: any;
  paymentModes: any[] = [];

  Classes: any[] = [];
  feeHeads: any[] = [];
  feeCollectionForm = new FormGroup({
    student: new FormControl('', Validators.required),
    class: new FormControl({ value: '', disabled: true }),
    section: new FormControl({ value: '', disabled: true }),
    // year: new FormControl('', Validators.required),
    paymentMode: new FormControl('', Validators.required),
    paymentDate: new FormControl('', Validators.required),
    totalPaid: new FormControl(0),
    feeDetails: new FormArray([])
  });

  constructor(
    private createfeecollectionApiService: CreateFeeCollectionApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute
  ) {
  }
  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    await this.onloaddata();
    this.feeDetails.push(this.createFeeRow());
    this.feeDetails.valueChanges.subscribe((rows: any) => {
      let total = 0;
      rows.forEach((row: any) => {
        total += Number(row.paidAmount) || 0;
      });
      this.feeCollectionForm.patchValue({
        totalPaid: total
      }, { emitEvent: false });
    });
    if (this.action == 'edit' || this.action == 'view') {
      let Config: any;
      if (history.state.desgData) {
        Config = history.state.desgData;
      }
      if (Config) {
        this.feeCollectionForm.patchValue({
          student: Config.student,
          class: this.Classes.find(
            d => d.masterId == Config.ClassId
          ) || null,
        });
        const feeArray = this.feeCollectionForm.get('feeDetails') as FormArray;
        feeArray.clear();

        Config.feeDetails.forEach((fee: any) => {
          feeArray.push(
            new FormGroup({
              feeHead: new FormControl(
                this.feeHeads.find(d => d.masterId == fee.feeHeadId) || null
              ),
              amount: new FormControl(fee.amount)
            })
          );
        });
      }
      this.editPortalConfig = Config;
      this.showUpdateButton = true;
    } else {
      this.feeCollectionForm.enable();
    }
  }
  async onloaddata() {
    await Promise.all([
      this.getAllmasterdata(),
      // this.getstudent()
    ]);
  }
  async getstudent() {
    var students: any = await firstValueFrom(this.createfeecollectionApiService.getStudentData());
    this.students = students?.data;
  }
  async getAllmasterdata() {
    try {
      const response: any = await firstValueFrom(
        this.createfeecollectionApiService.getAllMasterData()
      );
      this.Classes = response?.data?.classesList || [];
      this.feeHeads = response?.data?.feeHeadList || [];
      this.paymentModes = response?.data?.paymentModeList || [];
    } catch (err) {
      console.error(err);
    }
  }
  OnStudent(event: any) {

    const selectedClass = this.Classes.find(x => x.masterId == event.value.classId);
    this.feeCollectionForm.patchValue({
      class: selectedClass
    });
    this.loadStudentFees(event.value);
    this.getSectionData(event.value.classId, event.value.sectionId);
  }
  getSectionData(classId: any, sectionId: any) {
    this.createfeecollectionApiService.getSectionData(classId).subscribe({
      next: (response) => {

        this.sections = response;
        const selectedSection = this.sections.find(
          x => x.id == sectionId
        );
        this.feeCollectionForm.patchValue({
          section: selectedSection
        });
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  // loadStudentFees(studentId: number) {
  //   this.createfeecollectionApiService.getStudentFees(studentId).subscribe((res: any) => {
  //     const fees = res.data;
  //     this.feeDetails.clear();
  //     fees.forEach((fee: any) => {
  //       this.feeDetails.push(new FormGroup({
  //         feeHead: fee.feeHeadName,
  //         totalAmount: fee.amount,
  //         paidAmount: 0,
  //         balanceAmount: fee.amount
  //       }));
  //     });
  //   });
  // }
  loadStudentFees(studentFeeData: any) {
    this.feeDetails.clear();
    const fees = studentFeeData.feeDetails;
    fees.forEach((fee: any) => {
      const selectedFeeHead = this.feeHeads.find(
        x => x.masterId == fee.feeHeadId
      );
      this.feeDetails.push(new FormGroup({
        feeHead: new FormControl(selectedFeeHead),
        totalAmount: new FormControl(fee.amount),
        paidAmount: new FormControl(0),
        balanceAmount: new FormControl(fee.amount)
      }));
    });

  }
  removeFeeRow(i: number) {
    this.feeDetails.removeAt(i);
  }
  addFeeRow() {
    this.feeDetails.push(this.createFeeRow());
  }
  get feeDetails(): FormArray {
    return this.feeCollectionForm.get('feeDetails') as FormArray;
  }
  createFeeRow(): FormGroup {
    const row = new FormGroup({
      feeHead: new FormControl('', Validators.required),
      totalAmount: new FormControl(0),
      paidAmount: new FormControl(0),
      balanceAmount: new FormControl(0)
    });
    row.get('paidAmount')?.valueChanges.subscribe((val: any) => {
      const total = Number(row.get('totalAmount')?.value) || 0;
      const paid = Number(val) || 0;
      row.patchValue({
        balanceAmount: total - paid
      }, { emitEvent: false });
      if (paid > total) {
        row.patchValue({ paidAmount: total }, { emitEvent: false });
      }
      const balance = total - paid;

      row.patchValue({
        balanceAmount: balance
      }, { emitEvent: false });

      this.calculateTotalPaid();
    });
    return row;
  }
  calculateTotalPaid() {
    let total = 0;
    this.feeDetails.controls.forEach((row: any) => {
      total += Number(row.get('paidAmount')?.value) || 0;
    });
    this.feeCollectionForm.patchValue({
      totalPaid: total
    });
  }
  onSubmit() {
    debugger;
    console.log(this.feeCollectionForm.getRawValue());
  }
  onEdit() {
    debugger;
    console.log(this.feeCollectionForm.getRawValue());
  }
  navigateMenu(url: any) {
    this._location.back();
  }
  getErrorMessage(fieldName: any, examFormErrors: any) {
    if (this.action != 'view') {
      let keys = Object.keys(examFormErrors)
      return this.formErrorMessage[fieldName][keys[0]];
    }
  }
  formErrorMessage: any = {
    student: {
      required: "Student is required."
    }, class: {
      required: "Class is required."
    }, section: {
      required: "Section is required."
    }, paymentMode: {
      required: "Payment Mode is required."
    }, paymentDate: {
      required: "Payment Date is required."
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
