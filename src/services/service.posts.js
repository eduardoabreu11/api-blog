import repoPosts from "../repositories/repository-pg.posts.js";

/**
 * Inserir post
 */
async function Inserir(texto, imagem_url, id_usuario, titulo) {
  if (!id_usuario || isNaN(id_usuario)) {
    throw new Error("Usuário inválido");
  }

  if (!titulo || typeof titulo !== "string") {
    throw new Error("Título é obrigatório");
  }

  if (!texto || typeof texto !== "string") {
    throw new Error("Texto é obrigatório");
  }

  const usuario = await repoPosts.Inserir(
    texto,
    imagem_url,
    id_usuario,
    titulo
  );

  return usuario;
}

/**
 * Editar post (admin)
 */
async function Editar({ id_usuario, id_post, texto, imagem_url, titulo }) {
  if (!id_post || isNaN(id_post)) {
    throw new Error("Post inválido");
  }

  if (!titulo || typeof titulo !== "string") {
    throw new Error("Título é obrigatório");
  }

  if (!texto || typeof texto !== "string") {
    throw new Error("Texto é obrigatório");
  }

  const postExistente = await repoPosts.IdPost(id_post);

  if (!postExistente) {
    throw new Error("Post não encontrado");
  }

  const post = await repoPosts.Editar({
    id_usuario,
    id_post,
    texto,
    imagem_url,
    titulo,
  });

  return post;
}

/**
 * Excluir post (admin)
 */
async function Excluir(id_usuario, id_post) {
  if (!id_post || isNaN(id_post)) {
    throw new Error("Post inválido");
  }

  const postExistente = await repoPosts.IdPost(id_post);

  if (!postExistente) {
    throw new Error("Post não encontrado");
  }

  const usuario = await repoPosts.Excluir(id_usuario, id_post);
  return usuario;
}

/**
 * Buscar post específico
 */
async function PostsId(id_usuario, id_post) {
  if (!id_post || isNaN(id_post)) {
    throw new Error("Post inválido");
  }

  const usuario = await repoPosts.PostsId(id_usuario, id_post);

  if (!usuario) {
    throw new Error("Post não encontrado");
  }

  return usuario;
}

/**
 * Listar posts por usuário
 */
async function Posts(id_usuario) {
  if (!id_usuario || isNaN(id_usuario)) {
    throw new Error("Usuário inválido");
  }

  const usuario = await repoPosts.Posts(id_usuario);
  return usuario;
}

/**
 * Listar todos os posts com usuários (admin)
 */
async function PostsUsuarios() {
  const usuario = await repoPosts.PostsUsuarios();
  return usuario;
}

/**
 * Buscar post por ID
 */
async function IdPost(id_post) {
  if (!id_post || isNaN(id_post)) {
    throw new Error("Post inválido");
  }

  const usuario = await repoPosts.IdPost(id_post);

  if (!usuario) {
    throw new Error("Post não encontrado");
  }

  return usuario;
}

export default {
  Inserir,
  Editar,
  Excluir,
  Posts,
  PostsId,
  PostsUsuarios,
  IdPost,
};
