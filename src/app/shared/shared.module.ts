import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '@modules/core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpAuthorizationInterceptor} from '@interceptors/http.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {NavSideBarComponent} from './components/nav-side-bar/nav-side-bar.component';

@NgModule({
  declarations: [NavSideBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    TranslateModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthorizationInterceptor,
      multi: true
    }
  ],
  exports: [
    NavSideBarComponent
  ]
})
export class SharedModule { }
