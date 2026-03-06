import { TestBed } from '@angular/core/testing';

import { SchoolInfoApiService } from './school-info-api.service';

describe('SchoolInfoApiService', () => {
  let service: SchoolInfoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolInfoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
