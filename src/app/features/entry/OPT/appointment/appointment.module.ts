import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { AppointmentRegistrationComponent } from './appointment-registration/appointment-registration.component';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentSearchDialogComponent } from './appointment-search-dialog/appointment-search-dialog.component';
import { AppointmentPatientDialogComponent } from './appointment-patient-dialog/appointment-patient-dialog.component';

const components=[
  AppointmentComponent,
  AppointmentRegistrationComponent,
  AppointmentHistoryComponent
]
@NgModule({
  declarations: [
    components,
    AppointmentSearchDialogComponent,
    AppointmentPatientDialogComponent,
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
