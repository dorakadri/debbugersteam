import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../Core/Modals/Departement';
import { University } from '../../Core/Modals/university';

import { UniversityService } from '../../Core/Services/university.service';

@Component({
  selector: 'app-new-universite',
  templateUrl: './new-universite.component.html',
  styleUrls: ['./new-universite.component.css']
})
export class NewUniversiteComponent implements OnInit {
  public university: University=new University();
  univForm: FormGroup;
  public action: string;
  univDetails = null as any;
 
  
  public Listdep:Department[]=[];
  public Listdepasignet:Department[]=[];

  public idselected:number[]=[];
  public depart:Department=new Department();
  submitted = false;
  

  constructor(private univService: UniversityService,
    private router:Router, private currentRoute: ActivatedRoute, 
    private snackbar : MatSnackBar,
    private formbuilder: FormBuilder,) { }
 
  ngOnInit(): void {

    this.univForm=this.formbuilder.group({
      nomUniv:["", [Validators.required,Validators.minLength(3)]],
      mail:["", [Validators.required,Validators.email]],
      webSite:["",[ Validators.required,Validators.minLength(3),Validators.pattern("www.*.*")]]
     
     
    })
  
        //get list departement
    let id= this.currentRoute.snapshot.params['id'];
    if(id!=null){
      
      this.action="update";

      this.univService.departementNonAffected().subscribe(
        (response:Department[])=>{
         this.Listdep=response;
         console.log("hello",this.Listdep);
         this.univService.getUniversiteByID(id).subscribe(
          (object: University)=> {
            this.university=object
  
          console.log(object)
          this.university.departments.forEach(dep=>{
            this.Listdep.push(dep)
           this.idselected.push(dep.idDepart);
          })
  
          console.log("heeeeeelo",this.Listdep)
        }
        ,
           () =>{console.log('error')},
          ()  => {
  
        } 
      )
      }
    
      ) 

    }
     else
    { 
      
      this.action="add";
    this.univService.departementNonAffected().subscribe(
      
      (response:Department[])=>{
      
       this.Listdep=response;

       console.log("hello",this.Listdep);
    }) 
      this.university = new University();}
  }


  //save universty
  Save(){
    if(this.action=='add')
    {
      var r ;
   
    this.univService.addUniversite(this.univForm.value).subscribe(
      
      (response:number)=>{
     r=response;
  
        if(this.idselected.length!=0)
       
        
        console.log(response)
      },
      (err)=>{console.log(err.status)},
      ()=> {
        console.log(" save succefuly");
   
          this.univService.assignDepartement(r, this.idselected).subscribe(
          (response)=>{console.log(response)
            
          }
          ,
      (err)=>{console.log(err.status)
      console.log("error")
      },
      ()=> {
        console.log(" completed")
        this.snackbar.open('universitie added' , 'OK', {
          duration: 3000
        });
      }
          
        )
        this.router.navigate(['/universities'])
      }
      
    )
   
   }
  else {
    console.log(this.university.departments);
    console.log(this.univForm.value);
    this.university={...this.university,...this.univForm.value}
    console.log(this.university);
   this.univService.updateUniversity(this.university).subscribe((response:University)=>{
          console.log(this.university);
     if(this.idselected.length!=0)
         
      
          this.univService.assignDepartement(this.university.idUniv,this.idselected).subscribe()
        this.router.navigate(['/universities']) 
           /* this.snackbar.open('updated successfully' , 'OK', {
            duration: 3000
          })     */
      })
    }

  }




  getid(e){

    console.log(e)
    if(e.target.checked){
     this.idselected.push(+e.target.value);
     console.log(this.idselected);
    }else{
     this.idselected=this.idselected.filter((id)=>id !== +e.target.value);
     console.log(e)
     console.log(this.idselected);
    }
}


}