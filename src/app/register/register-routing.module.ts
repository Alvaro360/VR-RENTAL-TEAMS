import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'VR_REGISTER'
    },
    children: [
      {
        path: '',
        component: RegisterComponent,
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
export class RegisterRoutingModule { }
