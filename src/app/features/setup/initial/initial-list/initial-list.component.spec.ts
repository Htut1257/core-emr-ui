import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialListComponent } from './initial-list.component';

describe('InitialListComponent', () => {
  let component: InitialListComponent;
  let fixture: ComponentFixture<InitialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
