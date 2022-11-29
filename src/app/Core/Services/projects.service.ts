import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { equipe } from '../Modals/equipe';
import { projet } from '../Modals/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public url =environment.url
  constructor(private http: HttpClient) { }

  public getallprojects() {
    return this.http.get<projet[]>(this.url+ "displayallprojet")
  }

  public getproject(id:number) {
    return this.http.get<projet>(this.url+ "displayunivequipeprojet/"+ id)
  }

 public  deleteproject(id:number){
    let e =  this.http.delete<String>(this.url+"deleteProjet/"+ id);
    return e ;

  }

  public getallequipe() {
    return this.http.get<equipe[]>(this.url+ "displayallequipe")
  }

  public postproject(p:projet) {
    return this.http.post(this.url + "addProjetprojet",p);
  }

  public assignteamtoproject(ideq:number,idpr:number){
 return this.http.post(`${this.url}equipetoprojet/${ideq}/${idpr}`,{} );
   //(`${this.url}equipetoprojet/${ideq}/${idpr}`);
  }

  

  public Updateprojet(p:projet) {
    return this.http.put(this.url + "Updateprojet",p);
  }

  public getidequipe(id:number) {
    return this.http.get<Number>(this.url+"displayallequipe/"+ id);
  }

  public  deleteequipefromprojet(idpro:number,idequi:number){
  this.http.delete(`${this.url}deleteequipe/${idpro}/${idequi}`);
   

  }
}
