import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../../Core/Modals/team';

@Pipe({
  name: 'FilterPipeTeam'
})
export class FilterPipeTeam implements PipeTransform {

  transform(teams: Team[], filterText:string): Team[] {
    if(teams.length === 0 || filterText === ''){
    return teams;
  }else{
   return teams.filter((team)=>{
   
       return team.nomEquipe.toLowerCase().startsWith(filterText.toLowerCase());
      })
  }
  }

}
