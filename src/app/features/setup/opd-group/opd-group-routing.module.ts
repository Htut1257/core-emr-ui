import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdGroupComponent } from './opd-group/opd-group.component';
import { OpdGroupSetupComponent } from './opd-group-setup/opd-group-setup.component';
import { OpdGroupListComponent } from './opd-group-list/opd-group-list.component';

const routes: Routes = [
  { path: '', component: OpdGroupComponent },
  { path: 'opd-goup-list', component: OpdGroupListComponent },
  { path: 'opd-group-setup', component: OpdGroupSetupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdGroupRoutingModule { }
