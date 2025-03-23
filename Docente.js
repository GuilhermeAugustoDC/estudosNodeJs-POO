import User from "./User.js";

class Docente extends User {
  constructor(nome, email, nascimento, role = "Docente", ativo = true) {
    super(nome, email, nascimento, role, ativo);
  }
  aprovarEstudante(estudante, curso) {
    return `Estudante - ${estudante} passou no curso de ${curso}, docente do curso ${this.nome}`;
  }
  reprovarEstudante() {

  }
  criarPerfil() {
    
  }
}

const novoDocente = new Docente("Juliano", "juliano@ju.com", "30-04-2000");
console.log(novoDocente.aprovarEstudante("Paulo", "PHP"));
