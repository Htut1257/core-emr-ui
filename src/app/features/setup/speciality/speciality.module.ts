import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';

import { SpecialityRoutingModule } from './speciality-routing.module';
import { SpecialityContainerComponent } from './speciality-container/speciality-container.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { SpecialitySetupComponent } from './speciality-setup/speciality-setup.component';
import { SpecialityDialogComponent } from './speciality-dialog/speciality-dialog.component';

const components = [
  SpecialityContainerComponent,
  SpecialityListComponent,
  SpecialitySetupComponent,
  SpecialityDialogComponent
]
@NgModule({
  declarations: [
    components,

  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    SpecialityRoutingModule
  ],
  exports: [
    components
  ]
})
export class SpecialityModule { }
