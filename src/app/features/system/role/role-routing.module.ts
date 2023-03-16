import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleSettingComponent } from './role-setting/role-setting.component';
import { RoleMenuTreeComponent } from './role-menu-tree/role-menu-tree.component';
import { RoleMenuSettingComponent } from './role-menu-setting/role-menu-setting.component';
const routes: Routes = [
  {path:'',component:RoleSettingComponent},
  {path:'role-menu-setting',component:RoleMenuSettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
