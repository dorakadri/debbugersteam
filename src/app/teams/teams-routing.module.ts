import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamsListComponent } from './teams-list/teams-list.component';

const routes: Routes = [{path:'',component:TeamsListComponent},
{path:'ajouter',component:TeamFormComponent},
{path:'details/:id',component:TeamDetailsComponent},
{path:'modifier/:id',component:TeamFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
