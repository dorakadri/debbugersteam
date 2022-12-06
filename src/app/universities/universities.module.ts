import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversitiesRoutingModule } from './universities-routing.module';

import { NewUniversiteComponent } from './new-universite/new-universite.component';
import { DetailUniversiteComponent } from './detail-universite/detail-universite.component';
import { RouterModule } from '@angular/router';
import { ListUniversiteComponent } from './list-universite/list-universite.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
routes:[
  
]

@NgModule({
  declarations: [
    ListUniversiteComponent,
    NewUniversiteComponent,
    DetailUniversiteComponent,
    
  ],
  imports: [
    CommonModule,
    UniversitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  
    
  ]
})
export class UniversitiesModule { }
