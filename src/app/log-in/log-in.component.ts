
import { CommonModule, Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { LogInApiService } from './log-in-api.service';
import { EnvironmentService } from '../environment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ProgressSpinnerModule, InputTextModule, PasswordModule, MultiSelectModule, OverlayPanelModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

    model: any = {};
  errorMessage:any = "";
  invalidUser = false;
  superAdmin = false;
  superAdminInLogin = false;
  origins: any;
  selectedOrigin: any;
  userPrivileges: any;
  originSettings: any;
  disableLoginButton: any = false;
  userRoles: any;
  originName: any;
  originId: any;
  imageObject: Array<object> = [
    {
      image: 'assets/images/loginCarouselImages/olam_cocoa.jpg',
      thumbImage: 'assets/images/loginCarouselImages/olam_cocoa.jpg',
      alt: 'Image Cocoa'
    },
    {
      image: 'assets/images/loginCarouselImages/olam_coffee.jpg',
      thumbImage: 'assets/images/loginCarouselImages/olam_coffee.jpg',
      alt: 'Image Coffee'
    },
    {
      image: 'assets/images/loginCarouselImages/olam_cashew.jpg',
      thumbImage: 'assets/images/loginCarouselImages/olam_cashew.jpg',
      alt: 'Image Cashew'
    },
    {
      image: 'assets/images/loginCarouselImages/olam_almonds.jpg',
      thumbImage: 'assets/images/loginCarouselImages/olam_almonds.jpg',
      alt: 'Image Almonds'
    },
    {
      image: 'assets/images/loginCarouselImages/olam_hazelnut.jpg',
      thumbImage: 'assets/images/loginCarouselImages/olam_hazelnut.jpg',
      alt: 'Image Hazelnut'
    },
  ];

  logInTypes: any = [];
  selectedLogInTypes: any;
  showPassword = false;

  logInForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
    password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
  });
  showLoading = false;
  loginType: any;
  headerTitle: string = "";
  constructor(private router: Router,
    private logInApiService: LogInApiService,
    private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private _location: Location,
    private environment: EnvironmentService) {
  }
  async ngOnInit() {
    //  [this.logInTypes] = await Promise.all([this.getLogInUserTypes()]);

    this.logInTypes = [{
      "roleId": 1,
      "roleName": "Admin",
      "roleCategory": "Administrative"
    }, {
      "roleId": 2,
      "roleName": "Teaching Staff",
      "roleCategory": "Institution"
    }, {
      "roleId": 3,
      "roleName": "Non Teaching Staff",
      "roleCategory": "Institution"
    }, {
      "roleId": 4,
      "roleName": "Parent",
      "roleCategory": "Institution"
    }, {
      "roleId": 5,
      "roleName": "Student",
      "roleCategory": "Institution"
    }];

    this.loginType = localStorage.getItem('userLogInType');
    this.headerTitle = "Log In as " + (this.loginType ? this.loginType.charAt(0).toUpperCase() + this.loginType.slice(1) : "");
  }
  async getLogInUserTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.logInApiService.getLogInUserTypes().subscribe({
        next: (response) => {
          resolve(response?.data);
        },
        error: (err: HttpErrorResponse) => {
          this.segregateErrors(err);
          reject(err);
        },
        complete: () => { }
      });
    });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    localStorage.removeItem('jwt_token');
    if (this.logInForm.get('username')?.value == "" ||
      this.logInForm.get('password')?.value == "") {
      this.showToast('WARNING', 'Log In', 'Please enter User Name and Password');
    } else {
      // this.logInForm.disable();
      this.showLoading = true;
      let logInInfo: any = this.logInForm.value;
      logInInfo.username = this.logInForm.get('username')?.value;
      logInInfo.password = this.logInForm.get('password')?.value;
      // logInInfo.roleName = this.loginType;

      this.authService.login(logInInfo)
        .subscribe({
          next: (response) => {

            this.authService.saveToken(response.token);
            const payload = JSON.parse(atob(response.token.split('.')[1]));
            let studentId = payload.student?.studentId || null;
            this.loginType = payload.roles[0].toLowerCase();
            localStorage.setItem('userLogInType', this.loginType);

            // this.logInForm.enable();
            this.showLoading = false;
            this.showToast('SUCCESS', 'Log In successful!', 'You have successfully logged in');
            this.logInForm.reset();
            // this.router.navigate(['/home/dashboard']);
            if (this.loginType === 'student') {
              this.router.navigate(['/home/dashboard'], { queryParams: { userId: studentId } });
            } else if (this.loginType === 'admin') {
              this.router.navigate(['/home/admin-dashboard']);
            }else if (this.loginType === 'staff') {
              this.router.navigate(['/home/admin-dashboard']);
            } else if (this.loginType === 'teaching staff' || this.loginType === 'non teaching staff') {
              this.router.navigate(['/home/staff-dashboard']);
            } else if (this.loginType === 'parent') {
              this.router.navigate(['/home/parent-dashboard']);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.showToast('WARNING', 'Log In', 'Invalid Credentials! Please try again.');
            // this.segregateErrors(err);
          },
          complete: () => { }
        });
    }

  }
  goBack() {
    this.router.navigate(['dashboard-login']);
  }
  onlogInTypeSelection(logInTypeEvent: any) {
    if (this.selectedLogInTypes != null) {
      logInTypeEvent.value.logInTypeName = logInTypeEvent.value.roleName;
    }
  }
  segregateErrors(err: HttpErrorResponse) {
    if (err.status == 401) {
      this.showToast("WARNING", "Session Expired!", "Session Expired! Please Re-Login");
    } else if (err.status.toString().startsWith('4')) {
      this.showToast("WARNING", "Exception Occured!", err.error?.exceptions ? err.error?.exceptions[0] : err.error.message);
    } else if (err.status.toString().startsWith('5')) {
      this.showToast("ERROR", "Error Occured!", err.error.message);
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

  getErrorMessage(fieldName: any, modulesInfoFormErrors: any) {
    // if (this.action != 'view') {
    let keys = Object.keys(modulesInfoFormErrors)
    return this.formErrorMessage[fieldName][keys[0]];
    // }
  }

  formErrorMessage: any = {
    username: {
      required: "User Name is required.",
    },
    password: {
      required: "Password is required.",
    }
  }
}
