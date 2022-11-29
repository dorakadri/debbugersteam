import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TeamsListComponent,
    TeamFormComponent,
    TeamDetailsComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FormsModule
  ]
})
export class TeamsModule { }
