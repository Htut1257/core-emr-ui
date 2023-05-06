import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdGroupListComponent } from './opd-group-list.component';

describe('OpdGroupListComponent', () => {
  let component: OpdGroupListComponent;
  let fixture: ComponentFixture<OpdGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdGroupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
