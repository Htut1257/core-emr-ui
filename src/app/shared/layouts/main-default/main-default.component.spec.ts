import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDefaultComponent } from './main-default.component';

describe('MainDefaultComponent', () => {
  let component: MainDefaultComponent;
  let fixture: ComponentFixture<MainDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
