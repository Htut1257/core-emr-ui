import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XRayListComponent } from './x-ray-list.component';

describe('XRayListComponent', () => {
  let component: XRayListComponent;
  let fixture: ComponentFixture<XRayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XRayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XRayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
