import { Component, OnInit } from '@angular/core';
import { Department } from './../../Core/Modals/department';
import { DepartementService } from './../../Core/Services/department.service';
import { NgxPaginationModule } from 'ngx-pagination';

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
    if(confirm(' Are you sure to delete this Department ')){
      let i = this.list.indexOf(dep);
      this.serviceDepartement.delete(dep.idDepart).subscribe(
        ()=>{this.list.splice(i,1)}
      )
      alert("Department deleted successfully")
    }
    
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
