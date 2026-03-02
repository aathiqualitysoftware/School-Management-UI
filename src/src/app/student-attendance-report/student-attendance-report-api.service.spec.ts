import { TestBed } from '@angular/core/testing';

import { StudentAttendanceReportApiService } from './student-attendance-report-api.service';

describe('StudentAttendanceReportApiService', () => {
  let service: StudentAttendanceReportApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAttendanceReportApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
