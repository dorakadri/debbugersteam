import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeTeam } from './pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    TeamsListComponent,
    TeamFormComponent,
    TeamDetailsComponent,
    FilterPipeTeam
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class TeamsModule { }
