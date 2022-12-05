import { Component, OnInit } from '@angular/core';
import { University } from '../../Core/Modals/university';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UniversityService } from '../../Core/Services/university.service';
@Component({
  selector: 'app-list-universite',
  templateUrl: './list-universite.component.html',
  styleUrls: ['./list-universite.component.css']
})
export class ListUniversiteComponent implements OnInit {
  nomUniv;
 public list: University[];
 
  constructor(private univService: UniversityService) { }

  ngOnInit(): void {
     this.univService.getAllUniversity().subscribe(
     (data:University[])=>{
      this.list=data;
      console.log(this.list);
      console.log(data);
       })
      
       
  }

  deleteClick(idUniv) {
    if (confirm('Are you sure to delete this project')){
    console.log(idUniv);
    let i =this.list.findIndex(e => e.idUniv ===idUniv)
    this.univService.delete(idUniv).subscribe(
      (res:any)=>{
        console.log("bjbjb");
       
          this.list.splice(i,1)
        },(err)=>{console.log(err)},()=>{console.log("aghj")})
        
      } 
    
  }
 

    Search() {
    if (this.nomUniv != "") {
      this.list = this.list.filter(res => {
        return res.nomUniv.toLocaleLowerCase().match(this.nomUniv.toLocaleLowerCase());
      });
    } else if (this.nomUniv == "") {
      this.ngOnInit();
    }

  }
   //code pour convertir le tableau au pdf
   /*  generatePDF() { 
      
  var data = document.getElementById('contentToConvert');
   html2canvas(data).then(canvas => {
     var imgWidth = 208;
     var imgHeight = canvas.height * imgWidth / canvas.width;
     const contentDataURL = canvas.toDataURL('image/png')
     let PDF = new jsPDF('p', 'mm', 'a4');
     var position = 0;
     PDF.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
     PDF.save('newPDF.pdf');
   }); 
  }  */

}

 




