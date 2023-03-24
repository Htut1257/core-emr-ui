import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OPTRoutingModule } from './opt-routing.module';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';

import { DocEntryComponent } from './doc-entry/doc-entry.component';
import { NurseEntryComponent } from './nurse-entry/nurse-entry.component';
import { DoctorStatusViewComponent } from './doctor-status-view/doctor-status-view.component';
import { DoctorStatusModalComponent } from './doctor-status-modal/doctor-status-modal.component';

//import { AutocompleteCell } from 'src/app/shared/cell-renderer/autocomplete-cell';
import { AgGridModule } from 'ag-grid-angular';
const components = [
  DocEntryComponent,
  NurseEntryComponent,
  DoctorStatusViewComponent,
  DoctorStatusModalComponent
]
@NgModule({
  declarations: [
    components,
   // AutocompleteCell
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    OPTRoutingModule
  ],
  exports: [
    components
  ]
})
export class OPTModule { }
