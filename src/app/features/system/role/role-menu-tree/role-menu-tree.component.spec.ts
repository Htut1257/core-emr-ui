import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuTreeComponent } from './role-menu-tree.component';

describe('RoleMenuTreeComponent', () => {
  let component: RoleMenuTreeComponent;
  let fixture: ComponentFixture<RoleMenuTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMenuTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMenuTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
