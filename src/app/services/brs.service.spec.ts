import { TestBed } from '@angular/core/testing';

import { BrsService } from './brs.service';

describe('BrsService', () => {
  let service: BrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
