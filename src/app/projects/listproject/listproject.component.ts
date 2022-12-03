import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { projet } from "../../Core/Modals/project";
import { ProjectsService } from "../../Core/Services/projects.service";

@Component({
  selector: "app-listproject",
  templateUrl: "./listproject.component.html",
  styleUrls: ["./listproject.component.css"],
})
export class ListprojectComponent implements OnInit {
  public list: projet[] = [];
  public listf: projet[];
  public desc: boolean = false;
  public done: number;
  public encour: number;
  public thelink;
  searchText: String = "";
  constructor(private projetserv: ProjectsService) {}

  ngOnInit(): void {
    this.projetserv.getallprojects().subscribe(
      (response: projet[]) => {
        this.list = response;
        console.log(this.list);
      },
      () => {
        console.log("error");
      },
      () => {
        this.done = this.list.filter((e) => e.etat == "DONE").length;
        this.encour = this.list.filter((e) => e.etat == "ENCOUR").length;
      }
    );
  }

  deleteproject(id: number) {
    Swal.fire({
      title: "Are you sure want to delete this project?",
      text: "You will not be able to recover this project!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.value) {
        //delete contract confirmation
        let i = this.list.findIndex((e) => e.idProjet === id);
        this.projetserv.deleteproject(id).subscribe((response: string) => {
          console.log(response);
          this.list.splice(i, 1);
        });
        Swal.fire("Deleted!", "Your contract has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Project is safe 🙂", "error");
      }
    });
    /*   console.log(id);
    let i =this.list.findIndex(e => e.idProjet===id);
    this.projetserv.deleteproject(id).subscribe(
      (response:string)=>{
        console.log(response)
        this.list.splice(i,1)}
    ) */
  }

  onSearchtextentered(value: String) {
    this.searchText = value;
    console.log(this.searchText);
  }

  sortdata() {
    console.log(this.desc + "initial");
    if (this.desc) {
      let newarr = this.list.sort((a, b) =>
        a.nomProjet.localeCompare(b.nomProjet)
      );
      this.list = newarr;
    } else {
      let newarr = this.list.sort((a, b) =>
        b.nomProjet.localeCompare(a.nomProjet)
      );
      this.list = newarr;
      console.log(this.desc + "false");
    }
    this.desc = !this.desc;
    console.log(this.desc + "after");
  }

  onDownloadfiles(fileid: number): void {
    this.projetserv.download(fileid).subscribe(
      (e) => {
        let filename = e.headers
          .get("Content-Disposition")
          ?.split(";")[1]
          .split("=")[1];

        let blob: Blob = e.body as Blob;
        let a = document.createElement("a");
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.click();

        //  this.reportProgress(event);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
