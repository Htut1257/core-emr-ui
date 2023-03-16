import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutVoucherComponent } from './check-out-voucher.component';

describe('CheckOutVoucherComponent', () => {
  let component: CheckOutVoucherComponent;
  let fixture: ComponentFixture<CheckOutVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
