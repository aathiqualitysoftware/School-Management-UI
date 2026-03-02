
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
@Component({
  selector: 'app-dashboard-log-in',
  standalone: true,
  imports: [CommonModule, DropdownModule, ToastModule, ProgressSpinnerModule, InputTextModule, PasswordModule, MultiSelectModule, OverlayPanelModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  templateUrl: './dashboard-log-in.component.html',
  styleUrl: './dashboard-log-in.component.css'
})
export class DashboardLogInComponent {
  loginTypes = [
    { value: 'student', label: "I'm a Student", icon: 'assets/images/profile-icon.svg' },
    { value: 'parent', label: "I'm a Parent", icon: 'assets/images/profile-icon.svg' },
    { value: 'staff', label: "I'm a Staff", icon: 'assets/images/profile-icon.svg' },
    { value: 'admin', label: "I'm an Admin", icon: 'assets/images/profile-icon.svg' }
  ];

  selectedType: any;

  constructor(private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private _location: Location,
    private environment: EnvironmentService) {
  }
  async ngOnInit() {

  }

  onSelect(type: string) {
    this.selectedType = type;
    console.log('Selected login type:', type);
    
    localStorage.setItem('userLogInType', type);
    this.router.navigate(['/home/login'], { queryParams: { loginType: type } });
  }


}
