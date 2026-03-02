import { TestBed } from '@angular/core/testing';

import { ClassSectionApiService } from './class-section-api.service';

describe('ClassSectionApiService', () => {
  let service: ClassSectionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassSectionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
