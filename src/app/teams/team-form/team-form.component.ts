import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { detail } from './../../Core/Modals/detail';
import { Team } from './../../Core/Modals/Team';
import { TeamService } from './../../Core/Services/team.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
  teamForm: FormGroup;
  public team: Team=new Team();
  // public detail_equipe: teamdetail_equipes= new teamdetail_equipes();
  niveaux:string[]=['JUNIOR','SENIOR','EXPERT']
  selectedNiveau:string;
  public action: string;
  constructor(private teamService: TeamService,
    private router:Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
  //init form group
  this.teamForm=new FormGroup({
   idEquipe: new FormControl('',Validators.required),
    nomEquipe:new FormControl('',Validators.required),
    niveau:new FormControl('',Validators.required),
    detail_equipe:new FormGroup({
      idDetailEquipe:new FormControl('',Validators.required),
      salle:new FormControl('',Validators.required),
      thematique:new FormControl('',Validators.required)
    })
  })




    var id= this.currentRoute.snapshot.params['id'];
    if(id!=null){
      //update
      this.action="modifier";
      
      this.teamService.getTeamByID(id).subscribe(
        (object: Team)=>{ 
          console.log('hedha object:', object);
          this.team=object;
          console.log('hedha team:', this.team);
          console.log(this.teamForm.value);
          this.teamForm.controls.idEquipe.setValue(id)
          this.teamForm.controls['nomEquipe'].setValue(object.nomEquipe);
          this.teamForm.controls['niveau'].setValue(object.niveau);
          // this.selectedNiveau=this.team.niveau;
          
          if(this.team.detail_equipe!=null){
            console.log('hello');
            ((this.teamForm).get("detail_equipe").get('salle')).setValue(this.team.detail_equipe.salle);
            ((this.teamForm).get("detail_equipe").get('thematique')).setValue(this.team.detail_equipe.thematique);
            
          }
          console.log('hedha team form :',this.teamForm.value)
        }
        
      )
      console.log(this.team)
      console.log(id)
    }else
    { this.action="ajouter";
      this.team = new Team();}
  }



  onSubmit(){
    if(this.action=='ajouter')
    {
      console.log(this.teamForm.value);
    this.teamService.addTeam(this.teamForm.value).subscribe(
      ()=>{ this.router.navigate(['/teams'])}
    )
   }
    else {
      this.teamService.updateTeam(this.teamForm.value).subscribe(
        ()=> this.router.navigate(['/teams'])
      )
    }
  }


}

