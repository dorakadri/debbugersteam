import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
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
}
