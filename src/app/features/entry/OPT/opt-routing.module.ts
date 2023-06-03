import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocEntryComponent } from './doc-entry/doc-entry.component';
import { NurseEntryComponent } from './nurse-entry/nurse-entry.component';
import { DoctorStatusViewComponent } from './doctor-status-view/doctor-status-view.component';
const routes: Routes = [
  {path:'doctor-entry',component:DocEntryComponent,pathMatch:'full'},
  {path:'nurse-entry',component:NurseEntryComponent},
  {path:'doctor-status-view',component:DoctorStatusViewComponent},
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then(module => module.AppointmentModule)
  },
  {
    path: 'check-out',
    loadChildren: () => import('./check-out/check-out.module').then(module => module.CheckOutModule)
  },
  {
    path: 'lab',
    loadChildren: () => import('./lab/lab.module').then(module => module.LabModule)
  },
  {
    path: 'x-ray',
    loadChildren: () => import('./x-ray/x-ray.module').then(module => module.XRayModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OPTRoutingModule { }
