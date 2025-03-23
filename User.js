import chalk from "chalk";
import * as utils from "./utils.js";
import { json } from "stream/consumers";
import fs from "fs/promises";

const jsonPath = "./users.json";

export default class User {
  constructor(nome, email, nascimento, role, ativo = true, id) {
    this.nome = nome;
    this.email = email;
    this.nascimento = nascimento;
    this.role = role;
    this.ativo = ativo;
    this.id = id;
  }

  static async listarUsuarios() {
    try {
      const users = await utils.readUsers(jsonPath);
      return users;
    } catch (err) {
      console.error(`Erro: `, err);
    }
  }

  static async criarUsuario(nome, email, nascimento, role, ativo = true, id) {
    try {
      const novoUsuario = new User(nome, email, nascimento, role, ativo, id);
      const users = await this.listarUsuarios();
      users.push(novoUsuario);
      await fs.writeFile(jsonPath, JSON.stringify(users, null, 2));
      console.log(`Usuario criado com sucesso `);
      return novoUsuario;
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
    }
  }
  static async buscarUsuarioPorID(id) {
    try {
      const users = await this.listarUsuarios();
      return users.find((user) => user.id === id) || null;
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
    }
  }

  static async atualizarUsuario(id, novosDados) {
    try {
      let users = await User.listarUsuarios();
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) throw new Error("Usuário não encontrado");
      users[index] = { ...users[index], ...novosDados };
      await fs.writeFile(jsonPath, JSON.stringify(users, null, 2));
      console.log(`Usuário atualizado com sucesso!`);
      return users[index];
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  }

  static async deletarUsuarioPorID(id) {
    try {
      let users = await User.listarUsuarios();
      users = users.filter((user) => user.id !== id);
      await fs.writeFile(jsonPath, JSON.stringify(users, null, 2));
      console.log(`Usuário removido com sucesso!`);
    } catch (err) {
      console.error("Erro ao remover usuário:", err);
    }
  }
}

//* Teste de criar um usuario.
//! Modifique os DADOS para testar.

// await User.criarUsuario(
//   "Guilherme Dias - TESTE",
//   "guiemail121@gmail.com",
//   "15-12-2009",
//   "Programador",
//   true,
//   4
// );
// console.log(`\nUsuario criado com sucesso\n`);

//* Teste de listar todos os usuarios.

// console.log(
//   `Lista de todos os usuarios. \n `,
//   await User.listarUsuarios(),
//   `\n`
// );

//* Teste de buscar usuario por ID.
//! Modifique o ID para testar.

// const id = 2;
// console.log(
//   `Usuario com ID ${id} encontado. \n `,
//   await User.buscarUsuarioPorID(id),
//   `\n`
// );

//* Teste atualizar usuario por ID
//! Modifique os dados para alterar.
//? O parametro ID é do usuario que será alterado.

// const id = 0;
// await User.atualizarUsuario(id, {
//   nome: "Liliana Dantas",
//   email: "lilianaDantas@gmail.com",
//   nascimento: "18-05-1995",
//   role: "Assistente",
//   ativo: false,
//   id: 0,
// });

//* Teste deletar usuario por ID
//! Modifique os dados para alterar.
//? O parametro ID é do usuario que será deletado.

// const id = 0
// await User.deletarUsuarioPorID(id)
