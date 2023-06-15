import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { CustomerGroupRoutingModule } from './customer-group-routing.module';
import { CustomerGroupListComponent } from './customer-group-list/customer-group-list.component';
import { CustomerGroupSetupComponent } from './customer-group-setup/customer-group-setup.component';
import { CustomerGroupContainerComponent } from './customer-group-container/customer-group-container.component';
const components = [
  CustomerGroupContainerComponent,
  CustomerGroupListComponent,
  CustomerGroupSetupComponent
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    CustomerGroupRoutingModule
  ],
  exports: [
    components
  ]
})
export class CustomerGroupModule { }
