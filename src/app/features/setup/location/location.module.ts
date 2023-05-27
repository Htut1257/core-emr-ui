import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';

import { LocationRoutingModule } from './location-routing.module';
import { LocationContainerComponent } from './location-container/location-container.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationSetupComponent } from './location-setup/location-setup.component';

const components = [
  LocationContainerComponent,
  LocationListComponent,
  LocationSetupComponent
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    LocationRoutingModule
  ],
  exports: [
    components
  ]
})
export class LocationModule { }
