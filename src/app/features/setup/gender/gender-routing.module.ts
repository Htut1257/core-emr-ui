import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenderContainerComponent } from './gender-container/gender-container.component';
import { GenderListComponent } from './gender-list/gender-list.component';
import { GenderSetupComponent } from './gender-setup/gender-setup.component';

const routes: Routes = [
  { path: '', component: GenderContainerComponent },
  { path: 'gender-list', component: GenderListComponent },
  { path: 'gender-setup', component: GenderSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenderRoutingModule { }
