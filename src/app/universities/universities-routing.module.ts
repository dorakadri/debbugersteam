import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailUniversiteComponent } from './detail-universite/detail-universite.component';
import { ListUniversiteComponent } from './list-universite/list-universite.component';

import { NewUniversiteComponent } from './new-universite/new-universite.component';

const routes: Routes = [
  {path:"",component:ListUniversiteComponent},
  //{path:"listuniv",component:ListUniversiteComponent},
  {path:'newU',component:NewUniversiteComponent},
  {path:'update/:id',component:NewUniversiteComponent},
  {path:"detailU/:id",component:DetailUniversiteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversitiesRoutingModule { }
