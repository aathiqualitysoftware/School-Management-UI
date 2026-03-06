import { TestBed } from '@angular/core/testing';

import { CreateAttendanceApiService } from './create-attendance-api.service';

describe('CreateAttendanceApiService', () => {
  let service: CreateAttendanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAttendanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
