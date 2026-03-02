import { TestBed } from '@angular/core/testing';

import { ExamsResultApiService } from './exams-result-api.service';

describe('ExamsResultApiService', () => {
  let service: ExamsResultApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamsResultApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
