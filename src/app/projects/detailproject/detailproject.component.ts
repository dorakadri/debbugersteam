import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { equipe } from '../../Core/Modals/equipe';
import { projet } from '../../Core/Modals/project';
import { ProjectsService } from '../../Core/Services/projects.service';


@Component({
  selector: 'app-detailproject',
  templateUrl: './detailproject.component.html',
  styleUrls: ['./detailproject.component.css']
})
export class DetailprojectComponent implements OnInit {

  public equipe: string[] | equipe[];
  public project=new projet() ;
 
  constructor(private currentRoute: ActivatedRoute,private projetserv : ProjectsService ) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['id'];

    console.log(id);
    this.projetserv.getproject(id).subscribe(
      (response)=>{
       this.project=response;
        console.log(this.project);
        console.log(response.equipes);
       this.equipe=response.equipes ;

      console.log(this.equipe);
      }, 
      () => { console.log('error') },
      () => { console.log('complete') }
    )
  }

 deleteequipe(ideq :number){
  let id= this.currentRoute.snapshot.params['id'];
  this.projetserv.deleteequipefromprojet(id,ideq)
  console.log(id);
  console.log(ideq);


 }

}
