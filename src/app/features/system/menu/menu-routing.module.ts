import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuSetupComponent } from './menu-setup/menu-setup.component';
import { MenuListComponent } from './menu-list/menu-list.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'meu-list', component: MenuListComponent },
  { path: 'menu-setup', component: MenuSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
