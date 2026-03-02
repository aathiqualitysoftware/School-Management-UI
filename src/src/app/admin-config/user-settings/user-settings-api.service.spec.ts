import { TestBed } from '@angular/core/testing';

import { UserSettingsApiService } from './user-settings-api.service';

describe('UserSettingsApiService', () => {
  let service: UserSettingsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSettingsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
