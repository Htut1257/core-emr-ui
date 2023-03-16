import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core'
//common modules

//components modules
import { LayoutsModule } from './shared/layouts/layouts.module';
import { LoginModule } from './features/system/login/login.module';
import { RegistrationModule } from './features/registration/registration.module';
import { DocEntryComponent } from './features/entry/OPT/doc-entry/doc-entry.component';
import { AgGridModule } from 'ag-grid-angular';
import { NurseEntryComponent } from './features/entry/OPT/nurse-entry/nurse-entry.component';
import { MenuComponent } from './features/system/menu/menu/menu.component';
import { MenuSetupComponent } from './features/system/menu/menu-setup/menu-setup.component';
@NgModule({
  declarations: [
    AppComponent,
    // MenuComponent,
    // MenuSetupComponent,
    //DocEntryComponent,
    //NurseEntryComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //common modules
    AgGridModule,
    //component modules
    LayoutsModule,
    LoginModule,
    RegistrationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
