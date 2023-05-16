import { TestBed } from '@angular/core/testing';

import { CfFeeService } from './cf-fee.service';

describe('CfFeeService', () => {
  let service: CfFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
