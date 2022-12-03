import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Core/Services/student.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { student } from '../../core/Modals/etudiant';
import { equipe } from '../../core/Modals/equipe';


@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
 title = 'gestion Etudiant';

//studentDetails = null as any;
public studentDetails : student[]=[] ;
list: student []|any=[];
 
 searchText: any;
 
  studentToUpdate = {
    idEtudiant:"",
    nomE:"",
    prenomE:"",
    date_naissance:"",
    option:"",
        departement:""
  }
  constructor(private studentService: StudentService,private router:Router) {
      //this.getStudentsDetails();
   }

  ngOnInit(): void {
      this.studentService.getStudents().subscribe(
      (response : student [])=>{
        this.studentDetails=response;
        console.log(this.studentDetails);

      },
      error=>{
        console.log(error)
      },
      ()=>{}
    )
  }

 displayStyle = "none";
 displayStyle2 = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
   openPopup2() {
    this.displayStyle2 = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
   closePopup2() {
    this.displayStyle2 = "none";
  }
register(registerForm: NgForm) {
    this.studentService.registerStudent(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }
/* 
  getStudentsDetails() {
    this.studentService.getStudents().subscribe(
      (resp) => {
        console.log(resp);
        this.studentDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  } */

  deleteStudent(student:any) {
     let i =this.studentDetails.findIndex(e => e.idEtudiant ===student.idEtudiant);
     console.log(i);
    this.studentService.deleteStudent(student.idEtudiant).subscribe(
      (resp) => {
        console.log(resp);
         this.studentDetails.splice(i,1);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("deleted succefuly");
      }
    );
  }

  edit(studuent: any){
       console.log(studuent);
    this.studentToUpdate = studuent;
         console.log(this.studentToUpdate);
 
  }

  updateStudent(){
    this.studentService.updateStudents(this.studentToUpdate).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  
}
