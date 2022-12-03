import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectsRoutingModule } from "./projects-routing.module";
import { ListprojectComponent } from "./listproject/listproject.component";
import { DetailprojectComponent } from "./detailproject/detailproject.component";

import { FormComponent } from "./form/form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchComponent } from "./search/search.component";
import { DocstestComponent } from "./docstest/docstest.component";

@NgModule({
  declarations: [
    ListprojectComponent,
    DetailprojectComponent,
    FormComponent,
    SearchComponent,
    DocstestComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProjectsModule {}
