import { TestBed } from '@angular/core/testing';

import { FeesPlanApiService } from './fees-plan-api.service';

describe('FeesPlanApiService', () => {
  let service: FeesPlanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesPlanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
