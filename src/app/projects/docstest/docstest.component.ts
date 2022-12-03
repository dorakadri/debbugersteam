import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { ProjectsService } from "../../Core/Services/projects.service";
import { url } from "../../Core/Modals/project";

@Component({
  selector: "app-docstest",
  templateUrl: "./docstest.component.html",
  styleUrls: ["./docstest.component.css"],
})
export class DocstestComponent implements OnInit, OnChanges {
  filesmessage: (string | Blob) & String;
  url: url = new url();
  @Input() idprojectfordoc: number;
  public file: File = new File([], "");
  constructor(private projetserv: ProjectsService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.file.name);
    if (this.idprojectfordoc !== 0 && this.file.name !== "") {
      this.projetserv.upload(this.file).subscribe(
        (e) => {
          console.log(e.body);
          this.projetserv
            .assignfiletoproject(e.body, this.idprojectfordoc)
            .subscribe();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  onclick(e) {
    this.file = e.target.files[0];
    console.log(this.file.size);
  }
}
