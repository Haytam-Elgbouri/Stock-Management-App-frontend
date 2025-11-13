import { TestBed } from '@angular/core/testing';

import { BlsService } from './bls.service';

describe('BlsService', () => {
  let service: BlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
