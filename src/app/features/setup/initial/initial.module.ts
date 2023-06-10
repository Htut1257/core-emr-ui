import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { InitialRoutingModule } from './initial-routing.module';
import { InitialContainerComponent } from './initial-container/initial-container.component';
import { InitialListComponent } from './initial-list/initial-list.component';
import { InitialSetupComponent } from './initial-setup/initial-setup.component';
import { InitialDialogComponent } from './initial-dialog/initial-dialog.component';

const components = [
  InitialContainerComponent,
  InitialListComponent,
  InitialSetupComponent,
  InitialDialogComponent
]
@NgModule({
  declarations: [
    components,
    
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    InitialRoutingModule
  ],
  exports: [
    components
  ]
})
export class InitialModule { }
