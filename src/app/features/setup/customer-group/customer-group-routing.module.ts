import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGroupContainerComponent } from './customer-group-container/customer-group-container.component';
import { CustomerGroupListComponent } from './customer-group-list/customer-group-list.component';
import { CustomerGroupSetupComponent } from './customer-group-setup/customer-group-setup.component';

const routes: Routes = [
  { path: '', component: CustomerGroupContainerComponent },
  { path: 'customer-list', component: CustomerGroupListComponent },
  { path: 'customer-setup', component: CustomerGroupSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGroupRoutingModule { }
