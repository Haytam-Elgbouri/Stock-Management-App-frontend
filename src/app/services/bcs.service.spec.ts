import { TestBed } from '@angular/core/testing';

import { BcsService } from './bcs.service';

describe('BcsService', () => {
  let service: BcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
