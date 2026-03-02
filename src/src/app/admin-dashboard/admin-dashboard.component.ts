import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
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
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
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
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}