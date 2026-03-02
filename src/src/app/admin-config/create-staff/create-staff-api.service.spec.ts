import { TestBed } from '@angular/core/testing';

import { CreateStaffApiService } from './create-staff-api.service';

describe('CreateStaffApiService', () => {
  let service: CreateStaffApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateStaffApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
