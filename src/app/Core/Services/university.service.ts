import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Department } from '../Modals/Departement';
import { University } from '../Modals/university';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
 public url=  environment.url
 public urldep=environment.urldep
  constructor(private http: HttpClient) { }

  getAllUniversity(){
    return this.http.get<University[]>(this.url+"UniversityController/"+ "displayUniversities")
  }
  addUniversite(u:University){
    return this.http.post(this.url+"UniversityController/"+"addUniversity",u)
  }
  delete(id: number){
    return this.http.delete<any>(this.url+"UniversityController/"+"deleteuniversity/"+id)
  }
  public updateUniversity(university: any) {
    return this.http.put(this.url + "UniversityController/"+"updateUniversity", university);
  }
  getUniversiteByID(idUniv:number){
    return this.http.get<University>(this.url+ "UniversityController/"+"DisplayUniversitiesById/"+idUniv)
  }
 
  assignDepartement(idUniv:number,idDepart:number[]){
    
    return this.http.put(this.url+"UniversityController/assignuniversityToDepartment/"+idUniv+"/"+idDepart,{})
  }

  getDepartement(){
    return this.http.get<Department[]>(this.url+"DepartmentController/"+ "displayalldepartment") 
  }
 

 
  getDepartementbyId(idDepart:number){
    return this.http.get<Department>(this.url+"DepartmentController/"+ "displdepartmentbyid/"+idDepart) 
  }

  departementNonAffected(){
    return this.http.get<Department[]>(this.url+"UniversityController/"+ "departementAffected")
  }

}

