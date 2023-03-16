import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuSettingComponent } from './role-menu-setting.component';

describe('RoleMenuSettingComponent', () => {
  let component: RoleMenuSettingComponent;
  let fixture: ComponentFixture<RoleMenuSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMenuSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMenuSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
