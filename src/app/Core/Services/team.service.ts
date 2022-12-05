import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Team } from '../Modals/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  public urlGET= environment.url+'EquipeController/displayEquipes/';
  public urlDel= environment.url+'EquipeController/deleteEquipe/';
  public urlGetById= environment.url+'EquipeController/displayEquipeById/';
  public urlAdd= environment.url+'EquipeController/addEquipe';
  public urlUpdate= environment.url+'EquipeController/updateEquipe/';

  constructor(private http: HttpClient) { }
  



getAllTeam(){
    return this.http.get<Team[]>(this.urlGET)
  }
  deleteEquipe(id: number){
    return this.http.delete(this.urlDel+id)
  }
  getTeamByID(id:number){
    return this.http.get<Team>(this.urlGetById+id)
  }
  addTeam(dep:Team){
    return this.http.post(this.urlAdd,dep)
  }
  updateTeam(dep:Team){
    return this.http.put(this.urlUpdate,dep)
  }
}
