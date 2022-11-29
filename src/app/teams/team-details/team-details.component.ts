import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from './../../Core/Modals/Team';
import { TeamService } from './../../Core/Services/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  public team: Team;
  constructor(private teamService: TeamService,
    private router:Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['id'];
    if(id!=null){
      this.teamService.getTeamByID(id).subscribe(
        (object: Team)=> this.team=object
      )
    }
  }

}
