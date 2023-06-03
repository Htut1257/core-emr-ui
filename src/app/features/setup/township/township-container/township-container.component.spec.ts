import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownshipContainerComponent } from './township-container.component';

describe('TownshipContainerComponent', () => {
  let component: TownshipContainerComponent;
  let fixture: ComponentFixture<TownshipContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownshipContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TownshipContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
