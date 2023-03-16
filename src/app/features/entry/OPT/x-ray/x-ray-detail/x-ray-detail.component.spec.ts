import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XRayDetailComponent } from './x-ray-detail.component';

describe('XRayDetailComponent', () => {
  let component: XRayDetailComponent;
  let fixture: ComponentFixture<XRayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XRayDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XRayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
