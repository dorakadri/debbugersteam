import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsListComponent } from './contracts-list/contracts-list.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractFormComponent } from './contract-form/contract-form.component';


@NgModule({
  declarations: [
    ContractsListComponent,
    ContractDetailsComponent,
    ContractFormComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule
  ]
})
export class ContractsModule { }
