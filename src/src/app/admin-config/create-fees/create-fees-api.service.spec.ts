import { TestBed } from '@angular/core/testing';

import { CreateFeesApiService } from './create-fees-api.service';

describe('CreateFeesApiService', () => {
  let service: CreateFeesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateFeesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
