import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { equipe } from "../../Core/Modals/equipe";
import { projet } from "../../Core/Modals/project";
import { ProjectsService } from "../../Core/Services/projects.service";

@Component({
  selector: "app-detailproject",
  templateUrl: "./detailproject.component.html",
  styleUrls: ["./detailproject.component.css"],
})
export class DetailprojectComponent implements OnInit {
  public id: number;
  public equipe: string[] | equipe[];
  public project = new projet();

  constructor(
    private currentRoute: ActivatedRoute,
    private projetserv: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.currentRoute.snapshot.params["id"];

    console.log(this.id);
    this.projetserv.getproject(this.id).subscribe(
      (response) => {
        this.project = response;
        console.log(this.project);
        console.log(response.equipes);
        this.equipe = response.equipes;

        console.log(this.equipe);
      },
      () => {
        console.log("error");
      },
      () => {
        console.log("complete");
      }
    );
  }

  deleteequipe(ideq: number) {
    /* let id= this.currentRoute.snapshot.params['id'];
  let i =this.equipe.findIndex(e => e.idEquipe===ideq);
  this.projetserv.deleteequipefromprojet(id,ideq).subscribe((response:string)=>{
    console.log(response)
    this.equipe.splice(i,1)}
) 
  console.log(id);
  console.log(ideq); */
    Swal.fire({
      title: "Are you sure want to delete this team?",
      text: "You will not be able to recover this Team!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.value) {
        //delete contract confirmation
        let id = this.currentRoute.snapshot.params["id"];
        let i = this.equipe.findIndex((e) => e.idEquipe === ideq);
        this.projetserv
          .deleteequipefromprojet(id, ideq)
          .subscribe((response: string) => {
            console.log(response);
            this.equipe.splice(i, 1);
          });
        Swal.fire("Deleted!", "Your contract has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Team is safe 🙂", "error");
      }
    });
  }

  redirect() {
    let id = this.currentRoute.snapshot.params["id"];
    console.log(id);
    this.router.navigate(["projects/Modifier/" + id]);
  }
}
