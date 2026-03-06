import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Constants } from '../util/constants';
import { EnvironmentService } from '../environment.service';
import { AuthService } from '../auth.service';
import { CalendarModule } from 'primeng/calendar';
import { HighchartsChartModule } from 'highcharts-angular';
import { SchoolInfoApiService } from './school-info-api.service';
@Component({
  selector: 'app-school-info',
  standalone: true,
  imports: [CommonModule, CalendarModule, ToastModule, DropdownModule, DatePipe, InputTextModule, TableModule, ConfirmPopupModule, FormsModule, ReactiveFormsModule, HighchartsChartModule],
  providers: [ConfirmationService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './school-info.component.html',
  styleUrl: './school-info.component.css'
})
export class SchoolInfoComponent {
  schoolName = '';
  email = '';
  mobileNumber = '';
  address = '';
  socialMedia: any[] = [];
  constructor(private schoolInfoApiService: SchoolInfoApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private environment: EnvironmentService,
    private authService: AuthService,
  ) {

  }
  ngOnInit() {
    this.getSchoolInfo();
  }

  getSchoolInfo() {
    this.schoolInfoApiService.getSchoolInfo().subscribe({
      next: (response) => {

        this.schoolName = response?.data[0]?.schoolName;
        this.email = response?.data[0]?.emailId;
        this.mobileNumber = response?.data[0]?.phoneNumber;
        this.address = response?.data[0]?.address1 + ', ' + response?.data[0]?.address2;
        let map = [];
        map.push({ name: 'Facebook', url: response?.data[0]?.fbLink, icon: 'pi pi-facebook' });
        map.push({ name: 'Twitter', url: response?.data[0]?.twitterLink, icon: 'pi pi-twitter' });
        map.push({ name: 'Instagram', url: response?.data[0]?.instagramLink, icon: 'pi pi-instagram' });
        this.socialMedia = map;
      },
      error: (err: HttpErrorResponse) => {
        this.segregateErrors(err);
      },
      complete: () => { }
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
