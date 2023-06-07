import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorContainerComponent } from './doctor-container/doctor-container.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorSetupComponent } from './doctor-setup/doctor-setup.component';

const routes: Routes = [
  { path: '', component: DoctorContainerComponent },
  { path: 'doctor-list', component: DoctorListComponent },
  { path: 'doctor-setup', component: DoctorSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
