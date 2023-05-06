import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { OpdGroupRoutingModule } from './opd-group-routing.module';
import { OpdGroupSetupComponent } from './opd-group-setup/opd-group-setup.component';
import { OpdGroupListComponent } from './opd-group-list/opd-group-list.component';
import { OpdGroupComponent } from './opd-group/opd-group.component';

const components = [
  OpdGroupSetupComponent,
  OpdGroupListComponent,
  OpdGroupComponent
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    OpdGroupRoutingModule,
  ],
  exports: [
    components
  ]
})
export class OpdGroupModule { }
