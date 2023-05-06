import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdDialogComponent } from './opd-dialog/opd-dialog.component';
import { OpdListComponent } from './opd-list/opd-list.component';
import { OpdSetupComponent } from './opd-setup/opd-setup.component';

const routes: Routes = [
  {path:'',component:OpdDialogComponent},
  {path:'opd-setup-list',component:OpdListComponent},
  {path:'opd-setup',component:OpdSetupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdSetupRoutingModule { }
