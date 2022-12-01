import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailEnseignantComponent } from './detail-enseignant/detail-enseignant.component';
import { EnseignantsComponent } from './enseignants.component';
import { FormEnseignantComponent } from './form-enseignant/form-enseignant.component';
import { ListEnseignantComponent } from './list-enseignant/list-enseignant.component';

const routes: Routes = [{path:'',component:EnseignantsComponent,children:[
  {path:'', component: ListEnseignantComponent},
  {path:'modifier/:idenseignant', component: FormEnseignantComponent},
  {path:'ajouter', component: FormEnseignantComponent},
  {path:'details/:idenseignant', component: DetailEnseignantComponent}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantsRoutingModule { }
