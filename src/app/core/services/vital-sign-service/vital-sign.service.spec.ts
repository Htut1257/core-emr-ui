import { TestBed } from '@angular/core/testing';

import { VitalSignService } from './vital-sign.service';

describe('VitalSignService', () => {
  let service: VitalSignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalSignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
