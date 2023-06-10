import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDialogComponent } from './initial-dialog.component';

describe('InitialDialogComponent', () => {
  let component: InitialDialogComponent;
  let fixture: ComponentFixture<InitialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
