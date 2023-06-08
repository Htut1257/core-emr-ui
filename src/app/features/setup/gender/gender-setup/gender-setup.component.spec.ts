import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderSetupComponent } from './gender-setup.component';

describe('GenderSetupComponent', () => {
  let component: GenderSetupComponent;
  let fixture: ComponentFixture<GenderSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
