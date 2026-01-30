import db from "../database/postgresql.js";

/* =========================
   MIDIAS FOOTER
========================= */

async function Inserir({
  id_post,
  id_materia,
  imagem_url,
  imagem_public_id
}) {
  const sql = `
    INSERT INTO midias_footer (
      id_post,
      id_materia,
      imagem_url,
      imagem_public_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const { rows } = await db.query(sql, [
    id_post || null,
    id_materia || null,
    imagem_url,
    imagem_public_id
  ]);

  return rows[0];
}

async function ListarPorPost(id_post) {
  const sql = `
    SELECT *
      FROM midias_footer
     WHERE id_post = $1
     ORDER BY created_at ASC
  `;

  const { rows } = await db.query(sql, [id_post]);
  return rows;
}

async function ListarPorMateria(id_materia) {
  const sql = `
    SELECT *
      FROM midias_footer
     WHERE id_materia = $1
     ORDER BY created_at ASC
  `;

  const { rows } = await db.query(sql, [id_materia]);
  return rows;
}

async function PegarPorId(id_midia) {
  const sql = `
    SELECT *
      FROM midias_footer
     WHERE id_midia = $1
  `;

  const { rows } = await db.query(sql, [id_midia]);
  return rows[0] || null;
}

async function Editar({
  id_midia,
  imagem_url,
  imagem_public_id
}) {
  const sql = `
    UPDATE midias_footer
       SET imagem_url = COALESCE($1, imagem_url),
           imagem_public_id = COALESCE($2, imagem_public_id)
     WHERE id_midia = $3
     RETURNING *
  `;

  const { rows } = await db.query(sql, [
    imagem_url,
    imagem_public_id,
    id_midia
  ]);

  return rows[0];
}

async function Excluir(id_midia) {
  const sql = `
    DELETE FROM midias_footer
     WHERE id_midia = $1
  `;

  await db.query(sql, [id_midia]);
}

export default {
  Inserir,
  ListarPorPost,
  ListarPorMateria,
  PegarPorId,
  Editar,
  Excluir
};
