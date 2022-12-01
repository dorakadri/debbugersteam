import { Department } from "./department";

export class Enseignant{
    idenseignant: number;
    nom: string;
    prenom: string;
    dateembauche:Date;
    fonction:string;
    departement:Department;
}