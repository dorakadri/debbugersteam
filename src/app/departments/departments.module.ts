import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { FormsModule } from '@angular/forms';
import { DepartmentsComponent } from './departments.component';
import { FormDepartmentsComponent } from './form-departments/form-departments.component';
import { ListDepartmentsComponent } from './list-departments/list-departments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailDepartmentsComponent } from './detail-departments/detail-departments.component';
import { FilterPipeDepart } from './pipes/filter.pipe';



@NgModule({
  declarations: [DepartmentsComponent,
  FormDepartmentsComponent,
ListDepartmentsComponent,
DetailDepartmentsComponent,
FilterPipeDepart],
  imports: [
    CommonModule,
    FormsModule,
    DepartmentsRoutingModule,
    NgxPaginationModule
  ]
})
export class DepartmentsModule { }
