import { TestBed } from '@angular/core/testing';

import { DepartmentDesignationApiService } from './department-designation-api.service';

describe('DepartmentDesignationApiService', () => {
  let service: DepartmentDesignationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentDesignationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
