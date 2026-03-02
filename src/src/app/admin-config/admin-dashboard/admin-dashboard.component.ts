import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CUSTOM_ELEMENTS_SCHEMA,  OnInit } from '@angular/core';
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
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ProgressSpinnerModule, InputTextModule, PasswordModule, MultiSelectModule, OverlayPanelModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.loadAttendanceChart();
    this.loadFeeChart();
  }

  loadAttendanceChart() {
    new Chart("attendanceChart", {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Attendance %',
          data: [0,0,0,0,0,0,0,0,0,0,8.7,52.2],
          backgroundColor: '#4CAF50'
        }]
      },
      options: {
        // responsive: true,
        // scales: {
        //   y: { beginAtZero: true, max: 100 }
        // }
      }
    });
  }

  loadFeeChart() {
    new Chart("feeChart", {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'],
        datasets: [{
          label: 'Fee Collection (₹)',
          data: [0,0,0,0,0,0,0,0,0,52000,152000],
          backgroundColor: '#2196F3'
        }]
      },
      options: {
        // responsive: true,
        // scales: {
        //   y: { beginAtZero: true }
        // }
      }
    });
  }
}