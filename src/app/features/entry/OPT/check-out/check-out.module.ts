import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutListComponent } from './check-out-list/check-out-list.component';
import { CheckOutVoucherComponent } from './check-out-voucher/check-out-voucher.component';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { CheckOutComponent } from './check-out/check-out.component';


@NgModule({
  declarations: [
    CheckOutListComponent,
    CheckOutVoucherComponent,
    CheckOutComponent,
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    CheckOutRoutingModule
  ]
})
export class CheckOutModule { }
