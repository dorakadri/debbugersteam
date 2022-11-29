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
  public listf : projet[];
  public desc:boolean=false ;
  searchText:String="";
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
 
  onSearchtextentered(value:String){
    this.searchText=value ;
    console.log(this.searchText);

  }

  sortdata(){
    console.log(this.desc +"initial");
    if(this.desc){
    let newarr =this.list.sort((a,b)=>a.nomProjet.localeCompare(b.nomProjet));
    this.list=newarr
    
    }else{
      let newarr =this.list.sort((a,b)=>b.nomProjet.localeCompare(a.nomProjet));
      this.list=newarr
      console.log(this.desc +"false");
    }
    this.desc= !this.desc
    console.log(this.desc +"after");
  }

}
