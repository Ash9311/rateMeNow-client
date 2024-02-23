import { TestBed } from '@angular/core/testing';

import { RateMeNowService } from './rate-me-now.service';

describe('RateMeNowService', () => {
  let service: RateMeNowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateMeNowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
