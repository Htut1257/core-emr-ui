import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { VitalSignRoutingModule } from './vital-sign-routing.module';
import { VitalSignContainerComponent } from './vital-sign-container/vital-sign-container.component';
import { VitalSignSetupComponent } from './vital-sign-setup/vital-sign-setup.component';
import { VitalSignComponent } from './vital-sign/vital-sign.component';

const components = [
  VitalSignContainerComponent,
  VitalSignSetupComponent,
  VitalSignComponent
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    VitalSignRoutingModule
  ],
  exports: [
    components
  ]
})
export class VitalSignModule { }
