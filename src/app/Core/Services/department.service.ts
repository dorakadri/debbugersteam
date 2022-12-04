import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Department } from './../Modals/department';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  public urlGET= environment.url+'DepartmentController/displayalldepartment/';
  public urlDel= environment.url+'DepartmentController/deleteDepartment/';
  public urlGetById= environment.url+'DepartmentController/displdepartmentbyid/';
  public urlAdd= environment.url+'DepartmentController/addDepartment/';
  public urlUpdate= environment.url+'DepartmentController/updatedepartment/';
  public urlNbensperdepartById= environment.url+'DepartmentController/GetNbensperDepartment/';
  
  constructor(private http: HttpClient) { }

  getAllDepartment(){
    return this.http.get<Department[]>(this.urlGET)
  }
  delete(id: number){
    return this.http.delete(this.urlDel+id)
  }
  getDepartmentByID(id:number){
    return this.http.get<Department>(this.urlGetById+id)
  }
  addDepartment(dep:Department){
    return this.http.post(this.urlAdd,dep)
  }
  updateDepartment(dep:Department){
    return this.http.put(this.urlUpdate,dep)
  }
  GetNbensperDepartment(id:number){
    return this.http.get(this.urlNbensperdepartById+id)
  }

}
