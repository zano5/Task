import { FormComponent } from './component/form/form.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './component/detail/detail.component';

import { LoginComponent } from './component/login/login.component';

const routes: Routes = [

  {path:'', component: LoginComponent},
  {path: 'form',
  component: FormComponent
},
{path:'login', component: LoginComponent},
{path:'detail', component: DetailComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
