import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OPTRoutingModule } from './opt-routing.module';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';

import { DocEntryComponent } from './doc-entry/doc-entry.component';
import { NurseEntryComponent } from './nurse-entry/nurse-entry.component';
import { DoctorStatusViewComponent } from './doctor-status-view/doctor-status-view.component';
import { DoctorStatusModalComponent } from './doctor-status-modal/doctor-status-modal.component';
const components=[
  DocEntryComponent,
  NurseEntryComponent,
]
@NgModule({
  declarations: [components, DoctorStatusViewComponent, DoctorStatusModalComponent] ,
  imports: [
    CommonModule,
    CommonModulesModule,
    OPTRoutingModule
  ],
  exports:[
    components
  ]
})
export class OPTModule { }
