import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdListComponent } from './opd-list.component';

describe('OpdListComponent', () => {
  let component: OpdListComponent;
  let fixture: ComponentFixture<OpdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
