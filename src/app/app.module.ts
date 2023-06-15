import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core'
//common modules
import { AgGridModule } from 'ag-grid-angular';
//components modules
import { LayoutsModule } from './shared/layouts/layouts.module';
import { LoginModule } from './features/system/login/login.module';
import { RegistrationModule } from './features/registration/registration.module';
import { HttpInterceptorService } from './shared/http-interceptor/http-interceptor.service';
import { ApiConfigService } from './core/services/api-config-service/api-config.service';

export function initConfig(appConfig: ApiConfigService) {
  return () => appConfig.loadConfig();
}

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

    // AgGridModule.withComponents([AutocompleteCell]),
    //component modules
    LayoutsModule,
    LoginModule,
    RegistrationModule,

  ],
  providers: [
    ApiConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ApiConfigService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
