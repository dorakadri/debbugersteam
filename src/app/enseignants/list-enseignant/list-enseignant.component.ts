import { Component, OnInit } from '@angular/core';
import { Enseignant } from './../../Core/Modals/enseignant';
import { EnseignantService } from './../../Core/Services/enseignant.service';
import Swal from "sweetalert2";

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
  public filterTexts:String='';
  constructor(private serviceEnseignant: EnseignantService) { }

  ngOnInit(): void {
    this.EnseignantsList();
  }

  EnseignantsList():void{
    this.serviceEnseignant.getAllEnseignant().subscribe(
      (data:Enseignant[])=>{
        this.list=data;
       }
    )
  }
  delete(ens:Enseignant){
     Swal.fire({
      title: 'vous êtes sûr?',
      text: "voulez-vous supprimer cet enseignant!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        let i = this.list.indexOf(ens);
      this.serviceEnseignant.deleteEnseignant(ens.idenseignant).subscribe(
        ()=>{this.list.splice(i,1)}
      )
        Swal.fire(
          'Supprimé!',
          'Enseignant supprimée avec success.',
          'success'
        )
      }
    })
    
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
  getColor(fonction) {
    switch (fonction) {
      case 'chefdepartment':
        return  'green';
      case 'responsablemodule':
        return  'gold';
      case 'professeur':
        return  'blue';
      case 'surveillant':
        return  'purple';
      }
   }
}
