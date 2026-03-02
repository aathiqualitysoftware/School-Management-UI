import { TestBed } from '@angular/core/testing';

import { StudentTimeTableApiService } from './student-time-table-api.service';

describe('StudentTimeTableApiService', () => {
  let service: StudentTimeTableApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentTimeTableApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
