import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//layouts components
import { MainDefaultComponent } from './shared/layouts/main-default/main-default.component';
//components
import { LoginComponent } from './features/system/login/login/login.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'main', component: MainDefaultComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./shared/layouts/layouts-routing.module').then(module => module.LayoutsRoutingRoutingModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./features/system/user/user.module').then(module => module.UserModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./features/registration/registration.module').then(module => module.RegistrationModule)
      },
      {
        path: 'vital-sign',
        loadChildren: () => import('./features/entry/vital-sign/vital-sign.module').then(module => module.VitalSignModule)
      },
      {
        path: 'opd',
        loadChildren: () => import('./features/entry/OPT/opt.module').then(module => module.OPTModule)
      },
      {
        path: 'role',
        loadChildren: () => import('./features/system/role/role.module').then(module => module.RoleModule)
      }
    ]
  },
  {
    path: 'setup',component:MainDefaultComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/setup/setup.module').then(module => module.SetupModule)
      },
    ]
  },
  {
    path: 'system', component: MainDefaultComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./features/system/user/user.module').then(module => module.UserModule)
      },
      {
        path: 'role',
        loadChildren: () => import('./features/system/role/role.module').then(module => module.RoleModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./features/system/menu/menu.module').then(module => module.MenuModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
