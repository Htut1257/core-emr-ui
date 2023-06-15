import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupContainerComponent } from './customer-group-container.component';

describe('CustomerGroupContainerComponent', () => {
  let component: CustomerGroupContainerComponent;
  let fixture: ComponentFixture<CustomerGroupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerGroupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
