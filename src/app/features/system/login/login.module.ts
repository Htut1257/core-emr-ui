import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModulesModule } from 'src/app/shared/common-modules/common-modules.module';
import { LoginComponent } from './login/login.component';
import { ToastComponent } from 'src/app/shared/toast/toast/toast.component';
import { ToasterComponent } from 'src/app/shared/toast/toaster/toaster.component';
const components = [
  LoginComponent//,ToastComponent,ToasterComponent
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    CommonModulesModule
  ],
  exports: [
    components
  ]
})
export class LoginModule { }
