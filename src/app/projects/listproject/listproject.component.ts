import { Component, OnInit } from '@angular/core';
import { projet } from '../../Core/Modals/project';
import { ProjectsService } from '../../Core/Services/projects.service';

@Component({
  selector: 'app-listproject',
  templateUrl: './listproject.component.html',
  styleUrls: ['./listproject.component.css']
})
export class ListprojectComponent implements OnInit {
  public page =1 ;
  public pageSize:10;
  public list: projet[];
  constructor(private projetserv : ProjectsService) { }

  ngOnInit(): void {
    this.projetserv.getallprojects().subscribe(
      (response:projet[])=>{
       this.list=response;
       console.log(this.list);
      }, 
      () => { console.log('error') },
      () => { console.log('complete') }
    )
  }

  deleteproject(id:number){
    console.log(id);
    let i =this.list.findIndex(e => e.idProjet===id);
    this.projetserv.deleteproject(id).subscribe(
      (response:string)=>{
        console.log(response)
        this.list.splice(i,1)}
    )
  
  }

}
