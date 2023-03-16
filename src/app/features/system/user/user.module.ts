import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserSetupComponent } from './user-setup/user-setup.component';
import { UserContainerComponent } from './user-container/user-container.component';

const components=[
  UserSetupComponent,
  UserListComponent
]
@NgModule({
  declarations: [
    components,
    UserContainerComponent,
  
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    UserRoutingModule
  ],
  exports:[
    components
  ]
})
export class UserModule { }
