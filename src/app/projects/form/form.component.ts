import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { projet } from "../../Core/Modals/project";
import { equipe } from "../../Core/Modals/equipe";
import { ProjectsService } from "../../Core/Services/projects.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  public projet: projet = new projet();
  public list: equipe[];
  public listprojet: projet[];
  public selectedList: equipe[];
  public idselected: number[] = [];
  public projectForm: FormGroup;
  public action: string;
  public idtodoc: number = 0;
  constructor(
    private builder: FormBuilder,
    private projetserv: ProjectsService,
    private currentRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let idprojet = this.currentRoute.snapshot.params["id"];

    if (idprojet != null) {
      this.action = "Modify";
      this.projetserv.getproject(idprojet).subscribe(
        (object: projet) => {
          this.projet = object;
        },

        () => {
          console.log("error");
        },
        () => {
          this.projetserv
            .getidequipe(idprojet)
            .subscribe((response: number) => {
              this.idselected = this.idselected.concat(response);
              console.log(this.idselected);
            });
        }
      );
      console.log(this.projet);
    } else {
      this.action = "ADD";
      this.projet = new projet();
    }

    this.projetserv.getallequipe().subscribe((response: equipe[]) => {
      this.list = response;
      this.selectedList = response;
    });

    if (this.action === "ADD") {
      this.projectForm = this.builder.group({
        nomProjet: ["", [Validators.required, Validators.minLength(3)]],
        client: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
        decription: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(200),
          ],
        ],
        deadline: ["", [Validators.required]],
        field: ["", [Validators.required]],
        etat: ["ENCOUR", []],
      });
    } else {
      this.projectForm = this.builder.group({
        idProjet: [idprojet, []],
        nomProjet: ["", [Validators.required, Validators.minLength(3)]],
        client: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
        decription: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(200),
          ],
        ],
        deadline: ["", [Validators.required]],
        field: ["", [Validators.required]],
        etat: ["", []],
      });
      console.log(this.projectForm);
    }

    console.log(this.idselected);
  }

  save() {
    if (this.projectForm.valid) {
      if (this.action == "ADD") {
        this.projetserv.postproject(this.projectForm.value).subscribe(
          (response: number) => {
            this.idtodoc = response;
            if (this.idselected.length != 0)
              this.idselected.forEach((e) =>
                this.projetserv.assignteamtoproject(e, response).subscribe()
              );
          },
          () => {
            this.projetserv.Errormsg(this.action);
          },
          () => {
            this.projetserv.Successmsg(this.action);
          }
        );
      } else {
        this.projet = { ...this.projectForm.value };
        let idprojet = this.currentRoute.snapshot.params["id"];
        this.projetserv
          .Updateprojet(this.projet, idprojet)
          .subscribe((response: projet) => {
            if (this.idselected.length != 0)
              this.idselected.forEach((e) =>
                this.projetserv
                  .assignteamtoproject(e, this.projet.idProjet)
                  .subscribe(
                    () => {},
                    () => {
                      this.projetserv.Errormsg(this.action);
                    },
                    () => {
                      this.projetserv.Successmsg(this.action);
                    }
                  )
              );
          });
      }
    }
  }
  getvalue(e) {
    console.log(e.target.value);
    if (e.target.value === "ANY") this.selectedList = this.list;
    else this.selectedList = this.list.filter((d) => d.niv == e.target.value);
  }

  getid(e) {
    console.log(e);
    if (e.target.checked) {
      this.idselected.push(+e.target.value);
      console.log(this.idselected);
    } else {
      this.idselected = this.idselected.filter((id) => id !== +e.target.value);
      console.log(this.idselected);
    }
  }

  /*  onclick(e) {
    console.log(typeof e.target.files[0]);

    this.projetserv.upload(e.target.files[0]).subscribe(
      (event) => {
        console.log(event);
      },
      (err) => {
        console.log(err);
      }
    );
  } */
}
