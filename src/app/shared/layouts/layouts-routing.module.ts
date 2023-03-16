import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDefaultComponent } from './main-default/main-default.component';

const routes: Routes = [
  { path: '', component: MainDefaultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingRoutingModule { }
