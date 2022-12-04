import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from '../../Core/Modals/Contract';
import { ContractService } from '../../Core/Services/contract.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Student } from '../../Core/Modals/Student';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {

  id:number;
  contract:Contract;
  contractForm:FormGroup;
  specialities: string[]= ["IA", "CLOUD", "RESEAUX", "SECURITE"];
  action:string;
  studentAction:string;
  selectedSpeciality:string;
  options: string[]=["GAMIX","SE","SIM","NIDS"];
  selectedOp:string;
  studentsList:Student[]=[];
  selectedStudentName:string[]=[];
  selectedStudent:string;

  constructor(private contractApi:ContractService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    //initialise contrat Form
    this.contractForm=new FormGroup({
      idContrat: new FormControl(''),
      dateDebutContrat: new FormControl('',Validators.required),
      dateFinContrat: new FormControl('',Validators.required),
      specialite:new FormControl('IA',Validators.required),
      archive:new FormControl('',Validators.required),
      montantContrat:new FormControl('',Validators.required),
      etudiant:new FormGroup({
        nomE: new FormControl('',Validators.required),
        prenomE: new FormControl('',Validators.required),
        date_naissance: new FormControl('',Validators.required),
        op: new FormControl('',Validators.required)
      })
    })

    
    this.route.params.subscribe(
      (params)=>{
        this.id=params['id'];
        if(this.id!=null){
          this.action="update";
          this.contractApi.getContract(this.id).subscribe(res=>{
            this.contract=res;

            //setting form data from contract object
            this.contractForm.controls.idContrat.setValue(this.id);
            this.contractForm.get("dateDebutContrat").patchValue(this.formatDate(this.contract.dateDebutContrat));
            this.contractForm.get("dateFinContrat").patchValue(this.formatDate(this.contract.dateFinContrat));
            this.contractForm.get("montantContrat").setValue(this.contract.montantContrat);
            if(this.contract.archive){
              const archivedInput = document.getElementById('ArchivedRadio') as HTMLInputElement | null;
              archivedInput.checked = true;
              this.contractForm.get("archive").setValue('true');
            }else{
              const nonArchivedInput = document.getElementById('NonArchivedRadio') as HTMLInputElement | null;
              nonArchivedInput.checked = true;
              this.contractForm.get("archive").setValue('false');
            }
            this.selectedSpeciality=this.contract.specialite;
            if (this.contract.etudiant!=null){
              ((this.contractForm.get('etudiant')).get('nomE')).setValue(this.contract.etudiant.nomE);
              ((this.contractForm.get('etudiant')).get('prenomE')).setValue(this.contract.etudiant.prenomE);
              ((this.contractForm.get('etudiant')).get('date_naissance')).patchValue(this.formatDate(this.contract.etudiant.date_naissance));
              this.selectedOp=this.contract.etudiant.op;
            }
            
          },
          ()=>{console.log('error')},
          ()=>{}
          )
        }else{
          this.action="new";
          this.contract=new Contract();
        }
      },
      ()=>{console.log('error')},
      ()=>{}
    )

    // let now=new Date();
    // console.log(this.getfullDate(now));

  }

  private formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  onSubmit(){
    if(this.action=='new'){
      if (this.studentAction=='addUpdate') {
        this.contractApi.addContract(this.contractForm.value).subscribe(res=>{
          console.log(res);
        },
        error=>{console.log(error)},
        async ()=>{
          await this.alertAddWithSuccess();
          this.router.navigate(["contracts"]);
        }
        )
      } else if(this.studentAction=='affect'){
        let addedContract:Contract;
        (this.contractForm.get('etudiant')).reset();
        this.contractApi.addContract(this.contractForm.value).subscribe(res=>{
          addedContract=res;
          console.log(res);
        },
        error=>{console.log(error)},
        async ()=>{
          this.contractApi.affectContract(addedContract,this.selectedStudentName[0], this.selectedStudentName[1]).subscribe(res=>{
            console.log(res);
          },error=>{
            console.log(error)
          },async()=>{
            await this.alertAddWithSuccess();
            this.router.navigate(["contracts"]);
          }
          )
        }
        )
      }
      
    }else if(this.action=="update"){
      if (this.studentAction=='addUpdate') {
        this.contractApi.updateContract(this.contractForm.value).subscribe(res=>{
          console.log(res);
        },
        error=>{console.log(error)},
        async ()=>{
          await this.alerUpdatetWithSuccess();
          this.router.navigate(["contracts"]);
        }
        )
      } else if(this.studentAction=='affect'){
        let updatedContrat:Contract;
        (this.contractForm.get('etudiant')).reset();
        this.contractApi.updateContract(this.contractForm.value).subscribe(res=>{
          updatedContrat=res;
          console.log(res);
        },
        error=>{console.log(error)},
        async ()=>{
          this.contractApi.affectContract(updatedContrat,this.selectedStudentName[0], this.selectedStudentName[1]).subscribe(res=>{
            console.log(res);
          },error=>{
            console.log(error)
          },async()=>{
            await this.alerUpdatetWithSuccess();
            this.router.navigate(["contracts"]);
          }
          )
        }
        )
      }
    }
  }
   
  async alertAddWithSuccess(){
    const msg=await Swal.fire('DONE', 'Your contract added successfully!', 'success');
  }

  async alerUpdatetWithSuccess(){
    const msg=await Swal.fire('DONE', 'Your contract updated successfully!', 'success');
  }

  addStudentBtnOnClick(){
    document.getElementById("studentForm").style.display="block";
    document.getElementById("addStudentBtn").style.display="none";
    document.getElementById("affectStudentBtn").style.display="inline-block";
    document.getElementById("studentsDropDownList").style.display="none";
    this.studentAction="addUpdate";
  }

  affectStudentBtnOnClick(){
    if(this.studentsList.length==0){
      this.contractApi.getAllStudents().subscribe(res=>{
        this.studentsList=res;
        console.log(this.studentsList);
      })
    }
    document.getElementById("studentForm").style.display="none";
    document.getElementById("addStudentBtn").style.display="inline-block";
    document.getElementById("affectStudentBtn").style.display="none";
    document.getElementById("studentsDropDownList").style.display="block";
    this.studentAction="affect";
  }




selectedStudentOnChange(value){
  console.log(value);
  this.selectedStudentName=value.split(' ');
}



// test code

private pad(n) {
  return n<10 ? '0'+n : n
}

private getfullDate(date){
  return (
    date.getFullYear() +
  "-" +
  this.pad(date.getMonth()+1) +
  "-" +
  this.pad(date.getDate()) +
  "T" +
  this.pad(date.getHours()) +
  ":" +
  this.pad(date.getMinutes()) +
  ":" +
  this.pad(date.getSeconds())
  );
}


}
