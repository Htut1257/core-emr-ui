import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationSetupComponent } from './registration-setup/registration-setup.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppointmentModule } from '../entry/OPT/appointment/appointment.module';
const components=[
  RegistrationSetupComponent,
  RegistrationListComponent,
  RegistrationComponent,
]
@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    RegistrationRoutingModule,
    AppointmentModule
  ],
  exports:[
    components
  ]
})
export class RegistrationModule { }
