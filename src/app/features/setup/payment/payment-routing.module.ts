import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentContainerComponent } from './payment-container/payment-container.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentSetupComponent } from './payment-setup/payment-setup.component';

const routes: Routes = [
  { path: '', component: PaymentContainerComponent },
  { path: 'payment-list', component: PaymentListComponent },
  { path: 'payment-setup', component: PaymentSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
