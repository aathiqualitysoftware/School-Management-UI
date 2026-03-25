import { CommonModule } from '@angular/common';
import { AfterContentChecked, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Constants } from '../util/constants';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { EnvironmentService } from '../environment.service';
import { AccordionModule } from 'primeng/accordion';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PanelMenuModule, AccordionModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterContentChecked {

  userRoles: any;
  name = "";
  username = "";
  pathname = "";
  items: MenuItem[] = [
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: 'Bookmark',
              icon: 'pi pi-fw pi-bookmark'
            },
            {
              label: 'Video',
              icon: 'pi pi-fw pi-video'
            }
          ]
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash'
        },
        {
          separator: true
        },
        {
          label: 'Export',
          icon: 'pi pi-fw pi-external-link'
        }
      ]
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {
          label: 'Left',
          icon: 'pi pi-fw pi-align-left'
        },
        {
          label: 'Right',
          icon: 'pi pi-fw pi-align-right'
        },
        {
          label: 'Center',
          icon: 'pi pi-fw pi-align-center'
        },
        {
          label: 'Justify',
          icon: 'pi pi-fw pi-align-justify'
        }
      ]
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus'
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-user-minus'
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Filter',
              icon: 'pi pi-fw pi-filter',
              items: [
                {
                  label: 'Print',
                  icon: 'pi pi-fw pi-print'
                }
              ]
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'List'
            }
          ]
        }
      ]
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Save',
              icon: 'pi pi-fw pi-calendar-plus'
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
        },
        {
          label: 'Archieve',
          icon: 'pi pi-fw pi-calendar-times',
          items: [
            {
              label: 'Remove',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
        }
      ]
    }
  ];

  navs = [{
    "navName": "Dashboard",
    "navIcon": "assets/images/dashboard-icon.svg",
    "navURL": "home/dashboard",
    "roles": Constants.PORTAL_STUDENT_DASHBOARD
  }];

  navsExam = [{
    "navName": "Exams & Results",
    "navIcon": "assets/images/exam.png",
    "navURL": "home/exams-results",
    "roles": Constants.PORTAL_STUDENT_EXAM_RESULTS
  }];
  navsAttendanceReport = [{
    "navName": "Attendance Report",
    "navIcon": "assets/images/attendance.png",
    "navURL": "home/attendance-report",
    "roles": Constants.PORTAL_STUDENT_ATTENDANCE_REPORT
  }];

  navsQuarterly = [{
    "navName": "Quarterly Report",
    "navIcon": "assets/images/quarterly.png",
    "navURL": "home/quarterly-report",
    "roles": Constants.PORTAL_STUDENT_QUARTERLY_REPORT
  }];

  navsTimeTable = [{
    "navName": "Time Table",
    "navIcon": "assets/images/timetable.png",
    "navURL": "home/time-table",
    "roles": Constants.PORTAL_STUDENT_TIME_TABLE
  }];

  navsSchoolInformation = [{
    "navName": "School Information",
    "navIcon": "assets/images/school.png",
    "navURL": "home/school-information",
    "roles": Constants.PORTAL_SCHOOL_INFORMATION
  }];

  navsFees = [{
    "navName": "Fees Management",
    "navIcon": "assets/images/fees.png",
    "navURL": "home/fees",
    "roles": Constants.DASHBOARD_ROLES
  }];
  navsExamReport = [{
    "navName": "Exams Report",
    "navIcon": "assets/images/exam.png",
    "navURL": "home/exam-report",
    "roles": Constants.DASHBOARD_ROLES
  }];
  navsStudent = [{
    "navName": "Student",
    "navIcon": "assets/images/student.png",
    "navURL": "home/student",
    "roles": Constants.DASHBOARD_ROLES
  }];
  navsAttendance = [{
    "navName": "Attendance",
    "navIcon": "assets/images/attendance.png",
    "navURL": "home/attendance",
    "roles": Constants.DASHBOARD_ROLES
  }];
  navsClassesSubjects = [{
    "navName": "Classes & Subjects",
    "navIcon": "assets/images/classs.png",
    "navURL": "home/classes-subjects",
    "roles": Constants.DASHBOARD_ROLES
  }];

  portal_configuration_navs = [
    {
      "navName": "Master Type",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/mastertype",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Master",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/masters",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Academic Year",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/years",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Subjects",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/subjects",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Designation",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/designation",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Roles",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/role",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Quarters",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/quarters",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Sections",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/class-sections",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Subject Management",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/subject-management",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Exams",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/exams",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Students",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/student",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Staff",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/staff",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Fee Collection",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/fees",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Hostel Gate Pass",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/gate-pass",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Attendance",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/attendance",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Mark Entry",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/mark-entry",
      "roles": Constants.PORTAL_DESKTOP
    },
    {
      "navName": "Student Fee Entry",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/admin-config/studentfeeentry",
      "roles": Constants.PORTAL_DESKTOP
    },
    // {
    //   "navName": "Reports",
    //   "navIcon": "assets/images/portal-config-icon.svg",
    //   "navURL": "home/admin-config/reports",
    //   "roles": Constants.PORTAL_DESKTOP
    // },
    // {
    //   "navName": "Settings & Users",
    //   "navIcon": "assets/images/portal-config-icon.svg",
    //   "navURL": "home/admin-config/settings-users",
    //   "roles": Constants.PORTAL_DESKTOP
    // },
    // {
    //   "navName": "users & Roles",
    //   "navIcon": "assets/images/portal-config-icon.svg",
    //   "navURL": "home/admin-config/users-roles",
    //   "roles": Constants.PORTAL_DESKTOP
    // },
    // {
    //   "navName": "School Information",
    //   "navIcon": "assets/images/portal-config-icon.svg",
    //   "navURL": "home/admin-config/school-info",
    //   "roles": Constants.PORTAL_DESKTOP
    // },
    // {
    //   "navName": "Fees Plans",
    //   "navIcon": "assets/images/portal-config-icon.svg",
    //   "navURL": "home/admin-config/fees-plans",
    //   "roles": Constants.PORTAL_DESKTOP
    // },
    // {
    //   "navName": "Time Table Creation",
    //   "navIcon": "assets/images/portal-config-icon.svg",
    //   "navURL": "home/admin-config/time-table-creation",
    //   "roles": Constants.PORTAL_DESKTOP
    // }
  ];

  report_configuration_navs = [
    {
      "navName": "Attentence Report",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/report-config/attentence-report",
      "roles": Constants.PORTAL_REPORTS
    },
    {
      "navName": "Quarterly Report",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/report-config/quarterly-report",
      "roles": Constants.PORTAL_REPORTS
    },
    {
      "navName": "Exam Report",
      "navIcon": "assets/images/portal-config-icon.svg",
      "navURL": "home/report-config/exam-report",
      "roles": Constants.PORTAL_REPORTS
    }
  ]
  constructor(private router: Router, private environment: EnvironmentService,
    private authService: AuthService) {
  }

  navigateMenu(url: any) {
    this.router.navigate([url]);
  }

  async ngOnInit() {
    this.userRoles = this.authService.getUserRole();
    // this.username = this.authService.getLogInName() ? this.authService.getLogInName() : "";
    this.username = this.authService.getLogInName() || "";
    this.navs = this.navs.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsExam = this.navsExam.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsAttendanceReport = this.navsAttendanceReport.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsQuarterly = this.navsQuarterly.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsTimeTable = this.navsTimeTable.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsSchoolInformation = this.navsSchoolInformation.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsFees = this.navsFees.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsExamReport = this.navsExamReport.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsStudent = this.navsStudent.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsAttendance = this.navsAttendance.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.navsClassesSubjects = this.navsClassesSubjects.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.portal_configuration_navs = this.portal_configuration_navs.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
    this.report_configuration_navs = this.report_configuration_navs.filter((obj) => (obj.roles == undefined || obj.roles?.some((r: string) => this.userRoles.includes(r))));
  }

  ngAfterContentChecked() {
    this.pathname = window.location.hash;
  }

  async logout() {
    await this.router.navigate(['/login']);
  }
}
