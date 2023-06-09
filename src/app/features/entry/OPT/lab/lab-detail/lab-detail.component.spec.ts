import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabDetailComponent } from './lab-detail.component';

describe('LabDetailComponent', () => {
  let component: LabDetailComponent;
  let fixture: ComponentFixture<LabDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
