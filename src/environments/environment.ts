
const contracts= "http://localhost:8081/SpringMVC/ContratApi/"
const students= "http://localhost:8081/SpringMVC/EtudiantApi/"
export const environment = {
  production: false,
  endpoints:{
    contracts:{
      getAll:contracts+"getAll",
      post:contracts+"post",
      delete: contracts+"delete/",
      get: contracts+"get/",
      update: contracts+"update",
      affectContractToStudent: contracts+"affectContratToEtudiant",
    },
    students:{
      getAll:students+"getAll"
    }
  }
};
