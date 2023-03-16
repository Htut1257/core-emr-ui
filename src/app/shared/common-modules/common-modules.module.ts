import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials/materials.module';
import { AgGridModule } from 'ag-grid-angular';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AgGridModule, 
    MaterialsModule,
  ],
  exports:[
    MaterialsModule,
    AgGridModule,
  ]
})
export class CommonModulesModule { }
