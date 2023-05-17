import { TestBed } from '@angular/core/testing';

import { FalehAuthService } from './faleh-auth.service';

describe('FalehAuthService', () => {
  let service: FalehAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FalehAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
