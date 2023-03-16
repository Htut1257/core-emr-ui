import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationSetupComponent } from './registration-setup/registration-setup.component';

const routes: Routes = [
  {path:'',component:RegistrationComponent},
  { path: 'registration-setup', component: RegistrationSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
