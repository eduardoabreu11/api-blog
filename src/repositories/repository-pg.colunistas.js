import db from "../database/postgresql.js";

/* =========================
   COLUNISTAS
========================= */

async function PegarColunistas() {
  const sql = `
    SELECT *
      FROM colunistas
     ORDER BY id_colunista DESC
  `;

  const { rows } = await db.query(sql);
  return rows;
}

async function ListarColunistas() {
  const sql = `
    SELECT *
      FROM colunistas
     ORDER BY id_colunista DESC
  `;

  const { rows } = await db.query(sql);
  return rows;
}

async function InserirColunista({ nome, foto }) {
  const sql = `
    INSERT INTO colunistas (nome, foto)
    VALUES ($1, $2)
    RETURNING id_colunista, nome, foto
  `;

  const { rows } = await db.query(sql, [nome, foto]);
  return rows[0];
}

async function EditarColunista({ nome, foto, id_colunista }) {
  const sql = `
    UPDATE colunistas
       SET nome = COALESCE($1, nome),
           foto = COALESCE($2, foto)
     WHERE id_colunista = $3
     RETURNING id_colunista, nome, foto
  `;

  const { rows } = await db.query(sql, [nome, foto, id_colunista]);
  return rows[0] || null;
}

async function ExcluirColunista({ id_colunista }) {
  const sql = `
    DELETE FROM colunistas
     WHERE id_colunista = $1
  `;

  await db.query(sql, [id_colunista]);
  return { id_colunista };
}

/* =========================
   POSTS DOS COLUNISTAS
========================= */

async function PegarPosts(id_colunista) {
  const sql = `
    SELECT *
      FROM posts_colunistas
     WHERE id_colunista = $1
     ORDER BY id_post_colunista DESC
  `;

  const { rows } = await db.query(sql, [id_colunista]);
  return rows;
}

async function ListarPosts(id_colunista) {
  const sql = `
    SELECT *
      FROM posts_colunistas
     WHERE id_colunista = $1
     ORDER BY id_post_colunista DESC
  `;

  const { rows } = await db.query(sql, [id_colunista]);
  return rows;
}

async function InserirPost({ titulo, texto, foto, id_colunista }) {
  const sql = `
    INSERT INTO posts_colunistas (id_colunista, titulo, foto, texto)
    VALUES ($1, $2, $3, $4)
    RETURNING id_colunista, id_post_colunista, titulo, foto, texto
  `;

  const { rows } = await db.query(sql, [
    id_colunista,
    titulo,
    foto,
    texto
  ]);

  return rows[0];
}

async function EditarPost({
  id_post_colunista,
  id_colunista,
  titulo,
  texto,
  foto
}) {
  const sql = `
    UPDATE posts_colunistas
       SET foto   = COALESCE($1, foto),
           texto  = COALESCE($2, texto),
           titulo = COALESCE($3, titulo)
     WHERE id_colunista = $4
       AND id_post_colunista = $5
     RETURNING id_colunista, id_post_colunista, titulo, foto, texto
  `;

  const { rows } = await db.query(sql, [
    foto,
    texto,
    titulo,
    id_colunista,
    id_post_colunista
  ]);

  return rows[0] || null;
}

async function ExcluirPost({ id_colunista, id_post_colunista }) {
  const sql = `
    DELETE FROM posts_colunistas
     WHERE id_colunista = $1
       AND id_post_colunista = $2
  `;

  await db.query(sql, [id_colunista, id_post_colunista]);
  return id_post_colunista;
}

/* =========================
   EXPORT
========================= */

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
  ExcluirPost
};