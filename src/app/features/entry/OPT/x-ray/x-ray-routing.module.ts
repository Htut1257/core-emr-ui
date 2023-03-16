import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XRayListComponent } from './x-ray-list/x-ray-list.component';
import { XRayDetailComponent } from './x-ray-detail/x-ray-detail.component';

const routes: Routes = [
  {path:'',component:XRayListComponent},
  {path:'x-ray-detail',component:XRayDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XRayRoutingModule { }
