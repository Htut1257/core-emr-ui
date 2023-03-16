import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabListComponent } from './lab-list/lab-list.component';
import { LabDetailComponent } from './lab-detail/lab-detail.component';

const routes: Routes = [
  {path:'',component:LabListComponent},
  {path:'lab-detail',component:LabDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
