import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialRoutingModule } from './initial-routing.module';
import { InitialContainerComponent } from './initial-container/initial-container.component';
import { InitialListComponent } from './initial-list/initial-list.component';
import { InitialSetupComponent } from './initial-setup/initial-setup.component';

const components = [
  InitialContainerComponent,
  InitialListComponent,
  InitialSetupComponent
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    InitialRoutingModule
  ],
  exports: [
    components
  ]
})
export class InitialModule { }
