import { TestBed } from '@angular/core/testing';

import { AdminDashboardApiService } from './admin-dashboard-api.service';

describe('AdminDashboardApiService', () => {
  let service: AdminDashboardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDashboardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
