import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../../Core/Modals/Contract';
import { ContractService } from '../../Core/Services/contract.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {

  contract:Contract= new Contract();
  id:number;
  constructor(private contractsApi:ContractService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.id=params['id'];
        if(this.id!=null){
          this.contractsApi.getContract(this.id).subscribe(res=>{
            this.contract=res;
          },
          ()=>{console.log('error')},
          ()=>{}
          )
        }
      },
      ()=>{console.log('error')},
      ()=>{}
    )
  }

}
