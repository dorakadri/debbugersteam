import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { ProjectsService } from '../../Core/Services/projects.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public projectForm: FormGroup;
  constructor(private builder: FormBuilder) { }
  ngOnInit(): void {
    this.projectForm= this.builder.group(
      {
        'nomProjet':[Validators.required, Validators.minLength(3)],
         'client': [Validators.required,Validators.pattern("[A-Za-z ]")],
         'decription':[Validators.required, Validators.minLength(3)],
         'deadline':[Validators.required, Validators.minLength(3)],
         'field':[Validators.required, Validators.minLength(3)],
      }
    )
 
  }
save(){
  if(this.projectForm.valid){
    console.log(this.projectForm.value);

  }



}





}
