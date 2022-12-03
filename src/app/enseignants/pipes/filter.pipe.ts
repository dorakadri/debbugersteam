import { Pipe, PipeTransform } from '@angular/core';
import { Enseignant } from '../../Core/Modals/enseignant';

@Pipe({
  name: 'FilterPipeEnseign'
})
export class FilterPipeEnseign implements PipeTransform {

  transform(enseignants: Enseignant[], filterText:string): Enseignant[] {
    if(enseignants.length === 0 || filterText === ''){
    return enseignants;
  }else{
   return enseignants.filter((enseig)=>{
   
       return enseig.nom.toLowerCase().startsWith(filterText.toLowerCase());
      })
  }
  }

}