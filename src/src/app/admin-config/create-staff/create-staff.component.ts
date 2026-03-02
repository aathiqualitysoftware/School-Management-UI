import { CommonModule, DatePipe, Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { Calendar, CalendarModule } from 'primeng/calendar';
import { CreateStaffApiService } from './create-staff-api.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-create-staff',
  standalone: true,
  imports: [CommonModule, DropdownModule, DatePipe, CalendarModule, ToastModule, ProgressSpinnerModule, InputTextModule, PasswordModule, MultiSelectModule, OverlayPanelModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.css'
})
export class CreateStaffComponent implements OnInit {
  selectedFile: File | null = null;
  message: string = '';
  previewUrl: any;
  staffImageId: any;




  masterData: any;
  joiningDate: Date | null = null;
  dob: Date | null = null;

  // Restrict birth date: cannot be in the future
  minBirthDate: Date = new Date(1900, 0, 1); // optional lower bound
  maxBirthDate: Date = new Date(); // today

  // Restrict admission date: must be after birth date, not in the future
  minJoiningDate: Date = new Date(1900, 0, 1);
  maxJoiningDate: Date = new Date();

  aadhar: any = "";
  address: any;
  bankAccountNumber: any;
  bankIFSC: any;
  email: any;
  emergencyContactName: any;
  emergencyContactPhone: any;
  firstName: any;
  lastName: any;
  middleName: any;
  pan: any;
  phone: any;
  qualification: any;
  staffId: any;
  upiId: any;

  showLoading: boolean = false;


  action = "save";
  editStaff: any;
  showUpdateButton = false;

  departments: any[] = [];
  selectedDepartment: any;

  designations: any[] = [];
  selectedDesignation: any;

  relations: any[] = [];
  selectedRelation: any;

  employeType: any[] = [];
  selectedEmployeType: any;

  genders: any[] = [];
  selectedGender: any;

  maritalStatus: any[] = [];
  selectedMaritalStatus: any;

  nativeLanguages: any[] = [];
  selectedNativeLanguage: any;

  religions: any[] = [];
  selectedReligion: any;

  status: any[] = [{ statusName: "active", statusValue: true }, { statusName: "in-active", statusValue: false }];
  selectedStatus: any = { statusName: "active", statusValue: true };

  staffForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    middleName: new FormControl(''),
    pan: new FormControl('', [Validators.pattern(/^[A-Z]{5}\d{4}[A-Z]$/)]),
    dob: new FormControl<Date | null>(null, [Validators.required]),
    joiningDate: new FormControl<Date | null>(null, [Validators.required]),
    aadhar: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    address: new FormControl('', [Validators.required]),
    bankAccountNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{9,18}$/)]),
    bankIFSC: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    emergencyContactName: new FormControl('', [Validators.required]),
    emergencyContactPhone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    qualification: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    upiId: new FormControl('', [Validators.pattern(/^[\w.-]+@[\w.-]+$/)]),
    staffId: new FormControl('', [Validators.required]),
    department: new FormControl({ value: "", disabled: false }, [Validators.required]),
    designation: new FormControl({ value: "", disabled: false }, [Validators.required]),
    emergencyContactRelation: new FormControl({ value: "", disabled: false }, [Validators.required]),
    employmentType: new FormControl({ value: "", disabled: false }, [Validators.required]),
    gender: new FormControl({ value: "", disabled: false }, [Validators.required]),
    maritalStatus: new FormControl({ value: "", disabled: false }, [Validators.required]),
    nativeLanguage: new FormControl({ value: "", disabled: false }, [Validators.required]),
    religion: new FormControl({ value: "", disabled: false }, [Validators.required]),
    staffStatus: new FormControl({ value: "", disabled: false }, [Validators.required]),
  });

  constructor(private createStaffApiService: CreateStaffApiService,
    private _location: Location,
    private messageService: MessageService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.staffForm.reset();
    this.validateQueryParam();
    await this.getdesg();
    await this.getMasterData();
  }
  async validateAction() {
    if (this.action == 'view') {
      this.staffForm.disable();
    }
  }
  validateQueryParam() {
    this.route.queryParams.subscribe(params => {
      if (params['action']) {
        this.action = params['action'];
      }
    });
  }

  ngOnDestroy() {
    const state = this._location.getState();
    if (state && typeof state === 'object' && 'backPageData' in state) {
      history.pushState({ backPageData: (state as any).backPageData, isPageReload: true, staff: this.editStaff }, "");
    }
  }
  onGender(event: any) {
    let genderId = event.value.id;
    this.selectedGender = this.genders.find((gender: any) => gender.masterId === genderId);
  }
  onEmploymentType(event: any) {
    let employmentTypeId = event.value.id;
    this.selectedEmployeType = this.employeType.find((emp: any) => emp.masterId === employmentTypeId);
  }
  onRelation(event: any) {
    let relationId = event.value.id;
    this.selectedRelation = this.relations.find((rel: any) => rel.masterId === relationId);
  }
  onDepartment(event: any) {
    let departmentId = event.value.id;
    this.selectedDepartment = this.masterData?.departmentList.find((dept: any) => dept.masterId === departmentId);
  }
  onNativeLanguage(event: any) {
    let languageId = event.value.id;
    this.selectedNativeLanguage = this.nativeLanguages.find((lang: any) => lang.masterId === languageId);
  }
  onReligion(event: any) {
    let religionId = event.value.id;
    this.selectedReligion = this.religions.find((rel: any) => rel.masterId === religionId);
  }
  onDesignation(event: any) {
    let designationId = event.value.id;
    this.selectedDesignation = this.designations.find((desig: any) => desig.id === designationId);
    // if (selectedDesignation?.isTeaching) {
    //   this.employeType = this.masterData?.employmentTypesList.filter((emp: any) => emp.isTeaching == true);
    // } else {
    //   this.employeType = this.masterData?.employmentTypesList.filter((emp: any) => emp.isTeaching == false);
    // }
  }
  onMaritalStatus(event: any) {
    let maritalStatusId = event.value.id;
    this.selectedMaritalStatus = this.maritalStatus.find((marital: any) => marital.masterId === maritalStatusId);
  }
  onStaffStatus(event: any) {
    let staffStatusId = event.value.statusId;
    this.selectedStatus = this.status.find((status: any) => status.statusId === staffStatusId);
  }

  onSubmit() {
    this.staffForm.disable();
    this.showLoading = true;
    let staff: any = this.staffForm.value;

    staff.staffStatus = staff.staffStatus.statusName == "active" ? "Active" : "In-Active";

    staff.department = staff.department.name;
    staff.designation = staff.designation.designationName;
    staff.emergencyContactRelation = staff.emergencyContactRelation.name;
    staff.employmentType = staff.employmentType.name;
    staff.gender = staff.gender.name;
    staff.maritalStatus = staff.maritalStatus.name;
    staff.nativeLanguage = staff.nativeLanguage.name;
    staff.religion = staff.religion.name;

    // staff.photoData = this.staffImageId;
    // const reader = new FileReader();

    // student.profileImage = this.selectedFile ? this.selectedFile.bytes() : null;


    this.createStaffApiService.save(staff).subscribe({
      next: (response) => {
        this.staffForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Staff created successfully!', 'New staff has been created successfully');

        this.staffForm.reset({
          "aadhar": "", "address": "", "bankAccountNumber": "", "bankIFSC": "", "email": "",
          "emergencyContactName": "", "emergencyContactPhone": "", "firstName": "", "lastName": "", "middleName": "",
          "pan": "", "phone": "", "qualification": "", "staffId": "", "upiId": "", "joiningDate": null, "dob": null
        });
        this.designations = [];
        this.staffForm.get('designation')?.disable();

        this.previewUrl = "";

      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.staffForm.enable();
        this.staffForm.get('status')?.disable();
        this.showLoading = false;
      },
      complete: () => { }
    });
  }

  onEdit() {
    debugger;
    this.showLoading = true;
    let staff: any = this.staffForm.value;
    staff.id = this.editStaff.id;

    staff.staffStatus = staff.staffStatus?.statusName ? staff.staffStatus?.statusName : staff.staffStatus == "active" ? "Active" : "In-Active";

    staff.department = staff.department.name;
    staff.designation = staff.designation.designationName;
    staff.emergencyContactRelation = staff.emergencyContactRelation.name;
    staff.employmentType = staff.employmentType.name;
    staff.gender = staff.gender.name;
    staff.maritalStatus = staff.maritalStatus.name;
    staff.nativeLanguage = staff.nativeLanguage.name;
    staff.religion = staff.religion.name;


    this.createStaffApiService.update(staff).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Staff updated successfully!', 'Staff has been updated successfully');
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.showLoading = false;
      },
      complete: () => { }
    });
  }
  async getdesg() {
    this.designations = await firstValueFrom(this.createStaffApiService.getdesgdata());
  }
  async getMasterData() {
    this.createStaffApiService.getMasterData().subscribe({
      next: (response) => {
        this.masterData = response?.data;

        this.genders = this.masterData?.gendersList;
        this.departments = this.masterData?.departmentList;
        this.religions = this.masterData?.religionsList;
        // this.designations = this.masterData?.designationList;
        this.relations = this.masterData?.relationList;
        this.employeType = this.masterData?.employmentTypeList;
        this.maritalStatus = this.masterData?.maritalStatusList;
        this.nativeLanguages = this.masterData?.languagesList;

        if (this.action == 'edit' || this.action == 'view') {
          let staff: any;
          staff = history.state.staff;

          this.editStaff = staff;

          // this.firstName = staff.firstName;
          // this.lastName = staff.lastName;
          // this.middleName = staff.middleName;
          // this.pan = staff.pan;
          // this.dob = staff.dob ? new Date(staff.dob) : null;
          // this.joiningDate = staff.joiningDate ? new Date(staff.joiningDate) : null;
          // this.aadhar = staff.aadhar;
          // this.address = staff.address;
          // this.bankAccountNumber = staff.bankAccountNumber;
          // this.bankIFSC = staff.bankIFSC;
          // this.email = staff.email;
          // this.emergencyContactName = staff.emergencyContactName;
          // this.emergencyContactPhone = staff.emergencyContactPhone;
          // this.qualification = staff.qualification;
          // this.phone = staff.phone;
          // this.upiId = staff.upiId;
          // this.staffId = staff.staffId;

          // this.selectedDepartment = this.departments.find((dept: any) => dept.name === staff.department);
          // this.selectedDesignation = this.designations.find((desig: any) => desig.designationName === staff.designation);
          // this.selectedRelation = this.relations.find((rel: any) => rel.name === staff.emergencyContactRelation);
          // this.selectedEmployeType = this.employeType.find((emp: any) => emp.name === staff.employmentType);
          // this.selectedMaritalStatus = this.maritalStatus.find((marital: any) => marital.name === staff.maritalStatus);
          // this.selectedNativeLanguage = this.nativeLanguages.find((lang: any) => lang.name === staff.nativeLanguage);
          // this.selectedReligion = this.religions.find((rel: any) => rel.name === staff.religion);
          // this.selectedGender = this.genders.find((gender: any) => gender.name === staff.gender);
          // this.selectedStatus = this.status.find((status: any) => status.statusName.toLowerCase() === staff.staffStatus.toLowerCase());

          this.staffForm.patchValue({
            firstName: staff.firstName,
            lastName: staff.lastName,
            middleName: staff.middleName,
            pan: staff.pan,
            dob: staff.dob ? new Date(staff.dob) : null,
            joiningDate: staff.joiningDate ? new Date(staff.joiningDate) : null,
            aadhar: staff.aadhar,
            address: staff.address,
            bankAccountNumber: staff.bankAccountNumber,
            bankIFSC: staff.bankIFSC,
            email: staff.email,
            emergencyContactName: staff.emergencyContactName,
            emergencyContactPhone: staff.emergencyContactPhone,
            qualification: staff.qualification,
            phone: staff.phone,
            upiId: staff.upiId,
            staffId: staff.staffId
          });

          this.staffForm.patchValue({
            department: this.departments.find(d => d.name === staff.department),
            designation: this.designations.find(d => d.designationName === staff.designation),
            emergencyContactRelation: this.relations.find(r => r.name === staff.emergencyContactRelation),
            employmentType: this.employeType.find(e => e.name === staff.employmentType),
            maritalStatus: this.maritalStatus.find(m => m.name === staff.maritalStatus),
            nativeLanguage: this.nativeLanguages.find(l => l.name === staff.nativeLanguage),
            religion: this.religions.find(r => r.name === staff.religion),
            gender: this.genders.find(g => g.name === staff.gender),
            staffStatus: this.status.find(s =>
              s.statusName?.toLowerCase() === staff.staffStatus?.toLowerCase())
          });
          this.showUpdateButton = true;
          this.validateAction();
        }

      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  getErrorMessage(fieldName: any, staffFormErrors: any) {
    if (this.action != 'view') {
      let keys = Object.keys(staffFormErrors)
      return this.formErrorMessage[fieldName][keys[0]];
    }
  }
  formErrorMessage: any = {
    firstName: {
      required: "First Name is required"
    },
    lastName: {
      required: "Last Name is required"
    },
    middleName: {
      required: "Middle Name is required",
    },
    pan: {
      pattern: "PAN must be in the format ABCDE1234F"
    },
    dob: {
      required: "Date of Birth is required",
      pattern: "Date of Birth must be a valid date"
    }, joiningDate: {
      required: "Joining Date is required",
      pattern: "Joining Date must be a valid date"
    },

    aadhar: {
      required: "Aadhar number is required",
      pattern: "Aadhar number must be 12 digits"
    },
    address: {
      required: "Address is required"
    },
    bankAccountNumber: {
      required: "Bank account number is required",
      pattern: "Bank account number must be between 9 and 18 digits"
    },
    upiId: {
      pattern: "UPI ID must be in the format username@bank"
    },
    bankIFSC: {
      required: "Bank IFSC code is required",
      pattern: "Bank IFSC code must be in the format ABCD0EFG123"
    },
    email: {
      required: "Email is required",
      email: "Email must be a valid email address"
    },
    emergencyContactName: {
      required: "Emergency contact name is required"
    },
    emergencyContactPhone: {
      required: "Emergency contact phone number is required",
      pattern: "Emergency contact phone number must be 10 digits"
    },
    qualification: {
      required: "Qualification is required"
    },

    phone: {
      required: "Phone number is required",
      pattern: "Phone number must be 10 digits"
    },
    staffId: {
      required: "Staff ID is required"
    },
    department: {
      required: "Department is required"
    },
    designation: {
      required: "Designation is required"
    },
    emergencyContactRelation: {
      required: "Emergency contact relation is required"
    },
    employmentType: {
      required: "Employment type is required"
    },
    maritalStatus: {
      required: "Marital status is required"
    },
    nativeLanguage: {
      required: "Native language is required"
    },
    religion: {
      required: "Religion is required"
    },
    staffStatus: {
      required: "Staff status is required"
    },
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
      this.messageService.add({ key: 'tc', severity: 'success', life: 5000, summary: heading, detail: toastMessage });
    } else if (status == 'WARNING') {
      this.messageService.add({ key: 'tc', severity: 'warn', life: 10000, summary: heading, detail: toastMessage });
    } else if (status == 'ERROR') {
      this.messageService.add({ key: 'tc', severity: 'error', life: 10000, summary: heading, detail: toastMessage });
    }
  }

  navigateMenu(url: any) {
    this._location.back();
  }
  // Preview selected file
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  // Remove photo
  removePhoto(): void {
    this.previewUrl = null;
    this.selectedFile = null;
  }


  onUpload(): void {
    if (this.selectedFile) {
      this.createStaffApiService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          this.staffImageId = res;
          this.message = 'Upload successful!';
        },
        error: (err) => this.message = 'Upload failed: ' + err.message
      });
    } else {
      this.message = 'Please select a file first!';
    }
  }

}
