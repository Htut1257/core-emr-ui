import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VitalSignComponent } from './vital-sign/vital-sign.component';
import { VitalSignSetupComponent } from './vital-sign-setup/vital-sign-setup.component';
import { VitalSignContainerComponent } from './vital-sign-container/vital-sign-container.component';

const routes: Routes = [
  {path:'',component:VitalSignContainerComponent},
  {path:'vital-sign-setup',component:VitalSignSetupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VitalSignRoutingModule { }
