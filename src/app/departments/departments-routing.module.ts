import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
import { DetailDepartmentsComponent } from './detail-departments/detail-departments.component';
import { FormDepartmentsComponent } from './form-departments/form-departments.component';
import { ListDepartmentsComponent } from './list-departments/list-departments.component';

const routes: Routes = [{path:'',component:DepartmentsComponent,children:[
  {path:'', component: ListDepartmentsComponent},
  {path:'modifier/:idDepart', component: FormDepartmentsComponent},
  {path:'ajouter', component: FormDepartmentsComponent},
  {path:'details/:idDepart', component: DetailDepartmentsComponent}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
