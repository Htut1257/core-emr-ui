import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { AppointmentRegistrationComponent } from './appointment-registration/appointment-registration.component';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { AppointmentComponent } from './appointment/appointment.component';

const components=[
  AppointmentComponent,
  AppointmentRegistrationComponent,
  AppointmentHistoryComponent
]
@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    AppointmentRoutingModule
  ],
  exports:[
    components
  ]
})
export class AppointmentModule { }
