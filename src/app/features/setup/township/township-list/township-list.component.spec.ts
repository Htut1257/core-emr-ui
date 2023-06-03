import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownshipListComponent } from './township-list.component';

describe('TownshipListComponent', () => {
  let component: TownshipListComponent;
  let fixture: ComponentFixture<TownshipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownshipListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TownshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
