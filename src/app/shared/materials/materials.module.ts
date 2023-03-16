import { NgModule } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';
//material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
const Modules = [
  MatRippleModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatToolbarModule,
  MatMenuModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatTableModule,
  MatSortModule,
  MatCardModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatDatepickerModule,
  MatTabsModule,
  MatStepperModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatDialogModule,
  MatAutocompleteModule,
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Modules
  ],
  exports: [
    Modules
  ]
})
export class MaterialsModule { }
