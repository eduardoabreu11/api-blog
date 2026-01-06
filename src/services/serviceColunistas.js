import repoColunistas from "../repositories/repository-pg.colunistas.js";

/* =========================
   COLUNISTAS
========================= */

async function PegarColunistas() {
  const usuario = await repoColunistas.PegarColunistas();
  return usuario;
}

async function ListarColunistas() {
  const usuario = await repoColunistas.ListarColunistas();
  return usuario;
}

async function InserirColunista({ nome, foto }) {
  if (!nome || typeof nome !== "string") {
    throw new Error("Nome do colunista é obrigatório");
  }

  if (!foto || typeof foto !== "string") {
    throw new Error("Foto do colunista é inválida");
  }

  const usuario = await repoColunistas.InserirColunista({ nome, foto });
  return usuario;
}

async function EditarColunista({ nome, foto, id_colunista }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  if (!nome || typeof nome !== "string") {
    throw new Error("Nome do colunista é obrigatório");
  }

  if (!foto || typeof foto !== "string") {
    throw new Error("Foto do colunista é inválida");
  }

  const colunistaExistente = await repoColunistas.PegarColunistas(id_colunista);

  if (!colunistaExistente) {
    throw new Error("Colunista não encontrado");
  }

  const post = await repoColunistas.EditarColunista({
    nome,
    foto,
    id_colunista,
  });

  return post;
}

async function ExcluirColunista({ id_colunista }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  const colunistaExistente = await repoColunistas.PegarColunistas(id_colunista);

  if (!colunistaExistente) {
    throw new Error("Colunista não encontrado");
  }

  const usuario = await repoColunistas.ExcluirColunista({ id_colunista });
  return usuario;
}

/* =========================
   POSTS DOS COLUNISTAS
========================= */

async function PegarPosts(id_colunista) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  const post = await repoColunistas.PegarPosts(id_colunista);
  return post;
}

async function ListarPosts(id_colunista) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  const post = await repoColunistas.ListarPosts(id_colunista);
  return post;
}

async function InserirPost({ titulo, texto, foto, id_colunista }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  if (!titulo || typeof titulo !== "string") {
    throw new Error("Título é obrigatório");
  }

  if (!texto || typeof texto !== "string") {
    throw new Error("Texto é obrigatório");
  }

  if (!foto || typeof foto !== "string") {
    throw new Error("Foto inválida");
  }

  const post = await repoColunistas.InserirPost({
    titulo,
    texto,
    foto,
    id_colunista,
  });

  return post;
}

async function EditarPost({
  id_colunista,
  id_post_colunista,
  titulo,
  texto,
  foto,
}) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  if (!id_post_colunista || isNaN(id_post_colunista)) {
    throw new Error("Post inválido");
  }

  if (!titulo || typeof titulo !== "string") {
    throw new Error("Título é obrigatório");
  }

  if (!texto || typeof texto !== "string") {
    throw new Error("Texto é obrigatório");
  }

  if (!foto || typeof foto !== "string") {
    throw new Error("Foto inválida");
  }

  const post = await repoColunistas.EditarPost({
    id_colunista,
    id_post_colunista,
    titulo,
    texto,
    foto,
  });

  return post;
}

async function ExcluirPost({ id_post_colunista, id_colunista }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  if (!id_post_colunista || isNaN(id_post_colunista)) {
    throw new Error("Post inválido");
  }

  const post = await repoColunistas.ExcluirPost({
    id_post_colunista,
    id_colunista,
  });

  return post;
}

export default {
  PegarColunistas,
  InserirColunista,
  EditarColunista,
  ExcluirColunista,
  ListarColunistas,
  ListarPosts,
  PegarPosts,
  InserirPost,
  EditarPost,
  ExcluirPost,
};
