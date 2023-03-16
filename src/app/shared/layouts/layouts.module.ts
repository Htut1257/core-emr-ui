import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from '../common-modules/common-modules.module';
import { LayoutsRoutingRoutingModule } from './layouts-routing.module';
import { MainDefaultComponent } from './main-default/main-default.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { MainFooterComponent } from './main-footer/main-footer/main-footer.component';
//toast component
import { ToastComponent } from 'src/app/shared/toast/toast/toast.component';
import { ToasterComponent } from 'src/app/shared/toast/toaster/toaster.component';
const components = [
  MainDefaultComponent,
  MainHeaderComponent,
  MainSidebarComponent,
  MainFooterComponent,
  ToastComponent,
  ToasterComponent,
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    LayoutsRoutingRoutingModule,
  ],
  exports:[
    components
  ]
})
export class LayoutsModule { }
