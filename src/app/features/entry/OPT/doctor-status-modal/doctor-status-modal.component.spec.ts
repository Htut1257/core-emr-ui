import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStatusModalComponent } from './doctor-status-modal.component';

describe('DoctorStatusModalComponent', () => {
  let component: DoctorStatusModalComponent;
  let fixture: ComponentFixture<DoctorStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStatusModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
