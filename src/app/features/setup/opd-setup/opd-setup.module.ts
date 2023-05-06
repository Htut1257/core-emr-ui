import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { OpdSetupRoutingModule } from './opd-setup-routing.module';
import { OpdDialogComponent } from './opd-dialog/opd-dialog.component';
import { OpdListComponent } from './opd-list/opd-list.component';
import { OpdSetupComponent } from './opd-setup/opd-setup.component';


const components=[
  OpdDialogComponent,
  OpdListComponent,
  OpdSetupComponent,
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    OpdSetupRoutingModule, 
  ]
  ,exports:[
    components
  ]
})
export class OpdSetupModule { }
