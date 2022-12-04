import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from './../../Core/Modals/department';
import { DepartementService } from './../../Core/Services/department.service';
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";


@Component({
  selector: 'app-form-departments',
  templateUrl: './form-departments.component.html',
  styleUrls: ['./form-departments.component.css']
})
export class FormDepartmentsComponent implements OnInit {
  public department: Department;
  public action: string;
  public departmentForm: FormGroup;
  constructor(private builder: FormBuilder,private departementService: DepartementService,
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
      this.department = new Department();
    }
    if (this.action === "ajouter") {
      this.departmentForm = this.builder.group({
        nomDepart: ["", [Validators.required, Validators.minLength(3)]],
        adresse: ["", [Validators.required, Validators.minLength(5)]]
      });
    } else {
      this.departmentForm = this.builder.group({
        idDepart: [id, []],
        nomDepart: ["", [Validators.required, Validators.minLength(3)]],
        adresse: ["", [Validators.required, Validators.minLength(5)]]
     });
    }
  }
  saveDepartment(){
   if (this.departmentForm.valid) {
    if(this.action=='ajouter')
    {
    this.departementService.addDepartment(this.department).subscribe(
      ()=>{ this.router.navigate(['/departments'])
      Swal.fire({
        icon: 'success',
        title: 'Department Ajoutée aves success',
        showConfirmButton: false,
        timer: 1500
      })}
    )
   }
    else {
      this.departementService.updateDepartment(this.department).subscribe(
        ()=> { this.router.navigate(['/departments'])
        Swal.fire({
          icon: 'success',
          title: 'Department Modifiée aves success',
          showConfirmButton: false,
          timer: 1500
        })}
      )
    }
   }else{
   Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Veuillez remplir tous les champs !',
    timer: 2000
  })}
  }

}
