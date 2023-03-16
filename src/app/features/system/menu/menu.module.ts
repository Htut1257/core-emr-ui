import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuSetupComponent } from './menu-setup/menu-setup.component';
import { MenuComponent } from './menu/menu.component';

const components=[
  MenuComponent,
  MenuSetupComponent,
  MenuListComponent,
]
@NgModule({
  declarations: [
    components,
    
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    MenuRoutingModule
  ],
  exports:[
    components
  ]
})
export class MenuModule { }
