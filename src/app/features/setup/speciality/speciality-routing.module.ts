import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialityContainerComponent } from './speciality-container/speciality-container.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { SpecialitySetupComponent } from './speciality-setup/speciality-setup.component';

const routes: Routes = [
  { path: '', component: SpecialityContainerComponent },
  { path: 'speciality-list', component: SpecialityListComponent },
  { path: 'speciality-setup', component: SpecialitySetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialityRoutingModule { }
