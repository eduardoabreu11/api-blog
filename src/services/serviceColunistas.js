import repoColunistas from "../repositories/repository-pg.colunistas.js";

/* =========================
   COLUNISTAS
========================= */

async function PegarColunistas() {
  return await repoColunistas.PegarColunistas();
}

async function ListarColunistas() {
  return await repoColunistas.ListarColunistas();
}

async function InserirColunista({ nome, foto }) {
  if (!nome || typeof nome !== "string") {
    throw new Error("Nome do colunista é obrigatório");
  }

  if (!foto || typeof foto !== "string") {
    throw new Error("Foto do colunista é inválida");
  }

  return await repoColunistas.InserirColunista({ nome, foto });
}

async function EditarColunista({ nome, foto, id_colunista }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  if (!nome || typeof nome !== "string") {
    throw new Error("Nome do colunista é obrigatório");
  }

  if (foto !== null && typeof foto !== "string") {
    throw new Error("Foto do colunista é inválida");
  }

  const colunistaExistente = await repoColunistas.PegarColunistaPorId(id_colunista);

  if (!colunistaExistente) {
    throw new Error("Colunista não encontrado");
  }

  return await repoColunistas.EditarColunista({
    nome,
    foto,
    id_colunista,
  });
}

async function ExcluirColunista({ id_colunista }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  const colunistaExistente = await repoColunistas.PegarColunistaPorId(id_colunista);

  if (!colunistaExistente) {
    throw new Error("Colunista não encontrado");
  }

  return await repoColunistas.ExcluirColunista({ id_colunista });
}

/* =========================
   POSTS DOS COLUNISTAS
========================= */

async function PegarPosts(id_colunista) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  return await repoColunistas.PegarPosts(id_colunista);
}

async function ListarPosts(id_colunista) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  return await repoColunistas.ListarPosts(id_colunista);
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

  return await repoColunistas.InserirPost({
    titulo,
    texto,
    foto,
    id_colunista,
  });
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

  return await repoColunistas.EditarPost({
    id_colunista,
    id_post_colunista,
    titulo,
    texto,
    foto,
  });
}

async function ExcluirPost({ id_post_colunista, id_colunista }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  if (!id_post_colunista || isNaN(id_post_colunista)) {
    throw new Error("Post inválido");
  }

  return await repoColunistas.ExcluirPost({
    id_post_colunista,
    id_colunista,
  });
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
