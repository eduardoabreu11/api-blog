import repoColunistas from "../repositories/repository-pg.colunistas.js";

/* =========================
   COLUNISTAS
========================= */

async function PegarColunistas() {
  return repoColunistas.PegarColunistas();
}

async function ListarColunistas() {
  return repoColunistas.ListarColunistas();
}

async function InserirColunista({ nome, foto }) {
  if (!nome || typeof nome !== "string") {
    throw new Error("Nome do colunista é obrigatório");
  }

  if (!foto || typeof foto !== "string") {
    throw new Error("Foto do colunista é obrigatória");
  }

  return repoColunistas.InserirColunista({ nome, foto });
}

async function EditarColunista({ id_colunista, nome, foto }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  if (!nome || typeof nome !== "string") {
    throw new Error("Nome do colunista é obrigatório");
  }

  if (foto !== null && typeof foto !== "string") {
    throw new Error("Foto inválida");
  }

  return repoColunistas.EditarColunista({ id_colunista, nome, foto });
}

async function ExcluirColunista({ id_colunista }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  return repoColunistas.ExcluirColunista({ id_colunista });
}

/* =========================
   POSTS DOS COLUNISTAS
========================= */

async function PegarPosts(id_colunista) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  return repoColunistas.PegarPosts(id_colunista);
}

async function ListarPosts(id_colunista) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  return repoColunistas.ListarPosts(id_colunista);
}

async function InserirPost({ id_colunista, titulo, texto, foto }) {
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
    throw new Error("Foto é obrigatória");
  }

  return repoColunistas.InserirPost({
    id_colunista,
    titulo,
    texto,
    foto,
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

  // 🔥 CORREÇÃO DEFINITIVA
  if (foto !== null && typeof foto !== "string") {
    throw new Error("Foto inválida");
  }

  return repoColunistas.EditarPost({
    id_colunista,
    id_post_colunista,
    titulo,
    texto,
    foto,
  });
}

async function ExcluirPost({ id_colunista, id_post_colunista }) {
  if (!id_colunista || isNaN(id_colunista)) {
    throw new Error("Colunista inválido");
  }

  if (!id_post_colunista || isNaN(id_post_colunista)) {
    throw new Error("Post inválido");
  }

  return repoColunistas.ExcluirPost({ id_colunista, id_post_colunista });
}

export default {
  PegarColunistas,
  ListarColunistas,
  InserirColunista,
  EditarColunista,
  ExcluirColunista,
  PegarPosts,
  ListarPosts,
  InserirPost,
  EditarPost,
  ExcluirPost,
};
