import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projet } from '../../Core/Modals/project';
import { ProjectsService } from '../../Core/Services/projects.service';


@Component({
  selector: 'app-detailproject',
  templateUrl: './detailproject.component.html',
  styleUrls: ['./detailproject.component.css']
})
export class DetailprojectComponent implements OnInit {

  public equipe: string[];
  public project=new projet() ;
 
  constructor(private currentRoute: ActivatedRoute,private projetserv : ProjectsService ) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['id'];

    console.log(id);
    this.projetserv.getproject(id).subscribe(
      (response)=>{
       this.project=response;
         this.equipe=response.equipes
      }, 
      () => { console.log('error') },
      () => { console.log('complete') }
    )
  }

}
