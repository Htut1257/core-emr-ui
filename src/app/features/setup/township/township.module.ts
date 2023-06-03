import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TownshipRoutingModule } from './township-routing.module';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { TownshipContainerComponent } from './township-container/township-container.component';
import { TownshipListComponent } from './township-list/township-list.component';
import { TownshipSetupComponent } from './township-setup/township-setup.component';
const components = [
  TownshipContainerComponent,
  TownshipListComponent,
  TownshipSetupComponent
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    TownshipRoutingModule,
  ],
  exports: [
    components
  ]
})
export class TownshipModule { }
