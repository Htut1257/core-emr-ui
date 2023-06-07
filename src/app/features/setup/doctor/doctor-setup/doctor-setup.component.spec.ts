import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSetupComponent } from './doctor-setup.component';

describe('DoctorSetupComponent', () => {
  let component: DoctorSetupComponent;
  let fixture: ComponentFixture<DoctorSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
