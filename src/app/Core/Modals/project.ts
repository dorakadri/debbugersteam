import { equipe } from "./equipe";

export class projet {
  idProjet: number;
  nomProjet: string;
  client: string;
  decription: string;
  deadline: Date;
  etat: string;
  field: string;
  equipes: equipe[] | string[];
  // equipestring!:string ;
}

export class url {
  name: string;
  size: number;
  type: string;
  url: string;
}
