import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from './../../Core/Modals/Team';
import { TeamService } from './../../Core/Services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
  public team: Team;
  public action: string;
  constructor(private teamService: TeamService,
    private router:Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['id'];
    if(id!=null){
      //update
      this.action="modifier";
      
      this.teamService.getTeamByID(id).subscribe(
        (object: Team)=> this.team=object
      )
      console.log(this.team)
      console.log(id)
    }else
    { this.action="ajouter";
      this.team = new Team();}
  }
  saveTeam(){
    if(this.action=='ajouter')
    {
    this.teamService.addTeam(this.team).subscribe(
      ()=>{ this.router.navigate(['/teams'])}
    )
   }
    else {
      this.teamService.updateTeam(this.team).subscribe(
        ()=> this.router.navigate(['/teams'])
      )
    }
  }

}

