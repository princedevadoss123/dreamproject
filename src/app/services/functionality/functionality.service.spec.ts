import { TestBed, inject } from '@angular/core/testing';

import { FunctionalityService } from './functionality.service';

describe('FunctionalityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionalityService]
    });
  });

  it('should be created', inject([FunctionalityService], (service: FunctionalityService) => {
    expect(service).toBeTruthy();
  }));
});
