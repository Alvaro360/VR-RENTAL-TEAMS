import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './components/login/login.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';

@NgModule({
  declarations: [LoginComponent, PasswordInputComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
