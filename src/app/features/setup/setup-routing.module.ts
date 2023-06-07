import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'opd',
    loadChildren: () => import('./opd-setup/opd-setup.module').then(module => module.OpdSetupModule)
  },
  {
    path: 'opd-group',
    loadChildren: () => import('./opd-group/opd-group.module').then(module => module.OpdGroupModule)
  },
  {
    path: 'pattern',
    loadChildren: () => import('./pattern/pattern.module').then(module => module.PatternModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(module => module.PaymentModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then(module => module.LocationModule)
  },
  {
    path: 'township',
    loadChildren: () => import('./township/township.module').then(module => module.TownshipModule)
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.module').then(module => module.DoctorModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
