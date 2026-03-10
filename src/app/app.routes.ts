import { Routes } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard'; // changed import
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Constants } from './util/constants';
import { LogInComponent } from './log-in/log-in.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { StudentTimeTableComponent } from './student-time-table/student-time-table.component';
import { ExamsResultComponent } from './exams-result/exams-result.component';
import { StudentAttendanceReportComponent } from './student-attendance-report/student-attendance-report.component';
import { QuarterlyReportComponent } from './quarterly-report/quarterly-report.component';
import { SchoolInfoComponent } from './school-info/school-info.component';
import { StudentComponent } from './admin-config/student/student.component';
import { StaffComponent } from './admin-config/staff/staff.component';
import { SubjectsComponent } from './admin-config/subjects/subjects.component';
import { FeesComponent } from './admin-config/fees/fees.component';
import { ExamsComponent } from './admin-config/exams/exams.component';
import { AttendanceComponent } from './admin-config/attendance/attendance.component';
import { ReportComponent } from './admin-config/report/report.component';
import { UserComponent } from './admin-config/user/user.component';
import { ClassSectionComponent } from './admin-config/class-section/class-section.component';
import { FeesPlanComponent } from './admin-config/fees-plan/fees-plan.component';
import { DepartmnetDesignationComponent } from './admin-config/departmnet-designation/departmnet-designation.component';
import { SubjectTypeComponent } from './admin-config/subject-type/subject-type.component';
import { QuatersExamTypeComponent } from './admin-config/quaters-exam-type/quaters-exam-type.component';
import { TimetableCreationComponent } from './admin-config/timetable-creation/timetable-creation.component';
import { UserSettingsComponent } from './admin-config/user-settings/user-settings.component';
import { AdminDashboardComponent } from './admin-config/admin-dashboard/admin-dashboard.component';
import { CreateStudentComponent } from './admin-config/create-student/create-student.component';
import { CreateStaffComponent } from './admin-config/create-staff/create-staff.component';
import { CreateExamComponent } from './admin-config/create-exam/create-exam.component';
import { CreateSubjectComponent } from './admin-config/create-subject/create-subject.component';
import { CreateDesignationComponent } from './admin-config/create-designation/create-designation.component';
import { DesignationComponent } from './admin-config/designation/designation.component';
import { CreateRoleComponent } from './admin-config/create-role/create-role.component';
import { RoleComponent } from './admin-config/role/role.component';
import { CreateQuartersComponent } from './admin-config/create-quarters/create-quarters.component';
import { QuartersComponent } from './admin-config/quarters/quarters.component';
import { CreateClassSectionComponent } from './admin-config/create-class-section/create-class-section.component';
import { CreateSubjectManagementComponent } from './admin-config/create-subject-management/create-subject-management.component';
import { SubjectManagementComponent } from './admin-config/subject-management/subject-management.component';
import { CreateMasterTypeComponent } from './admin-config/create-master-type/create-master-type.component';
import { MasterTypeComponent } from './admin-config/master-type/master-type.component';
import { MasterentryComponent } from './admin-config/masterentry/masterentry.component';
import { MasterviewComponent } from './admin-config/masterview/masterview.component';
import { TransactionHistoryComponent } from './admin-config/transaction-history/transaction-history.component';
import { CreateAttendanceComponent } from './admin-config/create-attendance/create-attendance.component';
import { CreateAcademicYearComponent } from './admin-config/create-academic-year/create-academic-year.component';
import { AcademicYearComponent } from './admin-config/academic-year/academic-year.component';
import { CreateStudentFeeEntryComponent } from './admin-config/create-student-fee-entry/create-student-fee-entry.component';
import { StudentFeeEntryComponent } from './admin-config/student-fee-entry/student-fee-entry.component';
import { FeeCollectionComponent } from './admin-config/fee-collection/fee-collection.component';
import { CreateFeeCollectionComponent } from './admin-config/create-fee-collection/create-fee-collection.component';
import { MarkEntryComponent } from './admin-config/mark-entry/mark-entry.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // show login first
  // {
  //   path: 'dashboard-login',
  //   component: DashboardLogInComponent
  //   // No guards here
  // },
  {
    path: 'login',
    component: LogInComponent
    // No guards here
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: Constants.PORTAL_STUDENT_DASHBOARD
    },
    children: [
      {
        path: 'dashboard',
        component: MainDashboardComponent,
        canActivate: [RoleGuard], // changed
        data: {
          expectedRoles: Constants.PORTAL_STUDENT_DASHBOARD
        }
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_ADMIN
        }
      },

      {
        path: 'time-table',
        component: StudentTimeTableComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_STUDENT_TIME_TABLE
        }
      },
      {
        path: 'exams-results',
        component: ExamsResultComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_STUDENT_EXAM_RESULTS
        }
      },
      {
        path: 'attendance-report',
        component: StudentAttendanceReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_STUDENT_ATTENDANCE_REPORT
        }
      },
      {
        path: 'quarterly-report',
        component: QuarterlyReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_STUDENT_QUARTERLY_REPORT
        }
      },
      {
        path: 'school-information',
        component: SchoolInfoComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_SCHOOL_INFORMATION
        }
      },
      // Desktop route can be added here
      {
        path: 'admin-config/student',
        component: StudentComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/create-student',
        component: CreateStudentComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/staff',
        component: StaffComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/staff/create-staff',
        component: CreateStaffComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/quarters',
        component: QuartersComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/quarters/create-quarter',
        component: CreateQuartersComponent,
        canActivate: [RoleGuard],
        data: {
          "view": Constants.PORTAL_DESKTOP,
          "edit": Constants.PORTAL_DESKTOP,
          "save": Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/subjects',
        component: SubjectsComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/create-subject',
        component: CreateSubjectComponent,
        canActivate: [RoleGuard],
        data: {
          "view": Constants.PORTAL_DESKTOP,
          "edit": Constants.PORTAL_DESKTOP,
          "save": Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/designation',
        component: DesignationComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },

      {
        path: 'admin-config/designation/create-designation',
        component: CreateDesignationComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: {
            "view": Constants.PORTAL_DESKTOP,
            "edit": Constants.PORTAL_DESKTOP,
            "save": Constants.PORTAL_DESKTOP
          }
        }
      },
      {
        path: 'admin-config/fees',
        component: FeeCollectionComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/mark-entry',
        component: MarkEntryComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/fees/create-fee-collection',
        component: CreateFeeCollectionComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: {
            "view": Constants.PORTAL_DESKTOP,
            "edit": Constants.PORTAL_DESKTOP,
            "save": Constants.PORTAL_DESKTOP
          }
        }
      },
      {
        path: 'admin-config/fees/transaction-history',
        component: TransactionHistoryComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP,
        }
      },
      {
        path: 'admin-config/exams',
        component: ExamsComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },

      {
        path: 'admin-config/exams/create-exam',
        component: CreateExamComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: {
            "view": Constants.PORTAL_DESKTOP,
            "edit": Constants.PORTAL_DESKTOP,
            "save": Constants.PORTAL_DESKTOP
          }
        }
      },
      {
        path: 'admin-config/years',
        component: AcademicYearComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/years/create-year',
        component: CreateAcademicYearComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: {
            "view": Constants.PORTAL_DESKTOP,
            "edit": Constants.PORTAL_DESKTOP,
            "save": Constants.PORTAL_DESKTOP
          }
        }
      },
      {
        path: 'admin-config/studentfeeentry',
        component: StudentFeeEntryComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/studentfeeentry/create-studentfeeentry',
        component: CreateStudentFeeEntryComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: {
            "view": Constants.PORTAL_DESKTOP,
            "edit": Constants.PORTAL_DESKTOP,
            "save": Constants.PORTAL_DESKTOP
          }
        }
      },
      {
        path: 'admin-config/attendance',
        component: CreateAttendanceComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/report',
        component: ReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },

      {
        path: 'admin-config/users',
        component: UserComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/user-settings',
        component: UserSettingsComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/school-info',
        component: SchoolInfoComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/masters',
        component: MasterviewComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },

      {
        path: 'admin-config/masters/create-master',
        component: MasterentryComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: {
            "view": Constants.PORTAL_DESKTOP,
            "edit": Constants.PORTAL_DESKTOP,
            "save": Constants.PORTAL_DESKTOP
          }
        }
      },
      {
        path: 'admin-config/mastertype',
        component: MasterTypeComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },

      {
        path: 'admin-config/mastertype/create-master-types',
        component: CreateMasterTypeComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: {
            "view": Constants.PORTAL_DESKTOP,
            "edit": Constants.PORTAL_DESKTOP,
            "save": Constants.PORTAL_DESKTOP
          }
        }
      },
      {
        path: 'admin-config/subject-management',
        component: SubjectManagementComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/create-subject-management',
        component: CreateSubjectManagementComponent,
        canActivate: [RoleGuard],
        data: {
          "view": Constants.PORTAL_DESKTOP,
          "edit": Constants.PORTAL_DESKTOP,
          "save": Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/class-sections',
        component: ClassSectionComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/class-sections/create-section',
        component: CreateClassSectionComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: {
            "view": Constants.PORTAL_DESKTOP,
            "edit": Constants.PORTAL_DESKTOP,
            "save": Constants.PORTAL_DESKTOP
          }
        }
      },
      {
        path: 'admin-config/fees-plan',
        component: FeesPlanComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/departments-designations',
        component: DepartmnetDesignationComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/subjects-types',
        component: SubjectTypeComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/role',
        component: RoleComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },

      {
        path: 'admin-config/role/create-role',
        component: CreateRoleComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: {
            "view": Constants.PORTAL_DESKTOP,
            "edit": Constants.PORTAL_DESKTOP,
            "save": Constants.PORTAL_DESKTOP
          }
        }
      },
      {
        path: 'admin-config/quaters-exam-type',
        component: QuatersExamTypeComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },
      {
        path: 'admin-config/timetable-creation',
        component: TimetableCreationComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRoles: Constants.PORTAL_DESKTOP
        }
      },

    ]
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];
