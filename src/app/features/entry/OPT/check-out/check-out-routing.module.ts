import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutListComponent } from './check-out-list/check-out-list.component';
import { CheckOutVoucherComponent } from './check-out-voucher/check-out-voucher.component';

const routes: Routes = [
  {path:'',component:CheckOutListComponent},
  {path:'voucher',component:CheckOutVoucherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutRoutingModule { }
