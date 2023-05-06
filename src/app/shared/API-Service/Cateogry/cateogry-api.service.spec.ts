import { TestBed } from '@angular/core/testing';

import { CateogryApiService } from './cateogry-api.service';

describe('CateogryApiService', () => {
  let service: CateogryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CateogryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
