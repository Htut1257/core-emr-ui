import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { RoleRoutingModule } from './role-routing.module';
import { RoleSettingComponent } from './role-setting/role-setting.component';
import { RoleMenuTreeComponent } from './role-menu-tree/role-menu-tree.component';
import { RoleMenuSettingComponent } from './role-menu-setting/role-menu-setting.component';

const components = [
  RoleSettingComponent,
  RoleMenuTreeComponent,
  RoleMenuSettingComponent,
]
@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    RoleRoutingModule
  ],
  exports: [
    components
  ]
})
export class RoleModule { }
