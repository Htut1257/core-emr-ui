import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { DoctorScheduleRoutingModule } from './doctor-schedule-routing.module';
import { DoctorScheduleSetupComponent } from './doctor-schedule-setup/doctor-schedule-setup.component';
import { DoctorModule } from "../../doctor/doctor.module";

const components = [
  DoctorScheduleSetupComponent
]
@NgModule({
  declarations: [
    components
  ],
  exports: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    DoctorScheduleRoutingModule,
    DoctorModule
  ]
})
export class DoctorScheduleModule { }
