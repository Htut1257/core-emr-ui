import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { LabListComponent } from './lab-list/lab-list.component';
import { LabDetailComponent } from './lab-detail/lab-detail.component';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';

const components=[
  LabListComponent,
  LabDetailComponent
]
@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    CommonModulesModule,
    LabRoutingModule
  ],exports:[
    components
  ]
})
export class LabModule { }
