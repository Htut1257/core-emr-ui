import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleSetupComponent } from './doctor-schedule-setup.component';

describe('DoctorScheduleSetupComponent', () => {
  let component: DoctorScheduleSetupComponent;
  let fixture: ComponentFixture<DoctorScheduleSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduleSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorScheduleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
