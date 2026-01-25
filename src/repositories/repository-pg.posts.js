import db from "../database/postgresql.js";

/* =========================
   POSTS
========================= */

async function Inserir(texto, imagem_url, id_usuario, titulo) {
  const sql = `
    INSERT INTO posts (texto, imagem_url, id_usuario, titulo)
    VALUES ($1, $2, $3, $4)
    RETURNING id_post, texto, imagem_url, id_usuario, titulo
  `;

  const { rows } = await db.query(sql, [
    texto,
    imagem_url,
    id_usuario,
    titulo
  ]);

  return rows[0];
}

async function Editar({ id_usuario, id_post, texto, imagem_url, titulo }) {
  const sql = `
    UPDATE posts
       SET texto      = COALESCE($1, texto),
           imagem_url = COALESCE($2, imagem_url),
           titulo     = COALESCE($3, titulo)
     WHERE id_usuario = $4
       AND id_post = $5
     RETURNING id_post, texto, imagem_url, titulo, id_usuario
  `;

  const { rows } = await db.query(sql, [
    texto,
    imagem_url,
    titulo,
    id_usuario,
    id_post
  ]);

  return rows[0] || null;
}

async function PostsId(id_usuario, id_post) {
  const sql = `
    SELECT *
      FROM posts
     WHERE id_usuario = $1
       AND id_post = $2
  `;

  const { rows } = await db.query(sql, [id_usuario, id_post]);
  return rows[0] || null;
}

async function Posts(id_usuario) {
  const sql = `
    SELECT *
      FROM posts
     ORDER BY created_at DESC
  `;

  const { rows } = await db.query(sql);
  return rows;
}


async function PostsUsuarios() {
  const sql = `
    SELECT *
      FROM posts
     WHERE ativo = true
     ORDER BY ordem ASC NULLS LAST, created_at DESC
     LIMIT 10
  `;

  const { rows } = await db.query(sql);
  return rows;
}



async function IdPost(id_post) {
  const sql = `
    SELECT *
      FROM posts
     WHERE id_post = $1
  `;

  const { rows } = await db.query(sql, [id_post]);
  return rows[0] || null;
}

async function Excluir(id_usuario, id_post) {
  const sql = `
    DELETE FROM posts
     WHERE id_usuario = $1
       AND id_post = $2
  `;

  await db.query(sql, [id_usuario, id_post]);
  return { id_post };
}

async function Configurar({ id_post, ativo, ordem }) {
  const sql = `
    UPDATE posts
       SET ativo = COALESCE($1, ativo),
           ordem = COALESCE($2, ordem)
     WHERE id_post = $3
     RETURNING *
  `;

  const { rows } = await db.query(sql, [ativo, ordem, id_post]);
  return rows[0];
}


/* =========================
   EXPORT
========================= */

export default {
  Inserir,
  Posts,
  PostsId,
  Editar,
  Excluir,
  PostsUsuarios,
  IdPost,
  Configurar
};