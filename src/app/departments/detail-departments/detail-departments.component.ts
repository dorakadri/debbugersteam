import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from './../../Core/Modals/department';
import { DepartementService } from './../../../app/Core/Services/department.service';

@Component({
  selector: 'app-detail-departments',
  templateUrl: './detail-departments.component.html',
  styleUrls: ['./detail-departments.component.css']
})
export class DetailDepartmentsComponent implements OnInit {
  public department: Department;
  public nbr: number;
  constructor(private departementService: DepartementService,
    private router:Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['idDepart'];
    if(id!=null){
      this.departementService.getDepartmentByID(id).subscribe(
        (object: Department)=> this.department=object
      )
      this.departementService.GetNbensperDepartment(id).subscribe(
        (object: number)=> this.nbr=object
      )
    }
  }
}
