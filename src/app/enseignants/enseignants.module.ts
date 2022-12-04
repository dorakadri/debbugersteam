import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnseignantsRoutingModule } from './enseignants-routing.module';
import { EnseignantsComponent } from './enseignants.component';
import { ListEnseignantComponent } from './list-enseignant/list-enseignant.component';
import { FormEnseignantComponent } from './form-enseignant/form-enseignant.component';
import { DetailEnseignantComponent } from './detail-enseignant/detail-enseignant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeEnseign } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    EnseignantsComponent,
    ListEnseignantComponent,
    FormEnseignantComponent,
    DetailEnseignantComponent,
    FilterPipeEnseign
  ],
  imports: [
    CommonModule,
    EnseignantsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class EnseignantsModule { }
