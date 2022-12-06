import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('htmlData') htmlData!: ElementRef;
  nomUniv;
 public list: University[];
 page:number=1;
  count:number=0;
  tableSize:number=3;
  tableSizes:any=[3,10];

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
     generatePDF() { 
      
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('vewPDF.pdf');
      }); 
  }  


  onTableDataChange(event: any){
    this.page=event;
    this.list;
  }
  OnTableSizeChange(event: any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.list;
  }
}

 




