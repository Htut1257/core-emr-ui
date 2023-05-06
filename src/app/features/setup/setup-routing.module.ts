import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'opd-setup',
    loadChildren:()=>import('./opd-setup/opd-setup.module').then(module=>module.OpdSetupModule)
  },
  {
    path:'opd-group',
    loadChildren:()=>import('./opd-group/opd-group.module').then(module=>module.OpdGroupModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
