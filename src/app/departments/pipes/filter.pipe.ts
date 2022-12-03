import { Pipe, PipeTransform } from '@angular/core';
import { Department } from '../../Core/Modals/department';

@Pipe({
  name: 'FilterPipeDepart'
})
export class FilterPipeDepart implements PipeTransform {

  transform(departments: Department[], filterText:string): Department[] {
    if(departments.length === 0 || filterText === ''){
    return departments;
  }else{
   return departments.filter((depart)=>{
   
       return depart.nomDepart.toLowerCase().startsWith(filterText.toLowerCase());
      })
  }
  }

}