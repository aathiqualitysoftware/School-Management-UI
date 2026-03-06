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
import { EnvironmentService } from '../environment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MainDashboardApiService } from './main-dashboard-api.service';
@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ProgressSpinnerModule, InputTextModule, PasswordModule, MultiSelectModule, OverlayPanelModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent implements OnInit {
  action: any;
  userId: any;
  studentData: any;
  constructor(private router: Router,
    private mainDashboardApiService: MainDashboardApiService,
    private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private _location: Location,
    private environment: EnvironmentService) {
  }
  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.action = params['action'];
      this.userId = params['userId'];
      // Extra debug: log API call
      if (this.userId) {
        console.log('Calling getStudenDashBoard with userId:', this.userId);
        try {
          this.studentData = await this.getStudenDashBoard();
          console.log('Student data loaded:', this.studentData);
        } catch (err) {
          console.error('Error loading student dashboard:', err);
        }
      }
    });
  }
  async getStudenDashBoard(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Optionally, check if user is authenticated before making the API call
      // if (!this.authService.isAuthenticated()) {
      //   this.showToast("WARNING", "Not Authenticated", "Please log in.");
      //   reject("Not Authenticated");
      //   return;
      // }
      this.mainDashboardApiService.getStudenDashBoard(this.userId).subscribe({
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
}

// In Chrome DevTools, open the Network tab and inspect the request to your API.
// Confirm the Authorization header is present and matches Postman.
