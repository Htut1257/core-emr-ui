import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { GenderRoutingModule } from './gender-routing.module';
import { GenderContainerComponent } from './gender-container/gender-container.component';
import { GenderListComponent } from './gender-list/gender-list.component';
import { GenderSetupComponent } from './gender-setup/gender-setup.component';
import { GenderDialogComponent } from './gender-dialog/gender-dialog.component';

const components = [
  GenderContainerComponent,
  GenderListComponent,
  GenderSetupComponent,
  GenderDialogComponent
]
@NgModule({
  declarations: [
    components,

  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    GenderRoutingModule
  ],
  exports: [
    components
  ]
})
export class GenderModule { }
