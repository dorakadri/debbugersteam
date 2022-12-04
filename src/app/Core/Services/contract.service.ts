import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Contract } from '../Modals/Contract';
import { Student } from '../Modals/Student';

@Injectable({
    providedIn: 'root'
})

export class ContractService{
 
    constructor(private http:HttpClient) { }

    getAllContracts(){
        return this.http.get<Contract[]>(environment.endpoints.contracts.getAll);
    }

    addContract(contract:Contract){
        return this.http.post<Contract>(environment.endpoints.contracts.post, contract);
    }

    deleteContract(id:number){
        return this.http.delete<any>(environment.endpoints.contracts.delete+id);
    }

    updateContract(contract:Contract){
        return this.http.put<Contract>(environment.endpoints.contracts.update, contract);
    }

    getContract(id:number){
        return this.http.get<Contract>(environment.endpoints.contracts.get+id);
    }

    affectContract(c:Contract, nom, prenom){
        let params= new HttpParams();
        params=params.append('nomE', nom)
        params=params.append('prenomE', prenom)
        return this.http.post<any>(environment.endpoints.contracts.affectContractToStudent,c,{params:params})
    }

    getAllStudents(){
        return this.http.get<Student[]>(environment.endpoints.students.getAll);
    }

}