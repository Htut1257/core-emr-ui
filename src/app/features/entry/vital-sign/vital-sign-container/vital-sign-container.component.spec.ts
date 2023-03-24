import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignContainerComponent } from './vital-sign-container.component';

describe('VitalSignContainerComponent', () => {
  let component: VitalSignContainerComponent;
  let fixture: ComponentFixture<VitalSignContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalSignContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalSignContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
