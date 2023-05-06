import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdGroupComponent } from './opd-group.component';

describe('OpdGroupComponent', () => {
  let component: OpdGroupComponent;
  let fixture: ComponentFixture<OpdGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
