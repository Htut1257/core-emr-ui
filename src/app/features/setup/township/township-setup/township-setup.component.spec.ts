import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownshipSetupComponent } from './township-setup.component';

describe('TownshipSetupComponent', () => {
  let component: TownshipSetupComponent;
  let fixture: ComponentFixture<TownshipSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownshipSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TownshipSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
