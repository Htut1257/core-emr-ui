import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternComponent } from './pattern/pattern.component';
import { PatternListComponent } from './pattern-list/pattern-list.component';
import { PatternSetupComponent } from './pattern-setup/pattern-setup.component';

const routes: Routes = [
  {path:'',component:PatternComponent},
  {path:'pattern-list',component:PatternListComponent},
  {path:'pattern-setup',component:PatternSetupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatternRoutingModule { }
