import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '@modules/login/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'VR_LOGIN'
    },
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
          breadcrumb: null
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
