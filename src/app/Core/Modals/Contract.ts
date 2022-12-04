import { Student } from "./Student";
import { Team } from "./Team";

export class Contract{
    idContrat:number;
    dateDebutContrat: Date;
    dateFinContrat: Date;
    specialite: string;
    archive: Boolean;
    montantContrat: number;
    // team:Team;
    etudiant:Student;
}