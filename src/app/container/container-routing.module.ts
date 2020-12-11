import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';
import {PickemPageComponent} from '@modules/container/components/pickem-page/pickem-page.component';

const routes: Routes = [{
  path: '',
  data: {
    breadcrumb: 'VR_MAIN_PAGE'
  },
  children: [
    {
      path: '',
      redirectTo: 'main',
      pathMatch: 'full',
    },
    {
      path: 'main',
      component: MainPageComponent,
      data: {
        breadcrumb: 'main'
      },
      children: [
        {
          path: 'pickem',
          component: PickemPageComponent,
          data: {
            breadcrumb: null
          }
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
