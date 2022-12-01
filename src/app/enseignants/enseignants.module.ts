import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnseignantsRoutingModule } from './enseignants-routing.module';
import { EnseignantsComponent } from './enseignants.component';
import { ListEnseignantComponent } from './list-enseignant/list-enseignant.component';
import { FormEnseignantComponent } from './form-enseignant/form-enseignant.component';
import { DetailEnseignantComponent } from './detail-enseignant/detail-enseignant.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    EnseignantsComponent,
    ListEnseignantComponent,
    FormEnseignantComponent,
    DetailEnseignantComponent
  ],
  imports: [
    CommonModule,
    EnseignantsRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class EnseignantsModule { }
