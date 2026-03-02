import { TestBed } from '@angular/core/testing';

import { QuatersExamTypeApiService } from './quaters-exam-type-api.service';

describe('QuatersExamTypeApiService', () => {
  let service: QuatersExamTypeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuatersExamTypeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
