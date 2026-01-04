import db from "../database/postgresql.js";

/* =========================
   USUÁRIOS
========================= */

async function Inserir(nome, email, senha) {
  const sql = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id_usuario
  `;

  const { rows } = await db.query(sql, [nome, email, senha]);
  return rows[0];
}

async function ListarByEmail(email) {
  const sql = `
    SELECT *
      FROM usuarios
     WHERE email = $1
  `;

  const { rows } = await db.query(sql, [email]);

  if (rows.length === 0) return [];
  return rows[0];
}

async function ListarById(id_usuario) {
  const sql = `
    SELECT id_usuario, nome, email
      FROM usuarios
     WHERE id_usuario = $1
  `;

  const { rows } = await db.query(sql, [id_usuario]);

  if (rows.length === 0) return [];
  return rows[0];
}

async function Editar(id_usuario, nome, email) {
  const sql = `
    UPDATE usuarios
       SET nome = $1,
           email = $2
     WHERE id_usuario = $3
  `;

  await db.query(sql, [nome, email, id_usuario]);
  return { id_usuario };
}

async function Senha(id_usuario, senha) {
  const sql = `
    UPDATE usuarios
       SET senha = $1
     WHERE id_usuario = $2
  `;

  await db.query(sql, [senha, id_usuario]);
  return { id_usuario };
}

/* =========================
   EXPORT
========================= */

export default {
  Inserir,
  ListarByEmail,
  ListarById,
  Editar,
  Senha
};