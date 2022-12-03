import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { departement } from '../Modals/departement';
import { equipe } from '../Modals/equipe';
import { student } from '../Modals/etudiant';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:8089/SpringMVC/controllerEtudiant';

  public registerStudent(studentData: any) {
    return this.http.post<student>(this.API + '/ajouterEtudiant', studentData);
  }

  public getStudents() {
    return this.http.get(this.API + '/DisplayStudents');
  }

  public deleteStudent(idEtudiant: any) {
    return this.http.delete(this.API + '/deletestudent/?id=' + idEtudiant);
  }

  public updateStudents(student: any) {
    return this.http.put(this.API + '/updateStudentById', student);
  }
  
  public assignStudent(idEtudiant:any,idDepart:any){

        return this.http.post<number>(`${this.API}/assignetudianttodepartment/${idEtudiant}/${idDepart}`,{});

  }

   public getDepartements(){

        return this.http.get<departement[]>('http://localhost:8089/SpringMVC/DepartmentController/displayalldepartment' );
  }

 public getallequipe() {
    return this.http.get<equipe[]>('http://localhost:8089/SpringMVC/EquipeController/displayEquipes' );
  }
  
  public assignstudenttoequipe(idEtudiant:any,ideq:any){


    return this.http.post(`${this.API}/assignEtudiantEquipe/${ideq}/${idEtudiant}`,{});

  }


 
}
