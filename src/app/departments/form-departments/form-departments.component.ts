import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from './../../Core/Modals/department';
import { DepartementService } from './../../Core/Services/department.service';

@Component({
  selector: 'app-form-departments',
  templateUrl: './form-departments.component.html',
  styleUrls: ['./form-departments.component.css']
})
export class FormDepartmentsComponent implements OnInit {
  public department: Department;
  public action: string;
  constructor(private departementService: DepartementService,
    private router:Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['idDepart'];
    if(id!=null){
      //update
      this.action="modifier";
      
      this.departementService.getDepartmentByID(id).subscribe(
        (object: Department)=> this.department=object
      )
      console.log(this.department)
      console.log(id)
    }else
    { this.action="ajouter";
      this.department = new Department();}
  }
  saveDepartment(){
    if(this.action=='ajouter')
    {
    this.departementService.addDepartment(this.department).subscribe(
      ()=>{ this.router.navigate(['/departments'])}
    )
   }
    else {
      this.departementService.updateDepartment(this.department).subscribe(
        ()=> this.router.navigate(['/departments'])
      )
    }
  }

}
