import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityContainerComponent } from './speciality-container.component';

describe('SpecialityContainerComponent', () => {
  let component: SpecialityContainerComponent;
  let fixture: ComponentFixture<SpecialityContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
