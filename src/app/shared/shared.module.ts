import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '@modules/core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpAuthorizationInterceptor} from '@interceptors/http.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {NavSideBarComponent} from './components/nav-side-bar/nav-side-bar.component';
import {PasswordInputComponent} from './components/password-input/password-input.component';
import { CheckboxInputComponent } from './components/checkbox-input/checkbox-input.component';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    NavSideBarComponent,
    PasswordInputComponent,
    CheckboxInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    TranslateModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    DropdownModule,
    CalendarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthorizationInterceptor,
      multi: true
    }
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule,
    NavSideBarComponent,
    PasswordInputComponent,
    CheckboxInputComponent,
    DropdownModule,
    DialogModule,
    CalendarModule
  ]
})
export class SharedModule { }
