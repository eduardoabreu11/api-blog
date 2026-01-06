import bcrypt from "bcrypt";
import jwt from "../token.js";
import repoUsuario from "../repositories/repository-pg.usuario.js";

/**
 * Inserir usuário
 */
async function Inserir(nome, email, senha) {
  if (!nome || typeof nome !== "string") {
    throw new Error("Nome é obrigatório");
  }

  if (!email || typeof email !== "string") {
    throw new Error("Email é obrigatório");
  }

  if (!senha || typeof senha !== "string") {
    throw new Error("Senha é obrigatória");
  }

  // 🔒 VERIFICA EMAIL DUPLICADO
  const emailExistente = await repoUsuario.ListarByEmail(email);

  if (emailExistente && emailExistente.length > 0) {
    throw new Error("Email já cadastrado");
  }

  const hashSenha = await bcrypt.hash(senha, 10);

  const usuario = await repoUsuario.Inserir(nome, email, hashSenha);

  usuario.token = jwt.CreateJwt(usuario.id_usuario);

  return usuario;
}

/**
 * Login
 */
async function Login(email, senha) {
  if (!email || typeof email !== "string") {
    throw new Error("Email é obrigatório");
  }

  if (!senha || typeof senha !== "string") {
    throw new Error("Senha é obrigatória");
  }

  const usuario = await repoUsuario.ListarByEmail(email);

  if (!usuario || usuario.length === 0) {
    return [];
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return [];
  }

  delete usuario.senha;
  usuario.token = jwt.CreateJwt(usuario.id_usuario);

  return usuario;
}

/**
 * Perfil
 */
async function Perfil(id_usuario) {
  if (!id_usuario || isNaN(id_usuario)) {
    throw new Error("Usuário inválido");
  }

  const usuario = await repoUsuario.ListarById(id_usuario);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return usuario;
}

/**
 * Editar usuário
 */
async function Editar(id_usuario, nome, email) {
  if (!id_usuario || isNaN(id_usuario)) {
    throw new Error("Usuário inválido");
  }

  if (!nome || typeof nome !== "string") {
    throw new Error("Nome é obrigatório");
  }

  if (!email || typeof email !== "string") {
    throw new Error("Email é obrigatório");
  }

  const usuarioAtual = await repoUsuario.ListarById(id_usuario);

  if (!usuarioAtual) {
    throw new Error("Usuário não encontrado");
  }

  // 🔒 VERIFICA EMAIL DUPLICADO (exceto o próprio usuário)
  const emailExistente = await repoUsuario.ListarByEmail(email);

  if (
    emailExistente &&
    emailExistente.length > 0 &&
    emailExistente.id_usuario !== id_usuario
  ) {
    throw new Error("Email já cadastrado");
  }

  const usuario = await repoUsuario.Editar(id_usuario, nome, email);

  return usuario;
}

/**
 * Alterar senha
 */
async function Senha(id_usuario, senha) {
  if (!id_usuario || isNaN(id_usuario)) {
    throw new Error("Usuário inválido");
  }

  if (!senha || typeof senha !== "string") {
    throw new Error("Senha é obrigatória");
  }

  const usuarioAtual = await repoUsuario.ListarById(id_usuario);

  if (!usuarioAtual) {
    throw new Error("Usuário não encontrado");
  }

  const hashSenha = await bcrypt.hash(senha, 10);

  const usuario = await repoUsuario.Senha(id_usuario, hashSenha);

  return usuario;
}

export default {
  Inserir,
  Login,
  Perfil,
  Editar,
  Senha,
};
