import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddprojectComponent } from './addproject/addproject.component';
import { DetailprojectComponent } from './detailproject/detailproject.component';
import { FormComponent } from './form/form.component';
import { ListprojectComponent } from './listproject/listproject.component';


const routes: Routes = [{path:'',component:ListprojectComponent},
{path:'list',component:ListprojectComponent},
{path:'detail/:id',component:DetailprojectComponent},
{path:'addnewproject',component:FormComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
