import { TestBed } from '@angular/core/testing';

import { QuarterlyReportApiService } from './quarterly-report-api.service';

describe('QuarterlyReportApiService', () => {
  let service: QuarterlyReportApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuarterlyReportApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
