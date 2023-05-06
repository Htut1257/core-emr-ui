import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdGroupSetupComponent } from './opd-group-setup.component';

describe('OpdGroupSetupComponent', () => {
  let component: OpdGroupSetupComponent;
  let fixture: ComponentFixture<OpdGroupSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdGroupSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdGroupSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
