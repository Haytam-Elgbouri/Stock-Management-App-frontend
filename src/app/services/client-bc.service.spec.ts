import { TestBed } from '@angular/core/testing';

import { ClientBcService } from './client-bc.service';

describe('ClientBcService', () => {
  let service: ClientBcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientBcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
