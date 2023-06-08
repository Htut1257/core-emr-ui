import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialContainerComponent } from './initial-container/initial-container.component';
import { InitialListComponent } from './initial-list/initial-list.component';
import { InitialSetupComponent } from './initial-setup/initial-setup.component';

const routes: Routes = [
  { path: '', component: InitialContainerComponent },
  { path: 'initial-list', component: InitialListComponent },
  { path: 'initial-setup', component: InitialSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialRoutingModule { }
