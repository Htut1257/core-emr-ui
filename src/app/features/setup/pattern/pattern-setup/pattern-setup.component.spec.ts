import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternSetupComponent } from './pattern-setup.component';

describe('PatternSetupComponent', () => {
  let component: PatternSetupComponent;
  let fixture: ComponentFixture<PatternSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
