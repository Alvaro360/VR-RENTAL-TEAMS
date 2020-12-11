import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerRoutingModule } from './container-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PickemPageComponent } from './components/pickem-page/pickem-page.component';
import {SharedModule} from '@shared/shared.module';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [MainPageComponent, PickemPageComponent, TopBarComponent],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    SharedModule
  ]
})
export class ContainerModule { }
