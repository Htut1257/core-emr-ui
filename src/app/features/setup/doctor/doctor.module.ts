import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorContainerComponent } from './doctor-container/doctor-container.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorSetupComponent } from './doctor-setup/doctor-setup.component';

const components = [
  DoctorContainerComponent,
  DoctorListComponent,
  DoctorSetupComponent
]
@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    DoctorRoutingModule
  ],
  exports: [
    components
  ]
})
export class DoctorModule { }
