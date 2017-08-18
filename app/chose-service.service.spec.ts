import { TestBed, inject } from '@angular/core/testing';

import { ChoseServiceService } from './chose-service.service';

describe('ChoseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoseServiceService]
    });
  });

  it('should be created', inject([ChoseServiceService], (service: ChoseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
