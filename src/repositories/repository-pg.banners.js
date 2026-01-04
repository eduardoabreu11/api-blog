import db from "../database/postgresql.js";

/**
 * Buscar banner por ID
 */
async function PegarBanner(id_banner) {
  const sql = `
    SELECT id_banner, banner
      FROM banners
     WHERE id_banner = $1
  `;

  const { rows } = await db.query(sql, [id_banner]);
  return rows[0] || null;
}

/**
 * Listar todos os banners
 */
async function ListarBanners() {
  const sql = `SELECT * FROM banners`;
  const { rows } = await db.query(sql);
  return rows;
}

/**
 * Inserir banner
 */
async function InserirBanner(fotoUrl) {
  const sql = `
    INSERT INTO banners (banner)
    VALUES ($1)
    RETURNING id_banner
  `;

  const { rows } = await db.query(sql, [fotoUrl]);
  return rows[0];
}

/**
 * Editar banner
 */
async function EditarBanner({ id_banner, foto }) {
  const sql = `
    UPDATE banners
       SET banner = COALESCE($1, banner)
     WHERE id_banner = $2
     RETURNING id_banner, banner
  `;

  const { rows } = await db.query(sql, [foto, id_banner]);
  return rows[0] || null;
}

export default {
  EditarBanner,
  PegarBanner,
  InserirBanner,
  ListarBanners
};