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
import { CreateStudentApiService } from './create-student-api.service';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, DropdownModule, DatePipe, CalendarModule, ToastModule, ProgressSpinnerModule, InputTextModule, PasswordModule, MultiSelectModule, OverlayPanelModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css'
})
export class CreateStudentComponent implements OnInit {

  selectedFile: File | null = null;
  selectedFileParent: File | null = null;
  selectedFileStudentCertificate: File | null = null;
  message: string = '';
  previewUrl: any;
  parentPreviewUrl: any;
  studentCertificateUrl: any;
  studentImageId: any;
  parentImageId: any;
  studentTCImageId: any;


  masterData: any;
  dateOfAdmission: Date | null = null;
  dateOfBirth: Date | null = null;

  // Restrict birth date: cannot be in the future
  minBirthDate: Date = new Date(1900, 0, 1); // optional lower bound
  maxBirthDate: Date = new Date(); // today

  // Restrict admission date: must be after birth date, not in the future
  minAdmissionDate: Date = new Date(1900, 0, 1);
  maxAdmissionDate: Date = new Date();



  firstName: any = "";
  lastName: any;
  aadhaarCardNumber: any;
  mobileNumber: any;
  permanentAddress: any;
  rollNumber: any;
  admissionNumber: any;
  parentName: any = "";
  parentMobileNumber: any = "";
  parentEmail: any = "";
  pincode: any = "";
  emergencyNumber: any = "";
  parentAadhar: any = "";
  referalEmployeeId: any = "";

  classes: any[] = [];
  selectedClass: any;

  sections: any[] = [];
  selectedSection: any;

  educationTypes: any[] = [];
  selectedEducationType: any;

  academics: any[] = [];
  selectedAcademic: any;

  bloodGroups: any[] = [];
  selectedBloodGroup: any;

  cateCategory: any[] = [];
  selectedCateCategory: any;

  nationalities: any[] = [];
  selectedNationality: any;

  genders: any[] = [];
  selectedGender: any;

  languages: any[] = [];
  selectedLanguage: any;

  religions: any[] = [];
  selectedReligion: any;

  modeOfRelations: any[] = [];
  selectedModeOfRelation: any;

  transferStudents: any[] = [{ statusName: "active", statusValue: true }, { statusName: "in-active", statusValue: false }];
  selectedTransferStudents: any = { statusName: "active", statusValue: true };

  requiresBooks: any[] = [{ statusName: "active", statusValue: true }, { statusName: "in-active", statusValue: false }];
  selectedRequiresBooks: any = { statusName: "active", statusValue: true };

  requiresTransports: any[] = [{ statusName: "active", statusValue: true }, { statusName: "in-active", statusValue: false }];
  selectedRequiresTransports: any = { statusName: "active", statusValue: true };

  requiresUniform: any[] = [{ statusName: "active", statusValue: true }, { statusName: "in-active", statusValue: false }];
  selectedRequiresUniform: any = { statusName: "active", statusValue: true };

  admissionStatus: any[] = [{ statusName: "active", statusValue: true }, { statusName: "in-active", statusValue: false }];
  selectedAdmissionStatus: any = { statusName: "active", statusValue: true };

  showLoading = false;
  action = "save";



  editStudent: any;
  showPasswordField = false;
  showResetPasswordLoader = false;
  showUpdateButton = false;

  studentForm = new FormGroup({
    aadhaarCardNumber: new FormControl("", [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
    admissionNumber: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    admissionStatusId: new FormControl({ value: "", disabled: false }, [Validators.required]),
    academicYearId: new FormControl({ value: "", disabled: false }, [Validators.required]),
    bloodGroupId: new FormControl({ value: "", disabled: false }, [Validators.required]),
    casteCategoryId: new FormControl({ value: "", disabled: false }, [Validators.required]),
    classId: new FormControl({ value: "", disabled: false }, [Validators.required]),
    dateOfAdmission: new FormControl("", [Validators.required]),
    dateOfBirth: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
    genderId: new FormControl({ value: "", disabled: false }, [Validators.required]),
    isTransferStudent: new FormControl({ value: "", disabled: false }, [Validators.required]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
    mobileNumber: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    nationality: new FormControl({ value: "", disabled: false }, [Validators.required]),
    nativeLanguageId: new FormControl({ value: "", disabled: false }, [Validators.required]),
    permanentAddress: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
    religionId: new FormControl({ value: "", disabled: false }, [Validators.required]),
    requiresBooks: new FormControl({ value: "", disabled: false }, [Validators.required]),
    requiresTransport: new FormControl({ value: "", disabled: false }, [Validators.required]),
    requiresUniform: new FormControl({ value: "", disabled: false }, [Validators.required]),
    rollNumber: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    sectionId: new FormControl({ value: "", disabled: false }, [Validators.required]),
    modeOfRelation: new FormControl({ value: "", disabled: false }, [Validators.required]),
    parentName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
    parentMobileNumber: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    parentEmail: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(45)]),
    pincode: new FormControl("", [Validators.minLength(6), Validators.maxLength(6), Validators.required]),
    educationTypeId: new FormControl("", [Validators.required]),
    referalEmployeeId: new FormControl(""),
    emergencyNumber: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    parentAadhar: new FormControl("", [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),


  });

  constructor(private createStudentApiService: CreateStudentApiService,
    private _location: Location,
    private messageService: MessageService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.studentForm.reset();
    this.validateQueryParam();
    await this.getyears();
    await this.getMasterData();

  }
  async validateAction() {
    if (this.action == 'view') {
      this.studentForm.disable();
    }
  }
  async validateTransferStudents(student: any) {
    this.selectedTransferStudents = this.transferStudents?.find(function (status) {
      if (status.statusValue == student.isTransferStudent) {
        return status;
      }
    });
  }

  async validateRequiresBooks(student: any) {
    this.selectedRequiresBooks = this.requiresBooks?.find(function (status) {
      if (status.statusValue == student.requiresBooks) {
        return status;
      }
    });
  }
  async validateRequiresTransport(student: any) {
    this.selectedRequiresTransports = this.requiresTransports?.find(function (status) {
      if (status.statusValue == student.requiresTransport) {
        return status;
      }
    });
  }
  async validateRequiresUniform(student: any) {
    this.selectedRequiresUniform = this.requiresUniform?.find(function (status) {
      if (status.statusValue == student.requiresUniform) {
        return status;
      }
    });
  }
  async validateClass(student: any) {
    this.selectedClass = this.classes?.find(function (classData) {
      if (classData.masterId == student.classId) {
        classData.classLabel = classData.name;
        return classData;
      }
    });
  }

  async validateSection(student: any) {
    this.selectedSection = this.sections?.find(function (sectionData) {
      if (sectionData.id == student.sectionId) {
        sectionData.sectionLabel = sectionData.sectionName;
        return sectionData;
      }
    });
  }

  async validateAcademic(student: any) {
    debugger;
    this.selectedAcademic = this.academics?.find(function (academicData) {
      if (academicData.id == student.academicYearId) {
        academicData.academicYearName = academicData.name;
        return academicData;
      }
    });
  }

  async validateBloodGroup(student: any) {
    debugger;
    this.selectedBloodGroup = this.bloodGroups?.find(function (bloodGroupData) {
      if (bloodGroupData.masterId == student.bloodGroupId) {
        bloodGroupData.name = bloodGroupData.name;
        return bloodGroupData;
      }
    });
  }
  async validateCategory(student: any) {
    this.selectedCateCategory = this.cateCategory?.find(function (categoryData) {
      if (categoryData.masterId == student.casteCategoryId) {
        categoryData.name = categoryData.name;
        return categoryData;
      }
    });
  }
  async validateNationality(student: any) {
    this.selectedNationality = this.nationalities?.find(function (nationalityData) {
      if (nationalityData.masterId == student.nationalityId) {
        nationalityData.name = nationalityData.name;
        return nationalityData;
      }
    });
  }
  async validateGender(student: any) {
    this.selectedGender = this.genders?.find(function (genderData) {
      if (genderData.masterId == student.genderId) {
        genderData.name = genderData.name;
        return genderData;
      }
    });
  }
  async validateLanguage(student: any) {
    debugger;
    this.selectedLanguage = this.languages?.find(function (languageData) {
      if (languageData.masterId == student.nativeLanguageId) {
        languageData.name = languageData.name;
        return languageData;
      }
    });
  }
  async validateModeofRelation(student: any) {
    this.selectedModeOfRelation = this.modeOfRelations?.find(function (mode) {
      if (mode.masterId == student.modeOfRelation) {
        mode.name = mode.name;
        return mode;
      }
    });
  }
  async validateReligion(student: any) {
    this.selectedReligion = this.religions?.find(function (religionData) {
      if (religionData.masterId == student.religionId) {
        religionData.name = religionData.name;
        return religionData;
      }
    });
  }
    async validateEducationType(student: any) {
    this.selectedEducationType = this.educationTypes?.find(function (educationTypeData) {
      debugger;
      if (educationTypeData.masterId == student.educationTypeId) {
        debugger;
        educationTypeData.name = educationTypeData.name;
        return educationTypeData;
      }
    });
  }

  async validateHistory(): Promise<any> {
    let student: any;
    if (history.state.student) {
      student = history.state.student;
    }
    return student;
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
      history.pushState({ backPageData: (state as any).backPageData, isPageReload: true, student: this.editStudent }, "");
    }
  }

  onSelect() {
    if (this.dateOfAdmission && this.dateOfBirth) {
      if (this.dateOfAdmission < this.dateOfBirth) {
        alert("Admission date cannot be before birth date!");
        this.dateOfAdmission = null;
      }
    }
  }
  years: any[] = []
  async getyears() {
    this.academics = await firstValueFrom(this.createStudentApiService.getyears());
  }
  async getMasterData() {
    this.createStudentApiService.getMasterData().subscribe({
      next: (response) => {
        debugger;
        this.masterData = response?.data;
        this.classes = this.masterData?.classesList || [];
        // this.sections = this.masterData?.data?.sectionsList || [];
        // this.academics = this.masterData?.data?.academicYearList || [];
        this.bloodGroups = this.masterData?.bloodGroupsList || [];
        this.cateCategory = this.masterData?.categoriesList || [];
        this.genders = this.masterData?.gendersList || [];
        this.languages = this.masterData?.languagesList || [];
        this.religions = this.masterData?.religionsList || [];
        this.nationalities = this.masterData?.nationalityList || [];
        this.modeOfRelations = this.masterData?.modeRelationList || [];
        this.educationTypes = this.masterData?.educationTypeList || [];



        if (this.action == 'edit' || this.action == 'view') {
          let student: any;
          student = history.state.student;

          this.editStudent = student;

          this.firstName = student.firstName;
          this.lastName = student.lastName;
          this.aadhaarCardNumber = student.aadhaarCardNumber;
          this.mobileNumber = student.mobileNumber;
          this.permanentAddress = student.permanentAddress;
          this.rollNumber = student.rollNumber;
          this.admissionNumber = student.admissionNumber;
          this.dateOfBirth = student.dateOfBirth ? new Date(student.dateOfBirth) : null;
          this.dateOfAdmission = student.dateOfAdmission ? new Date(student.dateOfAdmission) : null;
          this.parentEmail = student.parentEmail;
          this.parentMobileNumber = student.parentMobileNumber;
          this.parentName = student.parentName;
          this.pincode = student.pincode;
          this.emergencyNumber = student.emergencyNumber;
          this.parentAadhar = student.parentAadhar;
          this.referalEmployeeId = student.referalEmployeeId;

          this.previewUrl = student.studentProfileImage ? 'data:image/jpeg;base64,' + student.studentProfileImage : null;
          this.parentPreviewUrl = student.parentProfileImage ? 'data:image/jpeg;base64,' + student.parentProfileImage : null;
          this.studentCertificateUrl = student.studentTcImage ? 'data:image/jpeg;base64,' + student.studentTcImage : null;


          this.validateAcademic(student);
          this.validateBloodGroup(student);
          this.validateCategory(student);
          this.validateNationality(student);
          this.validateGender(student);
          this.validateLanguage(student);
          this.validateReligion(student);
          this.validateClass(student);
          this.validateTransferStudents(student);
          this.validateRequiresBooks(student);
          this.validateRequiresTransport(student);
          this.validateRequiresUniform(student);
          this.validateModeofRelation(student);
          this.validateEducationType(student);
          debugger;
          this.getSectionDataedit(student.classId, student);

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
  getSectionDataedit(classId: any, student: any) {
    debugger;
    this.createStudentApiService.getSectionData(classId).subscribe({
      next: (response) => {
        this.sections = response;

        this.validateSection(student);
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }
  getSectionData(classId: any) {
    debugger;
    this.createStudentApiService.getSectionData(classId).subscribe({
      next: (response) => {
        this.sections = response;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
    });
  }

  async onEducationType(event: any) {
    if (event.value != null) {
      event.value.educationTypeLabel = event.value.name;
    }
  }
  async onSection(event: any) {
    if (event.value != null) {
      event.value.sectionLabel = event.value.sectionName;
    }
  }
  async onClass(event: any) {
    if (event.value != null) {
      event.value.classLabel = event.value.className;
      this.getSectionData(event?.value?.masterId);
    }
  }

  async onAcademicYear(event: any) {
    if (event.value != null) {
      event.value.academicYearName = event.value.name;
    }
  }

  async onBloodGroup(event: any) {
    if (event.value != null) {
      event.value.bloodGroupName = event.value.name;
    }
  }
  async onCategory(event: any) {
    if (event.value != null) {
      event.value.categoryName = event.value.name;
    }
  }
  async onNationality(event: any) {
    if (event.value != null) {
      event.value.nationalityName = event.value.name;
    }
  }
  async onGender(event: any) {
    if (event.value != null) {
      event.value.genderName = event.value.name;
    }
  }
  async onLanguage(event: any) {
    if (event.value != null) {
      event.value.languageName = event.value.languageName;
    }
  }
  async onReligion(event: any) {
    if (event.value != null) {
      event.value.religionName = event.value.name;
    }
  }


  onSubmit() {
    this.studentForm.disable();
    this.showLoading = true;
    let student: any = this.studentForm.value;

    student.requiresBooks = student.requiresBooks.statusValue === true ? 1 : 0;
    student.requiresTransport = student.requiresTransport.statusValue === true ? 1 : 0;
    student.requiresUniform = student.requiresUniform.statusValue === true ? 1 : 0;
    student.isTransferStudent = student.isTransferStudent.statusValue === true ? 1 : 0;
    student.admissionStatusId = student.admissionStatusId.statusValue === true ? 1 : 0;

    student.academicYearId = student.academicYearId.id;
    student.bloodGroupId = student.bloodGroupId.masterId;
    student.casteCategoryId = student.casteCategoryId.masterId;
    student.classId = student.classId.masterId;
    student.nationalityId = student.nationality.masterId;
    student.nationality = student.nationality.name;
    student.nativeLanguageId = student.nativeLanguageId.masterId;
    student.religionId = student.religionId.masterId;
    student.genderId = student.genderId.masterId;
    student.sectionId = student.sectionId.id;
    student.modeOfRelation = student.modeOfRelation.masterId;
    student.educationTypeId = student.educationTypeId.masterId;

    student.parentImageUploadId = this.parentImageId;
    student.studentImageUploadId = this.studentImageId;
    student.studentTcUploadId = this.studentTCImageId;

    this.createStudentApiService.save(student).subscribe({
      next: (response) => {
        this.studentForm.enable();
        this.showLoading = false;
        this.showToast('SUCCESS', 'Student created successfully!', 'New student has been created successfully');
        this.studentForm.reset({
          "parentName": "", "parentMobileNumber": "", "parentEmail": "", "dateOfBirth": "", "dateOfAdmission": "", "firstName": "", "lastName": "", "aadhaarCardNumber": "",
          "mobileNumber": "", "permanentAddress": "", "rollNumber": "", "admissionNumber": "",
          "pincode": "", "emergencyNumber": "", "parentAadhar": ""
        });
        this.sections = [];
        this.studentForm.get('sectionId')?.disable();
        this.selectedTransferStudents = { statusName: "active", statusValue: true };
        this.selectedAdmissionStatus = { statusName: "active", statusValue: true };
        this.selectedRequiresBooks = { statusName: "active", statusValue: true };
        this.selectedRequiresTransports = { statusName: "active", statusValue: true };
        this.selectedRequiresUniform = { statusName: "active", statusValue: true };
        this.parentPreviewUrl = "";
        this.studentCertificateUrl = "";
        this.previewUrl = "";

      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.studentForm.enable();
        this.studentForm.get('status')?.disable();
        this.showLoading = false;
      },
      complete: () => { }
    });
  }

  onEdit() {
    this.showLoading = true;
    let student: any = this.studentForm.value;
    student.studentId = this.editStudent.studentId;
    student.requiresBooks = student.requiresBooks.statusValue === true ? 1 : 0;
    student.requiresTransport = student.requiresTransport.statusValue === true ? 1 : 0;
    student.requiresUniform = student.requiresUniform.statusValue === true ? 1 : 0;
    student.isTransferStudent = student.isTransferStudent.statusValue === true ? 1 : 0;
    student.admissionStatusId = student.admissionStatusId.statusValue === true ? 1 : 0;

    student.academicYearId = student.academicYearId.id;
    student.bloodGroupId = student.bloodGroupId.masterId;
    student.casteCategoryId = student.casteCategoryId.masterId;
    student.classId = student.classId.masterId;
    student.nationalityId = student.nationality.masterId;
    student.nationality = student.nationality.name;
    student.nativeLanguageId = student.nativeLanguageId.masterId;
    student.religionId = student.religionId.masterId;
    student.genderId = student.genderId.masterId;
    student.sectionId = student.sectionId.id;
    student.modeOfRelation = student.modeOfRelation.masterId;
    student.educationTypeId = student.educationTypeId.masterId;

    student.parentImageUploadId = this.parentImageId==null? this.editStudent.parentImageUploadId : this.parentImageId;
    student.studentImageUploadId = this.studentImageId==null? this.editStudent.studentImageUploadId : this.studentImageId;
    student.studentTcUploadId = this.studentTCImageId==null? this.editStudent.studentTcUploadId : this.studentTCImageId;

    this.createStudentApiService.update(student).subscribe({
      next: (response) => {
        this.showLoading = false;
        this.showToast('SUCCESS', 'Student updated successfully!', 'Student has been updated successfully');
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
        this.showLoading = false;
      },
      complete: () => { }
    });
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

  getErrorMessage(fieldName: any, studentFormErrors: any) {
    if (this.action != 'view') {
      let keys = Object.keys(studentFormErrors)
      return this.formErrorMessage[fieldName][keys[0]];
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

  formErrorMessage: any = {
    reationType: {
      required: "Relation Type is required."
    },
    parentName: {
      required: "Parent Name is required.",
      minlength: "Parent Name must be at least 3 characters.",
      maxlength: "Parent Name should not be greater than 45 characters."
    },
    parentMobileNumber: {
      required: "Parent Mobile Number is required.",
      minlength: "Parent Mobile Number must be at least 10 characters.",
      maxlength: "Parent Mobile Number should not be greater than 10 characters."
    },
    parentEmail: {
      required: "Parent Email is required.",
      email: "Parent Email should be in proper format.",
      maxlength: "Parent Email should not be greater than 45 characters."
    },

    aadhaarCardNumber: {
      required: "Aadhaar Card Number is required.",
      minlength: "Aadhaar Card Number must be at least 12 characters.",
      maxlength: "Aadhaar Card Number should not be greater than 12 characters."
    },
    admissionNumber: {
      required: "Admission Number is required.",
      minlength: "Admission Number must be at least 3 characters.",
      maxlength: "Admission Number should not be greater than 45 characters."
    },
    firstName: {
      required: "First Name is required.",
      minlength: "First Name must be at least 3 characters.",
      maxlength: "First Name should not be greater than 50 characters."
    },
    lastName: {
      required: "Last Name is required.",
      minlength: "Last Name must be at least 3 characters.",
      maxlength: "Last Name should not be greater than 50 characters."
    },
    mobileNumber: {
      required: "Mobile Number is required.",
      minlength: "Mobile Number must be at least 10 characters.",
      maxlength: "Mobile Number should not be greater than 10 characters."
    },
    rollNumber: {
      required: "Roll Number is required.",
      minlength: "Roll Number must be at least 2 characters.",
      maxlength: "Roll Number should not be greater than 45 characters."
    },
    admissionStatusId: {
      required: "Admission Status is required."
    },
    academicYearId: {
      required: "Academic Year is required."
    },
    bloodGroupId: {
      required: "Blood Group is required."
    },
    casteCategoryId: {
      required: "Caste Category is required."
    },
    classId: {
      required: "Class is required."
    },
    dateOfAdmission: {
      required: "Date of Admission is required."
    },
    dateOfBirth: {
      required: "Date of Birth is required."
    },
    genderId: {
      required: "Gender is required."
    },
    isTransferStudent: {
      required: "Transfer Student status is required."
    },
    requiresBooks: {
      required: "Requires Books status is required."
    },
    requiresTransport: {
      required: "Requires Transport status is required."
    },
    requiresUniform: {
      required: "Requires Uniform status is required."
    },
    nationality: {
      required: "Nationality is required."
    },
    nativeLanguageId: {
      required: "Native Language is required."
    },
    permanentAddress: {
      required: "Permanent Address is required.",
      minlength: "Permanent Address must be at least 5 characters.",
      maxlength: "Permanent Address should not be greater than 500 characters."
    },
    sectionId: {
      required: "Section is required."
    }
    ,
    religionId: {
      required: "Religion is required."
    },
    pincode: {
      required: "Pin Code is required.",
      minlength: "Pin Code must be at least 6 characters.",
      maxlength: "Pin Code should not be greater than 6 characters."
    },
    educationTypeId: {
      required: "Education Type is required."
    },
    // referalEmployeeId: {
    //   required: "Referal Employee is required."
    // },
    emergencyNumber: {
      required: "Emergency Contact Number is required.",
      minlength: "Emergency Contact Number must be at least 10 characters.",
      maxlength: "Emergency Contact Number should not be greater than 10 characters."
    },
    parentAadhar: {
      required: "Parent Aadhaar Card Number is required.",
      minlength: "Parent Aadhaar Card Number must be at least 12 characters.",
      maxlength: "Parent Aadhaar Card Number should not be greater than 12 characters."
    }

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
  // Preview selected file
  onFileSelectedParent(event: any): void {
    this.selectedFileParent = event.target.files[0];

    if (this.selectedFileParent) {
      const reader = new FileReader();
      reader.onload = () => {
        this.parentPreviewUrl = reader.result as string;
        this.onUploadParent();
      };
      reader.readAsDataURL(this.selectedFileParent);
    }
  }
  // Preview selected file
  onFileSelectedStudentCertificate(event: any): void {
    this.selectedFileStudentCertificate = event.target.files[0];

    if (this.selectedFileStudentCertificate) {
      const reader = new FileReader();
      reader.onload = () => {
        this.studentCertificateUrl = reader.result as string;
        this.onUploadStudentCertificate();
      };
      reader.readAsDataURL(this.selectedFileStudentCertificate);
    }
  }
  // Remove photo
  removePhoto(): void {
    this.createStudentApiService.delete(this.studentImageId).subscribe({
      next: (res) => {
        this.message = 'Photo removed successfully!';
        this.previewUrl = null;
        this.selectedFile = null;
      },
      error: (err) => this.message = 'Failed to remove photo: ' + err.message
    });
  }
  // Remove Parent photo
  removeParentPhoto(): void {
    this.createStudentApiService.delete(this.parentImageId).subscribe({
      next: (res) => {
        this.message = 'Photo removed successfully!';
        this.parentPreviewUrl = null;
        this.selectedFile = null;
      },
      error: (err) => this.message = 'Failed to remove photo: ' + err.message
    });

  }
  // Remove Student TC photo
  removeStudentCertificate(): void {
    this.createStudentApiService.delete(this.studentTCImageId).subscribe({
      next: (res) => {
        this.message = 'Photo removed successfully!';
        this.studentCertificateUrl = null;
        this.selectedFile = null;
      },
      error: (err) => this.message = 'Failed to remove photo: ' + err.message
    });

  }


  onUpload(): void {
    if (this.selectedFile) {
      this.createStudentApiService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          this.studentImageId = res;
          this.message = 'Upload successful!';
        },
        error: (err) => this.message = 'Upload failed: ' + err.message
      });
    } else {
      this.message = 'Please select a file first!';
    }
  }
  onUploadParent(): void {
    if (this.selectedFileParent) {
      this.createStudentApiService.uploadImage(this.selectedFileParent).subscribe({
        next: (res) => {
          this.parentImageId = res;
          this.message = 'Upload successful!';
        },
        error: (err) => this.message = 'Upload failed: ' + err.message
      });
    } else {
      this.message = 'Please select a file first!';
    }
  }
  onUploadStudentCertificate(): void {
    if (this.selectedFileStudentCertificate) {
      this.createStudentApiService.uploadImage(this.selectedFileStudentCertificate).subscribe({
        next: (res) => {
          this.studentTCImageId = res;
          this.message = 'Upload successful!';
        },
        error: (err) => this.message = 'Upload failed: ' + err.message
      });
    } else {
      this.message = 'Please select a file first!';
    }
  }

}
