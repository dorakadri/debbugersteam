import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Enseignant } from './../Modals/enseignant';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  public urlGET= environment.url+'controllerEnseignant/DisplayEnseignant/';
  public urlDel= environment.url+'controllerEnseignant/deletEnseignant/';
  public urlGetById= environment.url+'controllerEnseignant/DisplayEnseignantById/';
  public urlAdd= environment.url+'controllerEnseignant/ajouterEnseignant/';
  public urlUpdate= environment.url+'controllerEnseignant/updateEnseignantById/';
  public url= environment.url+'controllerEnseignant/';
  constructor(private http: HttpClient) { }

  getAllEnseignant(){
    return this.http.get<Enseignant[]>(this.urlGET)
  }
  deleteEnseignant(id: number){
    return this.http.delete(this.urlDel+id)
  }
  getEnseignantByID(id:number){
    return this.http.get<Enseignant>(this.urlGetById+id)
  }
  addEnseignant(ens:Enseignant){
    return this.http.post(this.urlAdd,ens)
  }
  updateEnseignant(ens:Enseignant){
    return this.http.put(this.urlUpdate,ens)
  }
  public assignEnseignantsToDepartment(idenseignant:number,idDepart:number){
    return this.http.put(`${this.url}assignEnseignantToDepartement/${idenseignant}/${idDepart}`,{} );
  }
}
