import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EnvironmentService } from '../../environment.service';
import { Router } from '@angular/router';
import { HostelGatePassApiService } from './hostel-gate-pass-api.service';
@Component({
  selector: 'app-hostel-gate-pass',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ToastModule,
    TableModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, TabViewModule
  ],
  templateUrl: './hostel-gate-pass.component.html',
  styleUrl: './hostel-gate-pass.component.css'
})
export class HostelGatePassComponent implements OnInit {
  enableSearchLoading = false;
  students: any[] = [];
  // gatePassList = [{  //student
  //   "id": 1,
  //   "studentId": 101,
  //   "studentName": "Arun Kumar",
  //   "className": "10th",
  //   "sectionName": "A",
  //   "reason": "Going to home",
  //   "fromDate": "2026-03-25T10:00:00",
  //   "toDate": "2026-03-26T18:00:00",
  //   "place": "Chennai",
  //   "status": "PENDING",
  //   "createdAt": "2026-03-25T09:00:00"
  // }];
  // gatePassList = [  //warden
  //   {
  //     "id": 1,
  //     "studentId": 101,
  //     "studentName": "Arun Kumar",
  //     "className": "10th",
  //     "sectionName": "A",
  //     "reason": "Going to home",
  //     "fromDate": "2026-03-25T10:00:00",
  //     "toDate": "2026-03-26T18:00:00",
  //     "place": "Chennai",
  //     "status": "PENDING"
  //   }
  // ];
  // gatePassList = [ // security
  //   {
  //     "id": 1,
  //     "studentId": 101,
  //  "className": "10th",
  //   "sectionName": "A",
  //     "studentName": "Arun Kumar",
  //     "reason": "Going to home",
  //     "fromDate": "2026-03-25T10:00:00",
  //     "toDate": "2026-03-26T18:00:00",
  //     "status": "APPROVED"
  //   }
  // ]
  gatePassList: any[] = [];
  userRole: string = 'STUDENT'; // STUDENT / WARDEN / SECURITY
  otpSent: boolean = false;
  otpVerified: boolean = false;
  enteredOtp: string = '';

  constructor(private hostelGatePassApiService: HostelGatePassApiService, private messageService: MessageService, private router: Router,
    private environment: EnvironmentService, private http: HttpClient, private fb: FormBuilder) {

  }
  ngOnInit() {
    this.loadGatePass();
  }
  form = new FormGroup({
    reason: new FormControl("", [Validators.required]),
    fromDate: new FormControl(null as Date | null, [Validators.required]),
    toDate: new FormControl(null as Date | null, [Validators.required]),
    place: new FormControl("", [Validators.required])
  });


  sendOtp() {
    this.otpSent = true;
    alert('OTP sent to parent');
    return;
    this.http.post('http://localhost:8080/send-otp', {})
      .subscribe(() => {
        this.otpSent = true;
        alert('OTP sent to parent');
      });
  }

  verifyOtp() {
    this.otpVerified = true;
    alert('OTP verified');
    return;
    this.http.post('http://localhost:8080/verify-otp', { otp: this.enteredOtp })
      .subscribe(() => {
        this.otpVerified = true;
        alert('OTP verified');
      });
  }
  validateDates(): boolean {
    const from = this.form.controls.fromDate.value;
    const to = this.form.controls.toDate.value;
    if (to != null && from != null)
      if (to <= from) {
        alert('To Date must be greater than From Date');
        return false;
      }
    return true;
  }
  getErrorMessage(fieldName: any, examFormErrors: any) {
    let keys = Object.keys(examFormErrors)
    return this.formErrorMessage[fieldName][keys[0]];
  }

  formErrorMessage: any = {
    reason: {
      required: "Reason is required."
    }, fromDate: {
      required: "From Date is required.",
    }, toDate: {
      required: "To Date is required.",
    }, place: {
      required: "Place is required.",
    }
  }
  submit() {
    if (this.form.invalid || !this.validateDates() || !this.otpVerified) return;
    const payload = {
      ...this.form.value,
      status: 'PENDING'
    };
    this.http.post('http://localhost:8080/gatepass', payload)
      .subscribe(() => {
        alert('Request Submitted');
        this.loadGatePass();
      });
  }

  loadGatePass() {
    this.http.get<any[]>('http://localhost:8080/gatepass')
      .subscribe(res => this.gatePassList = res);
  }
  approve(pass: any) {
    pass.status = 'APPROVED';
    this.update(pass);
  }

  reject(pass: any) {
    pass.status = 'REJECTED';
    this.update(pass);
  }

  markReturn(pass: any) {
    pass.status = 'RETURNED';
    this.update(pass);
  }

  update(pass: any) {
    this.http.put(`http://localhost:8080/gatepass/${pass.id}`, pass)
      .subscribe(() => this.loadGatePass());
  }
}
