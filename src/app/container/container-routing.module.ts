import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';

const routes: Routes = [{
  path: '',
  data: {
    breadcrumb: 'VR_MAIN_PAGE'
  },
  children: [
    {
      path: '',
      component: MainPageComponent,
      data: {
        breadcrumb: null
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
