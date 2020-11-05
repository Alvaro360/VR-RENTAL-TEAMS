import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    SharedModule
  ]
})
export class ContainerModule { }
