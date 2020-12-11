import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {CheckboxModule} from 'primeng/checkbox';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    CheckboxModule
  ],
  exports: [
    CheckboxModule
  ]
})
export class CoreModule { }
