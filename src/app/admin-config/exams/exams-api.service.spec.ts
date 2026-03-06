import { TestBed } from '@angular/core/testing';

import { ExamsApiService } from './exams-api.service';

describe('ExamsApiService', () => {
  let service: ExamsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
