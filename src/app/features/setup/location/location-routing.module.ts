import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationContainerComponent } from './location-container/location-container.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationSetupComponent } from './location-setup/location-setup.component';

const routes: Routes = [
  {path:'',component:LocationContainerComponent},
  {path:'location-list',component:LocationListComponent},
  {path:'location-setup',component:LocationSetupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
