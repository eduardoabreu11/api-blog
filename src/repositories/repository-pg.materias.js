import db from "../database/postgresql.js";

/* =========================
   MATERIAS
========================= */

async function PegarMaterias() {
  const sql = `
    SELECT *
      FROM materias
     ORDER BY
       ativo DESC,
       ordem ASC NULLS LAST,
       created_at DESC
  `;
  const { rows } = await db.query(sql);
  return rows;
}


async function ListarMaterias() {
  const sql = `
    SELECT *
      FROM materias
     WHERE ativo = true
     ORDER BY
       ordem ASC NULLS LAST,
       created_at DESC
  `;
  const { rows } = await db.query(sql);
  return rows;
}


async function PegarMateria(id_materia) {
  const sql = `
    SELECT *
      FROM materias
     WHERE id_materia = $1
     ORDER BY id_materia DESC
  `;

  const { rows } = await db.query(sql, [id_materia]);
  return rows[0] || null;
}

async function ListarMateria(id_materia) {
  const sql = `
    SELECT *
      FROM materias
     WHERE id_materia = $1
     ORDER BY id_materia DESC
  `;

  const { rows } = await db.query(sql, [id_materia]);
  return rows[0] || null;
}

async function InserirMateria({ titulo, texto, imagem_url, subtitulo }) {
  const sql = `
    INSERT INTO materias (titulo, texto, imagem_url, subtitulo)
    VALUES ($1, $2, $3, $4)
    RETURNING id_materia, titulo, texto, imagem_url, subtitulo
  `;

  const { rows } = await db.query(sql, [
    titulo,
    texto,
    imagem_url,
    subtitulo
  ]);

  return rows[0];
}

async function EditarMateria({
  id_materia,
  titulo,
  texto,
  imagem_url,
  subtitulo,
  ativo,
  ordem
}) {
  const sql = `
    UPDATE materias
       SET titulo     = COALESCE($1, titulo),
           texto      = COALESCE($2, texto),
           imagem_url = COALESCE($3, imagem_url),
           subtitulo  = COALESCE($4, subtitulo),
           ativo      = COALESCE($5, ativo),
           ordem      = COALESCE($6, ordem)
     WHERE id_materia = $7
     RETURNING *
  `;

  const { rows } = await db.query(sql, [
    titulo,
    texto,
    imagem_url,
    subtitulo,
    ativo,
    ordem,
    id_materia
  ]);

  return rows[0];
}


async function ExcluirMateria( id_materia ) {
  const sql = `
    DELETE FROM materias
     WHERE id_materia = $1
  `;

  await db.query(sql, [id_materia]);
  return { id_materia };
}


async function ConfigMateria({ id_materia, ativo, ordem }) {
  const sql = `
    UPDATE materias
       SET ativo = COALESCE($1, ativo),
           ordem = COALESCE($2, ordem)
     WHERE id_materia = $3
     RETURNING *
  `;

  const { rows } = await db.query(sql, [
    ativo,
    ordem,
    id_materia
  ]);

  return rows[0];
}


async function ExisteOrdemAtiva({ ordem, id_materia }) {
  const sql = `
    SELECT 1
      FROM materias
     WHERE ordem = $1
       AND ativo = true
       AND ($2::int IS NULL OR id_materia <> $2)
     LIMIT 1
  `;

  const { rows } = await db.query(sql, [ordem, id_materia || null]);
  return rows.length > 0;
}


/* =========================
   EXPORT
========================= */

export default {
  PegarMateria,
  PegarMaterias,
  ListarMateria,
  ListarMaterias,
  InserirMateria,
  EditarMateria,
  ExcluirMateria,
  ConfigMateria,
  ExisteOrdemAtiva
};