import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FormStudentComponent } from './students/form-student/form-student.component';
import { ListStudentComponent } from './students/list-student/list-student.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FormStudentComponent,
    ListStudentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
