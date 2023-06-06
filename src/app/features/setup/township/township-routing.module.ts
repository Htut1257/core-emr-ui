import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TownshipContainerComponent } from './township-container/township-container.component';
import { TownshipListComponent } from './township-list/township-list.component';
import { TownshipSetupComponent } from './township-setup/township-setup.component';

const routes: Routes = [
  { path: '', component: TownshipContainerComponent },
  { path: 'township-list', component: TownshipListComponent },
  { path: 'township-setup', component: TownshipSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TownshipRoutingModule { }
