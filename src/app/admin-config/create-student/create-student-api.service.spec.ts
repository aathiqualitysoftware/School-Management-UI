import { TestBed } from '@angular/core/testing';

import { CreateStudentApiService } from './create-student-api.service';

describe('CreateStudentApiService', () => {
  let service: CreateStudentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateStudentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
