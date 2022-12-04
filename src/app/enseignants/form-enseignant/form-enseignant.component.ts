import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from '../../Core/Services/department.service';
import { Department } from '../../Core/Modals/department';
import { Enseignant } from '../../Core/Modals/enseignant';
import { EnseignantService } from '../../Core/Services/enseignant.service';
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-enseignant',
  templateUrl: './form-enseignant.component.html',
  styleUrls: ['./form-enseignant.component.css']
})
export class FormEnseignantComponent implements OnInit {
  public enseignant: Enseignant=new Enseignant();
  public idDepar:number;
  public action: string;
  public selectedList:Department[]=[];
  public list :Department[]=[];
  public idselected:number[]=[];
  public select :string ;
  public defaultVal:string="not assigned yet";
  public EnseignantForm: FormGroup;
  constructor(private builder: FormBuilder,private enseignantService: EnseignantService,private departementService: DepartementService,
    private router:Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['idenseignant'];
    if(id!=null){
      this.action="modifier"; 
      this.enseignantService.getEnseignantByID(id).subscribe(
        (object: Enseignant)=>{ this.enseignant=object
         if(this.enseignant.departement.idDepart!==null)
        {
          this.defaultVal=this.enseignant.departement.nomDepart
        }
        }
      )
    }else
    { this.action="ajouter";
      this.enseignant = new Enseignant();
    }
    this.departementService.getAllDepartment().subscribe(
      (response:Department[])=>{
       this.list=response;
       this.selectedList=response;

      }
    )
    if (this.action === "ajouter") {
      this.EnseignantForm = this.builder.group({
        nom: ["", [Validators.required, Validators.minLength(3)]],
        prenom: ["", [Validators.required, Validators.minLength(3)]],
        dateembauche: ["", [Validators.required]],
        fonction: ["", [Validators.required]],
      });
    } else {
      this.EnseignantForm = this.builder.group({
        idenseignant: [id, []],
        nom: ["", [Validators.required, Validators.minLength(3)]],
        prenom: ["", [Validators.required, Validators.minLength(3)]],
        dateembauche: ["", [Validators.required]],
        fonction: ["", [Validators.required]],
     });
    }
  }

  saveEnseignant(){
   if (this.EnseignantForm.valid) {
    if(this.action=='ajouter')
    {
      this.enseignantService.addEnseignant(this.enseignant).subscribe(
        (response:number)=> {this.enseignantService.assignEnseignantsToDepartment(response,this.idDepar).subscribe()
          Swal.fire({
            icon: 'success',
            title: 'Ensignant Ajoutée aves success',
            showConfirmButton: false,
            timer: 1500
          })})
       
      this.router.navigate(['/enseignants'])
    }
    else {
      this.enseignantService.updateEnseignant(this.enseignant).subscribe(
        (response:number)=>{this.enseignantService.assignEnseignantsToDepartment(response,this.idDepar).subscribe()
          Swal.fire({
            icon: 'success',
            title: 'Ensignant Modifiée aves success',
            showConfirmButton: false,
            timer: 1500
          })} )

      this.router.navigate(['/enseignants'])
    }
   }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Veuillez remplir tous les champs !',
      timer: 2000
    })
   }
  }

  getvalue(e)
  { console.log(e.target.value)
    this.idDepar=e.target.value;
  }

}
