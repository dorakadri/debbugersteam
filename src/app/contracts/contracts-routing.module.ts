import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { ContractsListComponent } from './contracts-list/contracts-list.component';

const routes: Routes = [
  {path:'', component:ContractsListComponent},
  {path:'new', component:ContractFormComponent},
  {path:'detail/:id', component:ContractDetailsComponent},
  {path:'update/:id', component:ContractFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
