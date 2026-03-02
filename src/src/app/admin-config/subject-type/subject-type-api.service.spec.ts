import { TestBed } from '@angular/core/testing';

import { SubjectTypeApiService } from './subject-type-api.service';

describe('SubjectTypeApiService', () => {
  let service: SubjectTypeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectTypeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
