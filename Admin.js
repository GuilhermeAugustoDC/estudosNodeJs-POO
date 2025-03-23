import User from "./User.js";

class Admin extends User {
  constructor(nome, email, nascimento, role = "admin", ativo = true) {
    super(nome, email, nascimento, role, ativo);
  }

  criarCurso(nomeCurso, qtdVagas) {
    return `Curso - ${nomeCurso} criado com quantidade de Vagas ${qtdVagas}`;
  }
  excluirCurso(){

  }
  criarPerfil(){

  }
  desativarPerfil(){

  }

}

const novoAdmin = new Admin("Marcola", "m@m.com", "20-5-1999");

