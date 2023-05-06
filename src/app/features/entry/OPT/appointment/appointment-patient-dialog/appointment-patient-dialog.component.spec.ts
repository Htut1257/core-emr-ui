import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPatientDialogComponent } from './appointment-patient-dialog.component';

describe('AppointmentPatientDialogComponent', () => {
  let component: AppointmentPatientDialogComponent;
  let fixture: ComponentFixture<AppointmentPatientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentPatientDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
