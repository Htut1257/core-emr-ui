import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseEntryComponent } from './nurse-entry.component';

describe('NurseEntryComponent', () => {
  let component: NurseEntryComponent;
  let fixture: ComponentFixture<NurseEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
