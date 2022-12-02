import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { ProjectsService } from "../../Core/Services/projects.service";
import { url } from "../../Core/Modals/project";

@Component({
  selector: "app-docstest",
  templateUrl: "./docstest.component.html",
  styleUrls: ["./docstest.component.css"],
})
export class DocstestComponent implements OnInit {
  filesmessage: (string | Blob) & String;
  url: url = new url();

  constructor(private projetserv: ProjectsService) {}

  ngOnInit(): void {}

  onUploadfiles(files: File): void {
    const formData = new FormData();
    console.log("//////////////");
    console.log(files);
    console.log("//////////////");
    formData.append("filef", files);
    console.log(formData.append("filef", files));
    this.projetserv.upload(files).subscribe(
      (event) => {
        console.log(event);
        // this.reportProgress(event);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onclick(e) {
    console.log(typeof e.target.files[0]);

    this.projetserv.upload(e.target.files[0]).subscribe(
      (event) => {
        console.log(event);
        // this.reportProgress(event);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  reportProgress(httpEvent: HttpEvent<string | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, "Uploading");

        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, "downloading");

        break;

      case HttpEventType.ResponseHeader:
        console.log("header returned", httpEvent);
        break;

      case HttpEventType.Response:
        if (httpEvent.body instanceof String) {
          this.filesmessage = httpEvent.body;
        } else {
          console.log(httpEvent.headers.get("Content-Disposition"));
        }
        break;
      default:
        console.log(httpEvent);
    }
  }
  updateStatus(loaded: number, total: number, requestType: string) {
    // this.fileStatus.status= "progress";
    // this.fileStatus.requestType= requestType ;
    //this.fileStatus.percent=Math.round(100* loaded /total);
  }

  onDownloadfiles(fileid: number): void {
    this.projetserv.download(fileid).subscribe(
      (event) => {
        console.log(event);
        //  this.reportProgress(event);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  display() {
    this.projetserv.dispaly().subscribe((e) => {
      this.url = e[3];
      console.log(this.url.url);
    });
  }
}
