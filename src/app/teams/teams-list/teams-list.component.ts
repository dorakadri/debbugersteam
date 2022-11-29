import { Component, OnInit } from '@angular/core';
import { TeamService } from './../../Core/Services/team.service';
import { Team } from '../../Core/Modals/Team';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {
list:Team[];
  constructor(private serviceTeam:TeamService) { }

  ngOnInit(): void {
    this.serviceTeam.getAllTeam().subscribe(
      (data:Team[])=>{
        this.list=data;
        console.log(this.list)
       }
    )
  }

deleteEquipe(tea:Team){
    if(confirm(' Are you sure to delete this Team ')){
      let i = this.list.indexOf(tea);
      this.serviceTeam.deleteEquipe(tea.idEquipe).subscribe(
        ()=>{this.list.splice(i,1)}
      )
      console.log(tea.idEquipe);
      
      alert("Team deleted successfully")
    }
    
  }

}

