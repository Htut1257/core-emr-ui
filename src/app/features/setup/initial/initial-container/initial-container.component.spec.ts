import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialContainerComponent } from './initial-container.component';

describe('InitialContainerComponent', () => {
  let component: InitialContainerComponent;
  let fixture: ComponentFixture<InitialContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
