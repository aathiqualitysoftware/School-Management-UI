import { TestBed } from '@angular/core/testing';

import { MainDashboardApiService } from './main-dashboard-api.service';

describe('MainDashboardApiService', () => {
  let service: MainDashboardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainDashboardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
