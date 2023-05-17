import { TestBed } from '@angular/core/testing';

import { OpdVisitDateService } from './opd-visit-date.service';

describe('OpdVisitDateService', () => {
  let service: OpdVisitDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpdVisitDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
