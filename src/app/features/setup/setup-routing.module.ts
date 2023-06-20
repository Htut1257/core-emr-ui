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
  },
  {
    path: 'gender',
    loadChildren: () => import('./gender/gender.module').then(module => module.GenderModule)
  },
  {
    path: 'initial',
    loadChildren: () => import('./initial/initial.module').then(module => module.InitialModule)
  },
  {
    path: 'speciality',
    loadChildren: () => import('./speciality/speciality.module').then(module => module.SpecialityModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer-group/customer-group.module').then(module => module.CustomerGroupModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/doctor-schedule/doctor-schedule.module').then(module => module.DoctorScheduleModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
