import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupSetupComponent } from './customer-group-setup.component';

describe('CustomerGroupSetupComponent', () => {
  let component: CustomerGroupSetupComponent;
  let fixture: ComponentFixture<CustomerGroupSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerGroupSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
