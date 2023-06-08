import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialityRoutingModule } from './speciality-routing.module';
import { SpecialityContainerComponent } from './speciality-container/speciality-container.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { SpecialitySetupComponent } from './speciality-setup/speciality-setup.component';

const components = [
  SpecialityContainerComponent,
  SpecialityListComponent,
  SpecialitySetupComponent
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    SpecialityRoutingModule
  ],
  exports: [
    components
  ]
})
export class SpecialityModule { }
