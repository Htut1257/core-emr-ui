import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdSetupComponent } from './opd-setup.component';

describe('OpdSetupComponent', () => {
  let component: OpdSetupComponent;
  let fixture: ComponentFixture<OpdSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
