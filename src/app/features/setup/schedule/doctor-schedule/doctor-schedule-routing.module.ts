import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorScheduleSetupComponent } from './doctor-schedule-setup/doctor-schedule-setup.component';

const routes: Routes = [
  { path: 'doctor-schedule', component: DoctorScheduleSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorScheduleRoutingModule { }
