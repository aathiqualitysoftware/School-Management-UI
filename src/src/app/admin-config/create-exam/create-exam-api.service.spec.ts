import { TestBed } from '@angular/core/testing';

import { CreateExamApiService } from './create-exam-api.service';

describe('CreateExamApiService', () => {
  let service: CreateExamApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateExamApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
