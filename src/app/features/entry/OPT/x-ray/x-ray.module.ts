import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XRayRoutingModule } from './x-ray-routing.module';
import { XRayListComponent } from './x-ray-list/x-ray-list.component';
import { XRayDetailComponent } from './x-ray-detail/x-ray-detail.component';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';

const components=[
  XRayListComponent,
  XRayDetailComponent
]
@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    CommonModulesModule,
    XRayRoutingModule
  ],
  exports:[components]
})
export class XRayModule { }
