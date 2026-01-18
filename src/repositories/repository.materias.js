import db from "../database/postgresql.js";

/* =========================
   MATERIAS
========================= */

async function PegarMaterias() {
  const sql = `
    SELECT *
      FROM materias
     ORDER BY id_materia DESC
  `;

  const { rows } = await db.query(sql);
  return rows;
}

async function ListarMaterias() {
  const sql = `
    SELECT *
      FROM materias
     ORDER BY id_materia DESC
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
  subtitulo
}) {
  const sql = `
    UPDATE materias
       SET titulo      = COALESCE($1, titulo),
           texto       = COALESCE($2, texto),
           imagem_url  = COALESCE($3, imagem_url),
           subtitulo   = COALESCE($4, subtitulo)
     WHERE id_materia = $5
     RETURNING id_materia, titulo, texto, imagem_url, subtitulo
  `;

  const { rows } = await db.query(sql, [
    titulo,
    texto,
    imagem_url,
    subtitulo,
    id_materia
  ]);

  return rows[0] || null;
}

async function ExcluirMateria(id_materia) {
  const sql = `
    DELETE FROM materias
     WHERE id_materia = $1
  `;

  await db.query(sql, [id_materia]);

  return { id_materia };
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
  ExcluirMateria
};