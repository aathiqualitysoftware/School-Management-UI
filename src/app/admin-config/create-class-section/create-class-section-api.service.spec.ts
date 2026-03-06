import { TestBed } from '@angular/core/testing';

import { CreateClassSectionApiService } from './create-class-section-api.service';

describe('CreateClassSectionApiService', () => {
  let service: CreateClassSectionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateClassSectionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
