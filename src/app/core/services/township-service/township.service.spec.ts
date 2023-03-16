import { TestBed } from '@angular/core/testing';

import { TownshipService } from './township.service';

describe('TownshipService', () => {
  let service: TownshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TownshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
