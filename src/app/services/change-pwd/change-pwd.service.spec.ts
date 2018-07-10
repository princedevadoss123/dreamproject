import { TestBed, inject } from '@angular/core/testing';

import { ChangePwdService } from './change-pwd.service';

describe('ChangePwdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePwdService]
    });
  });

  it('should be created', inject([ChangePwdService], (service: ChangePwdService) => {
    expect(service).toBeTruthy();
  }));
});
