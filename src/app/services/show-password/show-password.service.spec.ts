import { TestBed, inject } from '@angular/core/testing';

import { ShowPasswordService } from './show-password.service';

describe('ShowPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowPasswordService]
    });
  });

  it('should be created', inject([ShowPasswordService], (service: ShowPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
