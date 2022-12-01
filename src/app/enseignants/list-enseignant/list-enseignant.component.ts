import { Component, OnInit } from '@angular/core';
import { Enseignant } from './../../Core/Modals/enseignant';
import { EnseignantService } from './../../Core/Services/enseignant.service';

@Component({
  selector: 'app-list-enseignant',
  templateUrl: './list-enseignant.component.html',
  styleUrls: ['./list-enseignant.component.css']
})
export class ListEnseignantComponent implements OnInit {
  list: Enseignant[];
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10];
  constructor(private serviceEnseignant: EnseignantService) { }

  ngOnInit(): void {
    this.EnseignantsList();
  }

  EnseignantsList():void{
    this.serviceEnseignant.getAllEnseignant().subscribe(
      (data:Enseignant[])=>{
        this.list=data;
        console.log(this.list)
       }
    )
  }
  delete(ens:Enseignant){
    if(confirm(' Are you sure to delete this ')){
      let i = this.list.indexOf(ens);
      this.serviceEnseignant.deleteEnseignant(ens.idenseignant).subscribe(
        ()=>{this.list.splice(i,1)}
      )
      alert("Enseignant deleted successfully")
    }
    
  }

  onTableDataChange(event: any){
    this.page=event;
    this.EnseignantsList();
  }
  OnTableSizeChange(event: any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.EnseignantsList();
  }
}
