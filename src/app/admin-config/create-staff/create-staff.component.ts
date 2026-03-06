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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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
  SafeResourceUrl = null;
  profileImageUploadId: any;
  resumeUploadId: any;
  idProofImageUploadId: any;
  experienceImageUploadId: any;

  selectedFileTC: File | null = null;
  previewUrlTC: any;
  staffImageIdTC: any;
  fileNameTC: any;
  isImageTC: boolean = false;
  fileTypeTC: any;

  selectedFileResume: File | null = null;
  previewUrlResume: any;
  staffImageIdResume: any;
  fileNameResume: any;
  isImageResume: boolean = false;
  fileTypeResume: any;

  selectedFileIdProof: File | null = null;
  previewUrlIdProof: any;
  staffImageIdIdProof: any;
  fileNameIdProof: any;
  isImageIdProof: boolean = false;
  fileTypeIdProof: any;




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
    private messageService: MessageService, private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
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
    this.selectedGender = event?.value;
  }
  onEmploymentType(event: any) {
    this.selectedEmployeType = event?.value;
  }
  onRelation(event: any) {
    this.selectedRelation = event?.value;
  }
  onDepartment(event: any) {
    this.selectedDepartment = event?.value;
  }
  onNativeLanguage(event: any) {
    this.selectedNativeLanguage = event?.value;
  }
  onReligion(event: any) {
    this.selectedReligion = event?.value;
  }
  onDesignation(event: any) {
    this.selectedDesignation = event?.value;
    // if (selectedDesignation?.isTeaching) {
    //   this.employeType = this.masterData?.employmentTypesList.filter((emp: any) => emp.isTeaching == true);
    // } else {
    //   this.employeType = this.masterData?.employmentTypesList.filter((emp: any) => emp.isTeaching == false);
    // }
  }
  onMaritalStatus(event: any) {
    this.selectedMaritalStatus = event?.value;
  }
  onStaffStatus(event: any) {
    this.selectedStatus = event?.value;
  }

  onSubmit() {
    this.staffForm.disable();
    this.showLoading = true;
    let staff: any = this.staffForm.value;

    staff.staffStatus = staff.staffStatus.statusName == "active" ? "1" : "0";
    debugger;
    staff.department = staff.department.masterId;
    staff.designation = staff.designation.id;
    staff.emergencyContactRelation = staff.emergencyContactRelation.masterId;
    staff.employmentType = staff.employmentType.masterId;
    staff.gender = staff.gender.masterId;
    staff.maritalStatus = staff.maritalStatus.masterId;
    staff.nativeLanguage = staff.nativeLanguage.masterId;
    staff.religion = staff.religion.masterId;

    staff.profileImageUploadId = this.staffImageId;
    staff.resumeUploadId = this.staffImageIdResume;
    staff.idProofImageUploadId = this.staffImageIdIdProof;
    staff.experienceImageUploadId = this.staffImageIdTC;


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
        this.previewUrlIdProof = "";
        this.previewUrlResume = "";
        this.previewUrlTC = "";



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
    staff.staffStatus = staff.staffStatus?.statusValue === true ? 1 : 0;

    staff.department = staff.department.masterId;
    staff.designation = staff.designation.id;
    staff.emergencyContactRelation = staff.emergencyContactRelation.masterId;
    staff.employmentType = staff.employmentType.masterId;
    staff.gender = staff.gender.masterId;
    staff.maritalStatus = staff.maritalStatus.masterId;
    staff.nativeLanguage = staff.nativeLanguage.masterId;
    staff.religion = staff.religion.masterId;

    staff.profileImageUploadId = this.profileImageUploadId == null ? this.editStaff.profileImageUploadId : this.profileImageUploadId;
    staff.resumeUploadId = this.resumeUploadId == null ? this.editStaff.resumeUploadId : this.resumeUploadId;
    staff.idProofImageUploadId = this.idProofImageUploadId == null ? this.editStaff.idProofImageUploadId : this.idProofImageUploadId;
    staff.experienceImageUploadId = this.experienceImageUploadId == null ? this.editStaff.experienceImageUploadId : this.experienceImageUploadId;

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
          this.previewUrl = staff.staffProfileImage ? 'data:image/jpeg;base64,' + staff.staffProfileImage : null;
          this.previewUrlIdProof = staff.idProofImage
            ? 'data:application/pdf;base64,' + staff.idProofImage
            : null;

          this.previewUrlTC = staff.experienceImage
            ? 'data:application/pdf;base64,' + staff.experienceImage
            : null;

          this.previewUrlResume = staff.resumeImage
            ? 'data:application/pdf;base64,' + staff.resumeImage
            : null;
          this.validateStaffStatus(staff);
          this.validateGender(staff);
          this.validateReligion(staff);
          this.validateNativeLanguage(staff);
          this.validateMaritalStatus(staff);
          this.validateEmployee(staff);
          this.validateRelation(staff);
          this.validateDepartment(staff);
          this.validateDesignation(staff);

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
  async validateStaffStatus(student: any) {
    debugger;
    this.selectedStatus = this.status?.find(function (statusData) {
      if (statusData.id == student.staffStatusId) {
        statusData.statusName = statusData.statusName.toLowerCase() == "active" ? "Active" : "In-Active";
        return statusData;
      }
    });
  }
  async validateGender(student: any) {
    debugger;
    this.selectedGender = this.genders?.find(function (genderData) {
      if (genderData.id == student.genderId) {
        genderData.genderName = genderData.name;
        return genderData;
      }
    });
  }
  async validateReligion(student: any) {
    debugger;
    this.selectedReligion = this.religions?.find(function (religionData) {
      if (religionData.id == student.religionId) {
        religionData.religionName = religionData.name;
        return religionData;
      }
    });
  }
  async validateNativeLanguage(student: any) {
    debugger;
    this.selectedNativeLanguage = this.nativeLanguages?.find(function (nativeLanguageData) {
      if (nativeLanguageData.id == student.nativeLanguageId) {
        nativeLanguageData.nativeLanguageName = nativeLanguageData.name;
        return nativeLanguageData;
      }
    });
  }

  async validateMaritalStatus(student: any) {
    debugger;
    this.selectedMaritalStatus = this.maritalStatus?.find(function (maritalStatusData) {
      if (maritalStatusData.id == student.maritalStatusId) {
        maritalStatusData.maritalStatusName = maritalStatusData.name;
        return maritalStatusData;
      }
    });
  }
  async validateEmployee(student: any) {
    debugger;
    this.selectedEmployeType = this.employeType?.find(function (employeTypeData) {
      if (employeTypeData.id == student.employmentTypeId) {
        employeTypeData.employmentTypeName = employeTypeData.name;
        return employeTypeData;
      }
    });
  }
  async validateRelation(student: any) {
    debugger;
    this.selectedRelation = this.relations?.find(function (relationData) {
      if (relationData.id == student.emergencyContactRelationId) {
        relationData.relationName = relationData.name;
        return relationData;
      }
    });
  }
  async validateDepartment(student: any) {
    debugger;
    this.selectedDepartment = this.departments?.find(function (departmentData) {
      if (departmentData.id == student.departmentId) {
        departmentData.departmentName = departmentData.name;
        return departmentData;
      }
    });
  }
  async validateDesignation(student: any) {
    debugger;
    this.selectedDesignation = this.designations?.find(function (designationData) {
      if (designationData.id == student.designation) {
        designationData.designationName = designationData.designationName;
        return designationData;
      }
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
        this.onUpload();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  onFileSelectedTC(event: any): void {
    this.selectedFileTC = event.target.files[0];
    const input = event.target as HTMLInputElement;

    debugger;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileNameTC = file.name;
      this.fileTypeTC = file.type;

      if (file.type.startsWith('image/')) {
        // Show image preview
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrlTC = reader.result as string;
          this.isImageTC = true;
          this.onUploadTC();
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        // Show PDF preview
        const reader = new FileReader();
        reader.onload = () => {
          // sanitize for iframe
          // this.previewUrlTC = this.sanitizer.bypassSecurityTrustResourceUrl(
          //   reader.result as string
          // );

          const url = URL.createObjectURL(file);
          this.previewUrlTC = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.isImageTC = false;
          debugger;
          this.onUploadTC();
        };

        reader.readAsDataURL(file);


      } else {
        // For Word/Excel, just show file name
        this.previewUrlTC = null;
      }
    }
  }
  onFileSelectedIdProof(event: any) {
    this.selectedFileIdProof = event.target.files[0];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileNameIdProof = file.name;
      this.fileTypeIdProof = file.type;

      if (file.type.startsWith('image/')) {
        // Show image preview
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrlIdProof = reader.result as string;
          this.isImageIdProof = true;
          this.onUploadIdProof();
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        // Show PDF preview
        const reader = new FileReader();
        reader.onload = () => {
          // sanitize for iframe
          // this.previewUrlIdProof = this.sanitizer.bypassSecurityTrustResourceUrl(
          //   reader.result as string
          // );
          const url = URL.createObjectURL(file);
          this.previewUrlIdProof = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.isImageIdProof = false;
          this.onUploadIdProof();
        };

        reader.readAsDataURL(file);


      } else {
        // For Word/Excel, just show file name
        this.previewUrlIdProof = null;
      }
    }
  }
  onFileSelectedResume(event: any): void {
    this.selectedFileResume = event.target.files[0];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileNameResume = file.name;
      this.fileTypeResume = file.type;

      if (file.type.startsWith('image/')) {
        // Show image preview
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrlResume = reader.result as string;
          this.isImageResume = true;
          this.onUploadResume();
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        // Show PDF preview
        const reader = new FileReader();
        reader.onload = () => {
          // sanitize for iframe
          // this.previewUrlResume = this.sanitizer.bypassSecurityTrustResourceUrl(
          //   reader.result as string
          // );
          const url = URL.createObjectURL(file);
          this.previewUrlResume = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.isImageResume = false;
          this.onUploadResume();
        };

        reader.readAsDataURL(file);


      } else {
        // For Word/Excel, just show file name
        this.previewUrlResume = null;
      }
    }
  }
  // Remove photo
  removePhoto(): void {
    this.createStaffApiService.delete(this.staffImageId).subscribe({
      next: (res) => {
        this.message = 'Photo removed successfully!';
        this.previewUrl = null;
        this.selectedFile = null;
      },
      error: (err) => this.message = 'Failed to remove photo: ' + err.message
    });
  }

  removePhotoTC(): void {
    this.createStaffApiService.delete(this.staffImageIdTC).subscribe({
      next: (res) => {
        this.message = 'Photo removed successfully!';
        this.previewUrlTC = null;
        this.selectedFileTC = null;
      },
      error: (err) => this.message = 'Failed to remove photo: ' + err.message
    });
  }
  removePhotoResume(): void {
    this.createStaffApiService.delete(this.staffImageIdResume).subscribe({
      next: (res) => {
        this.message = 'Photo removed successfully!';
        this.previewUrlResume = null;
        this.selectedFileResume = null;
      },
      error: (err) => this.message = 'Failed to remove photo: ' + err.message
    });
  }
  removePhotoIdProof(): void {
    this.createStaffApiService.delete(this.staffImageIdIdProof).subscribe({
      next: (res) => {
        this.message = 'Photo removed successfully!';
        this.previewUrlIdProof = null;
        this.selectedFileIdProof = null;
      },
      error: (err) => this.message = 'Failed to remove photo: ' + err.message
    });
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
  onUploadTC(): void {
    if (this.selectedFileTC) {
      this.createStaffApiService.uploadImage(this.selectedFileTC).subscribe({
        next: (res) => {
          this.staffImageIdTC = res;
          this.message = 'Upload successful!';
        },
        error: (err) => this.message = 'Upload failed: ' + err.message
      });
    } else {
      this.message = 'Please select a file first!';
    }
  }
  onUploadIdProof(): void {
    if (this.selectedFileIdProof) {
      this.createStaffApiService.uploadImage(this.selectedFileIdProof).subscribe({
        next: (res) => {
          this.staffImageIdIdProof = res;
          this.message = 'Upload successful!';
        },
        error: (err) => this.message = 'Upload failed: ' + err.message
      });
    } else {
      this.message = 'Please select a file first!';
    }
  }
  onUploadResume(): void {
    if (this.selectedFileResume) {
      this.createStaffApiService.uploadImage(this.selectedFileResume).subscribe({
        next: (res) => {
          this.staffImageIdResume = res;
          this.message = 'Upload successful!';
        },
        error: (err) => this.message = 'Upload failed: ' + err.message
      });
    } else {
      this.message = 'Please select a file first!';
    }
  }
}
