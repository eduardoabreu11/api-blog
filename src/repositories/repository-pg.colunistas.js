import db from "../database/postgresql.js";

/* =========================
   COLUNISTAS
========================= */

async function PegarColunistas() {
  const { rows } = await db.query(`
    SELECT *
      FROM colunistas
     ORDER BY id_colunista DESC
  `);
  return rows;
}

async function PegarColunistaPorId(id_colunista) {
  const { rows } = await db.query(
    `SELECT * FROM colunistas WHERE id_colunista = $1`,
    [id_colunista]
  );
  return rows[0] || null;
}

async function ListarColunistas() {
  const { rows } = await db.query(`
    SELECT *
      FROM colunistas
     ORDER BY id_colunista DESC
  `);
  return rows;
}

async function InserirColunista({ nome, foto }) {
  const { rows } = await db.query(
    `
    INSERT INTO colunistas (nome, foto)
    VALUES ($1, $2)
    RETURNING id_colunista, nome, foto
  `,
    [nome, foto]
  );
  return rows[0];
}

async function EditarColunista({ nome, foto, id_colunista }) {
  const { rows } = await db.query(
    `
    UPDATE colunistas
       SET nome = COALESCE($1, nome),
           foto = COALESCE($2, foto)
     WHERE id_colunista = $3
     RETURNING id_colunista, nome, foto
  `,
    [nome, foto, id_colunista]
  );
  return rows[0] || null;
}

async function ExcluirColunista({ id_colunista }) {
  await db.query(`DELETE FROM colunistas WHERE id_colunista = $1`, [id_colunista]);
  return { id_colunista };
}

/* =========================
   POSTS DOS COLUNISTAS
========================= */

async function PegarPosts(id_colunista) {
  const { rows } = await db.query(
    `
    SELECT
      p.id_post_colunista,
      p.titulo,
      p.texto,
      p.foto,
      p.created_at,
      c.nome AS nome_colunista
    FROM posts_colunistas p
    JOIN colunistas c ON c.id_colunista = p.id_colunista
    WHERE p.id_colunista = $1
    ORDER BY p.created_at DESC
    `,
    [id_colunista]
  );

  return rows;
}

async function ListarPosts(id_colunista) {
  const { rows } = await db.query(
    `
    SELECT
      p.id_post_colunista,
      p.titulo,
      p.texto,
      p.foto,
      p.created_at,
      c.nome AS nome_colunista
    FROM posts_colunistas p
    JOIN colunistas c ON c.id_colunista = p.id_colunista
    WHERE p.id_colunista = $1
    ORDER BY p.created_at DESC
    `,
    [id_colunista]
  );

  return rows;
}

async function InserirPost({ titulo, texto, foto, id_colunista }) {
  const { rows } = await db.query(
    `
    INSERT INTO posts_colunistas (id_colunista, titulo, foto, texto)
    VALUES ($1, $2, $3, $4)
    RETURNING id_colunista, id_post_colunista, titulo, foto, texto
  `,
    [id_colunista, titulo, foto, texto]
  );
  return rows[0];
}

async function EditarPost({ id_post_colunista, id_colunista, titulo, texto, foto }) {
  const { rows } = await db.query(
    `
    UPDATE posts_colunistas
       SET foto   = COALESCE($1, foto),
           texto  = COALESCE($2, texto),
           titulo = COALESCE($3, titulo)
     WHERE id_colunista = $4
       AND id_post_colunista = $5
     RETURNING id_colunista, id_post_colunista, titulo, foto, texto
  `,
    [foto, texto, titulo, id_colunista, id_post_colunista]
  );
  return rows[0] || null;
}

async function ExcluirPost({ id_colunista, id_post_colunista }) {
  await db.query(
    `
    DELETE FROM posts_colunistas
     WHERE id_colunista = $1
       AND id_post_colunista = $2
  `,
    [id_colunista, id_post_colunista]
  );
  return id_post_colunista;
}

export default {
  PegarColunistas,
  PegarColunistaPorId,
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
