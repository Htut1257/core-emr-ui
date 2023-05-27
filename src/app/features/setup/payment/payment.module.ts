import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentContainerComponent } from './payment-container/payment-container.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentSetupComponent } from './payment-setup/payment-setup.component';

const components=[
  PaymentContainerComponent,
  PaymentListComponent,
  PaymentSetupComponent
]
@NgModule({
  declarations: [
   components
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    PaymentRoutingModule
  ],
  exports:[
    components
  ]
})
export class PaymentModule { }
