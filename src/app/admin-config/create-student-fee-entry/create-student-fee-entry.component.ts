import { CommonModule, Location } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { CreateStudentFeeEntryApiService } from './create-student-fee-entry-api.service';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-create-student-fee-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule, ProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ToastModule,
    DropdownModule,
    InputTextModule, CalendarModule,
    ButtonModule, OverlayPanelModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './create-student-fee-entry.component.html',
  styleUrl: './create-student-fee-entry.component.css'
})
export class CreateStudentFeeEntryComponent {
  Classes: any[] = [];
  showLoading = false;
  showUpdateButton = false;
  action = "save";
  portalConfigs: any[] | undefined;
  selectedPortalConfig: any;
  editPortalConfig: any;
  discountTypes: any[] = [];
  feeHeads: any[] = [];
  collectionTypes: any[] = [];
  students: any[] = [];
  selectedClass: any;
  selectedSection: any;
  sections: any[] = [];
  sectionDisabled: boolean = true;
  years: any[] = [];
  constructor(private createstudentfeeentryapiservice: CreateStudentFeeEntryApiService,
    private _location: Location, private messageService: MessageService, private route: ActivatedRoute) {
  }
  async ngOnInit() {

    this.route.queryParams.subscribe(async params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
    await this.onloaddata();

    if (this.action == 'edit' || this.action == 'view') {
      let Config: any;
      if (history.state.desgData) {
        Config = history.state.desgData;
      }
      if (Config) {
        this.studentFeeForm.patchValue({
          student: Config.student,
          class: this.Classes.find(
            d => d.masterId == Config.ClassId
          ) || null,
          collectionType: this.collectionTypes.find(
            d => d.masterId == Config.collectionTypeId
          ) || null,
          dueDate: Config.dueDate,
          // feeHead: this.feeHeads.find(
          //   d => d.masterId == Config.feeHeadId
          // ) || null,
          // amount: Config.amount,
          discountType: this.discountTypes.find(
            d => d.masterId == Config.discountTypeId
          ) || null,
          discountValue: Config.discountValue,
          finalAmount: Config.finalAmount,
          year: this.years.find(x => x.id == Config.academicYearId)
        });
        const feeArray = this.studentFeeForm.get('feeDetails') as FormArray;
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
      this.studentFeeForm.enable();
    }
  }
  get feeDetails(): FormArray {
    return this.studentFeeForm.get('feeDetails') as FormArray;
  }
  addFeeRow() {
    this.feeDetails.push(this.createFeeRow());
  }
  removeFeeRow(index: number) {
    this.feeDetails.removeAt(index);
  }
  OnStudent(event: any) {

    const selectedClass = this.Classes.find(x => x.masterId == event.value.classId);
    this.studentFeeForm.patchValue({
      class: selectedClass
    })
    this.getSectionData(event.value.classId, event.value.sectionId);
  }
  getSectionData(classId: any, sectionId: any) {

    this.createstudentfeeentryapiservice.getSectionData(classId).subscribe({
      next: (response) => {
        debugger;
        this.sections = response;
        const selectedSection = this.sections.find(
          x => x.id == sectionId
        );
        this.studentFeeForm.patchValue({
          section: selectedSection
        });
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }

  async onloaddata() {
    await Promise.all([
      this.getAllmasterdata(),
      this.getyears(),
      this.getstudent()
    ]);
  }
  async getstudent() {
    var students: any = await firstValueFrom(this.createstudentfeeentryapiservice.getStudentData());
    this.students = students?.data;
  }
  async getyears() {
    this.years = await firstValueFrom(this.createstudentfeeentryapiservice.getyears());
  }
  async getAllmasterdata() {
    try {
      const response: any = await firstValueFrom(
        this.createstudentfeeentryapiservice.getAllMasterData()
      );
      this.Classes = response?.data?.classesList || [];
      this.feeHeads = response?.data?.feeHeadList || [];
      this.collectionTypes = response?.data?.feeCollectionTypeList || [];
      this.discountTypes = response?.data?.discountTypeList || [];
    } catch (err) {
      console.error(err);
    }
  }
  studentFeeForm = new FormGroup({
    student: new FormControl('', Validators.required),
    class: new FormControl({ value: null, disabled: true }, Validators.required),
    section: new FormControl({ value: null, disabled: true }, Validators.required),
    collectionType: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    discountType: new FormControl(null),
    discountValue: new FormControl(0),
    finalAmount: new FormControl({ value: 0, disabled: true }),
    feeDetails: new FormArray([
      this.createFeeRow()
    ])
  });
  createFeeRow(): FormGroup {
    return new FormGroup({
      feeHead: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
  }
  navigateMenu(url: any) {
    this._location.back();
  }
  onSubmit() {

    let formValue: any = this.studentFeeForm.value;
    const payload = {
      studentId: formValue.student,
      classId: formValue?.class?.masterId,
      sectionId: formValue?.section?.sectionId,
      collectionTypeId: formValue?.collectionType?.masterId,
      dueDate: formValue?.dueDate,

      feeDetails: formValue.feeDetails.map((f: any) => ({
        feeHeadId: f.feeHead.masterId,
        amount: f.amount
      }))
    };
    // {
    //   "studentId": 101,
    //   "classId": 5,
    //   "sectionId": 1,
    //   "collectionTypeId": 2,
    //   "dueDate": "2026-03-10",
    //   "feeDetails": [
    //     {
    //       "feeHeadId": 1,
    //       "amount": 5000
    //     },
    //     {
    //       "feeHeadId": 2,
    //       "amount": 2000
    //     },
    //     {
    //       "feeHeadId": 3,
    //       "amount": 1000
    //     }
    //   ]
    // }

  }
  onEdit() {

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
    }, collectionType: {
      required: "Collection Type is required."
    }, dueDate: {
      required: "Due Date Type is required."
    }, feeHead: {
      required: "Assigned Fee Head is required."
    }, amount: {
      required: "Amount Fee Head is required."
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
