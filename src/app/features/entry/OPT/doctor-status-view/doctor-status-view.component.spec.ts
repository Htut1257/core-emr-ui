import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStatusViewComponent } from './doctor-status-view.component';

describe('DoctorStatusViewComponent', () => {
  let component: DoctorStatusViewComponent;
  let fixture: ComponentFixture<DoctorStatusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStatusViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
