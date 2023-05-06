import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core'
//common modules
import { AgGridModule } from 'ag-grid-angular';
//components modules
import { LayoutsModule } from './shared/layouts/layouts.module';
import { LoginModule } from './features/system/login/login.module';
import { RegistrationModule } from './features/registration/registration.module';


@NgModule({
  declarations: [
    AppComponent,
  
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
