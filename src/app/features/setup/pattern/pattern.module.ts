import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { PatternRoutingModule } from './pattern-routing.module';
import { PatternComponent } from './pattern/pattern.component';
import { PatternListComponent } from './pattern-list/pattern-list.component';
import { PatternSetupComponent } from './pattern-setup/pattern-setup.component';

const components = [
  PatternComponent,
  PatternListComponent,
  PatternSetupComponent,
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    PatternRoutingModule
  ],
  exports: [
    components
  ]
})
export class PatternModule { }
