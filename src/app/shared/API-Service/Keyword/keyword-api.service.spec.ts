import { TestBed } from '@angular/core/testing';

import { KeywordApiService } from './keyword-api.service';

describe('KeywordApiService', () => {
  let service: KeywordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeywordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
