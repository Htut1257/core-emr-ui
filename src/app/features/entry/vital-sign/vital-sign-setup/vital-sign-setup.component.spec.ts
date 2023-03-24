import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignSetupComponent } from './vital-sign-setup.component';

describe('VitalSignSetupComponent', () => {
  let component: VitalSignSetupComponent;
  let fixture: ComponentFixture<VitalSignSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalSignSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalSignSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
