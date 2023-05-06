import { TestBed } from '@angular/core/testing';

import { DoctorEntryService } from './doctor-entry.service';

describe('DoctorEntryService', () => {
  let service: DoctorEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
