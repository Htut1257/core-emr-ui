import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentRegistrationComponent } from './appointment-registration/appointment-registration.component';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { AppointmentComponent } from './appointment/appointment.component';
const routes: Routes = [
  { path: '', component: AppointmentComponent },
  { path: 'appointment-history', component: AppointmentHistoryComponent },
  { path: 'appointment-registration', component: AppointmentRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
