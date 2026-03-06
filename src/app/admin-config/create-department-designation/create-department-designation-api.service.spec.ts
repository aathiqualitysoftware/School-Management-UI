import { TestBed } from '@angular/core/testing';

import { CreateDepartmentDesignationApiService } from './create-department-designation-api.service';

describe('CreateDepartmentDesignationApiService', () => {
  let service: CreateDepartmentDesignationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDepartmentDesignationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
