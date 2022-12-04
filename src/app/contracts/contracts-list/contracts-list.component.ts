import { Component, OnInit } from '@angular/core';
import { Contract } from '../../Core/Modals/Contract';
import { ContractService } from '../../Core/Services/contract.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Student } from '../../Core/Modals/Student';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.css']
})
export class ContractsListComponent implements OnInit {

  options: string[]= ["ALL","IA", "CLOUD", "RESEAUX", "SECURITE"];
  list:Contract[]=[];
  option1:"ALL";
  permanentList:Contract[]=[];
  studentsList:Student[]=[];

  constructor(private contractsApi:ContractService) { }

  ngOnInit(): void {
    this.contractsApi.getAllContracts().subscribe(
      response=>{
        this.list=response;
        this.permanentList=response;
      },
      error=>{
        console.log(error)
      },
      ()=>{}
    )

    this.contractsApi.getAllStudents().subscribe(
      response=>{
        this.studentsList=response;
      },
      error=>{
        console.log(error)
      },
      ()=>{}
    )
  }

  deleteContractOnClick(id:number){
    Swal.fire({
      title: 'Are you sure want to remove this contract?',
      text: 'You will not be able to recover this contract!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor:'red',
    }).then(async (result) => {
      if (result.value) {
        //delete contract confirmation
        await this.deleteFunction(id);
        Swal.fire(
          'Deleted!',
          'Your contract has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your contract is safe :)',
          'error'
        )
      }
    })

  }

  async deleteFunction(id){
    const reponse = await this.contractsApi.deleteContract(id).subscribe(
      res=>{
        console.log(res);
        let index= this.list.findIndex(c=>c.idContrat==id);
        this.list.splice(index,1);
      }, error =>{
        console.log(error);
      },()=>{
        console.log("delete contract completed!")
      }
    )
  }
  

  onSearch(n):Contract[]{
    let searchObject=n.value;
    console.log(searchObject);
    this.list=this.permanentList;
    if(searchObject.idContrat!=''){
    this.list=this.list.filter((c)=>{
        return c.idContrat==searchObject.idContrat;
      })
    }else if(searchObject.startDate!=''){
      this.list=this.list.filter((c)=>{
        console.log(new Date(c.dateDebutContrat).getTime());
        console.log(new Date(searchObject.startDate).getTime());
        return new Date(c.dateDebutContrat).getTime()  >= new Date(searchObject.startDate).getTime();
      })
      console.log(this.list);
    }
    if(searchObject.endDate!=''){
      this.list=this.list.filter((c)=>{
        return new Date(c.dateFinContrat).getTime()  <= new Date(searchObject.endDate).getTime();
      })
    }
    if(searchObject.speciality!=undefined && searchObject.speciality!='ALL'){
      this.list=this.list.filter((c)=>{
        return c.specialite==searchObject.speciality;
      })
    }
    if(searchObject.archive!='' && searchObject.archive!='all'){
      this.list=this.list.filter((c)=>{
        return c.archive==JSON.parse(searchObject.archive);
      })
    }
    return this.list;
  }



  //test code
  AffectStudentOnChange(value, crt){
    if(value!='not Affected yet !'){
      let studentName=value.split(' ');
      this.contractsApi.affectContract(crt, studentName[0], studentName[1]).subscribe(response=>{
        console.log(response);
      },error=>{
        console.log(error)
      },()=>{console.log('affected!!')})
    }
  }

}
