import { TestBed } from '@angular/core/testing';

import { TimetableCreationApiService } from './timetable-creation-api.service';

describe('TimetableCreationApiService', () => {
  let service: TimetableCreationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetableCreationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
