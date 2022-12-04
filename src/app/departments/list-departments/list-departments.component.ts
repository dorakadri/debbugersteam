import { Component, OnInit } from '@angular/core';
import { Department } from './../../Core/Modals/department';
import { DepartementService } from './../../Core/Services/department.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from "sweetalert2";



@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit {
  list: Department[];
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10];
  public filterTexts:String='';
  constructor(private serviceDepartement: DepartementService) { }

  ngOnInit(): void {
    this.DepartmentsList();
  }
  DepartmentsList():void{
    this.serviceDepartement.getAllDepartment().subscribe(
      (data:Department[])=>{
        this.list=data;
        console.log(this.list)
       }
    )
  }
  delete(dep:Department){
   Swal.fire({
      title: 'vous êtes sûr?',
      text: "voulez-vous supprimer cette department!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        let i = this.list.indexOf(dep);
        this.serviceDepartement.delete(dep.idDepart).subscribe(
          ()=>{this.list.splice(i,1)}
        )
        Swal.fire(
          'Supprimé!',
          'Department supprimée avec success.',
          'success'
        )
      }
    })
  }

  onTableDataChange(event: any){
    this.page=event;
    this.DepartmentsList();
  }
  OnTableSizeChange(event: any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.DepartmentsList();
  }

}
