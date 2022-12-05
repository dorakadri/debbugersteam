import { Component, OnInit } from '@angular/core';
import { TeamService } from './../../Core/Services/team.service';
import { Team } from '../../Core/Modals/Team';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {
list:Team[];
public filterTexts:String='';
page:number=1;
count:number=0;
tableSize:number=5;
tableSizes:any=[5,10];
  constructor(private serviceTeam:TeamService) { }

  ngOnInit(): void {
    this.TeamListes();
  }


  TeamListes(): void {
    this.serviceTeam.getAllTeam().subscribe(
      (data:Team[])=>{
        this.list=data;
        console.log(this.list)
       }
    )
  }

deleteEquipe(tea:Team){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      let i = this.list.indexOf(tea);
        this.serviceTeam.deleteEquipe(tea.idEquipe).subscribe(
          ()=>{this.list.splice(i,1)}
        )
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

    
    
  }

  onTableDataChange(event: any){
    this.page=event;
    this.TeamListes();
  }
  OnTableSizeChange(event: any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.TeamListes();
  }

}

