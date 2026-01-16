import db from "../database/postgresql.js";

/**
 * Buscar banner por ID
 */
async function PegarBanner(id_banner) {
  const sql = `
    SELECT id_banner, banner, tipo
      FROM banners
     WHERE id_banner = $1
  `;
  const { rows } = await db.query(sql, [id_banner]);
  return rows[0] || null;
}

async function ListarBanners() {
  const sql = `
    SELECT id_banner, banner, tipo
      FROM banners
  `;
  const { rows } = await db.query(sql);
  return rows;
}

/**
 * Inserir banner
 */
async function InserirBanner({ banner, banner_mobile, tipo }) {
  const sql = `
    INSERT INTO banners (banner, banner_mobile, tipo)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const { rows } = await db.query(sql, [banner, banner_mobile, tipo]);
  return rows[0];
}


/**
 * Editar banner
 */
async function EditarBanner({ id_banner, banner, banner_mobile, tipo }) {
  const sql = `
    UPDATE banners
       SET banner        = COALESCE($1, banner),
           banner_mobile = COALESCE($2, banner_mobile),
           tipo          = COALESCE($3, tipo)
     WHERE id_banner = $4
     RETURNING *
  `;

  const { rows } = await db.query(sql, [
    banner,
    banner_mobile,
    tipo,
    id_banner
  ]);

  return rows[0] || null;
}

export default {
  EditarBanner,
  PegarBanner,
  InserirBanner,
  ListarBanners
};