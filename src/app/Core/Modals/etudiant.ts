import { departement } from "./departement";
import { equipe } from "./equipe";

export class student{

    idEtudiant:number;
    nomE:string;
    prenomE:string;
    date_naissance:Date;
    option:string;
    departement:departement;
    equipes:equipe[] | string[];
}