import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
import { equipe } from "../Modals/equipe";
import { projet } from "../Modals/project";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  public url = environment.url;
  constructor(private http: HttpClient) {}

  public getallprojects() {
    return this.http.get<projet[]>(this.url + "displayallprojet");
  }

  public getproject(id: number) {
    return this.http.get<projet>(this.url + "displayunivequipeprojet/" + id);
  }

  public deleteproject(id: number) {
    let e = this.http.delete<String>(this.url + "deleteProjet/" + id);
    return e;
  }

  public getallequipe() {
    return this.http.get<equipe[]>(this.url + "displayallequipe");
  }

  public postproject(p: projet) {
    return this.http.post(this.url + "addProjetprojet", p);
  }

  public assignteamtoproject(ideq: number, idpr: number) {
    return this.http.post(`${this.url}equipetoprojet/${ideq}/${idpr}`, {});
    //(`${this.url}equipetoprojet/${ideq}/${idpr}`);
  }

  public Updateprojet(p: projet, idprojet: number) {
    return this.http.put(this.url + `Updateprojet/${idprojet}`, p);
  }

  public getidequipe(id: number) {
    return this.http.get<Number>(this.url + "displayallequipe/" + id);
  }

  public deleteequipefromprojet(idpro: number, idequi: number) {
    return this.http.delete<any>(`${this.url}deleteequipe/${idpro}/${idequi}`);
  }
  ////////////////FILES////////////////////

  public assignfiletoproject(idfile: number, idproject: number) {
    return this.http.post<number>(
      `${this.url}assignfile/${idfile}/${idproject}`,
      {}
    );
  }

  upload(file: File) {
    const data: FormData = new FormData();
    data.append("filef", file);
    return this.http.post<number>(`${this.url}upload`, data, {
      reportProgress: true,
      observe: "response",
    });
  }

  download(fileid: number) {
    return this.http.get(`${this.url}files/${fileid}`, {
      observe: "response",
      responseType: "blob",
    });
  }
  public dispaly() {
    return this.http.get<Object>(this.url + "files");
  }

  ////////////////////////ALERTS//////////////////////

  Errormsg(action: string) {
    if (action === "ADD") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!  project already exist",
        footer: "change the name of the project ",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! try again",
      });
    }
  }

  Successmsg(action: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    if (action === "ADD") {
      Toast.fire({
        icon: "success",
        title: "Project Added succefully ",
      });
    } else {
      Toast.fire({
        icon: "success",
        title: "Project Modified succefully ",
      });
    }
  }
}
