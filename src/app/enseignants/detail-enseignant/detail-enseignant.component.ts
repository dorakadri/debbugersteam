import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enseignant } from '../../Core/Modals/enseignant';
import { EnseignantService } from '../../Core/Services/enseignant.service';
@Component({
  selector: 'app-detail-enseignant',
  templateUrl: './detail-enseignant.component.html',
  styleUrls: ['./detail-enseignant.component.css']
})
export class DetailEnseignantComponent implements OnInit {
  public enseignant: Enseignant;
  public defaultVal:string="not assigned yet";
  constructor(private enseignantService: EnseignantService,
    private router:Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['idenseignant'];
    if(id!=null){
       this.enseignantService.getEnseignantByID(id).subscribe(
        (object: Enseignant)=> {this.enseignant=object
          if(this.enseignant.departement.idDepart!==null)
          {
            this.defaultVal=this.enseignant.departement.nomDepart
          }}
      )}
  }

}
