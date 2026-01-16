import db from "./postgresql.js";

async function migrate() {
  console.log("🚀 Rodando migrations no PostgreSQL...");

  await db.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario SERIAL PRIMARY KEY,
      nome VARCHAR(50),
      email VARCHAR(100),
      senha VARCHAR(100)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS banners (
      id_banner SERIAL PRIMARY KEY,
      banner TEXT,
      tipo TEXT
    );
  `);

  await db.query(`
    ALTER TABLE banners
    ADD COLUMN IF NOT EXISTS banner_mobile TEXT;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id_video SERIAL PRIMARY KEY,
      video_url TEXT
    );
  `);

  await db.query(`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT false;
  `);

  await db.query(`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS capa_video TEXT;
  `);

  console.log("✅ Migrations executadas com sucesso");
}

migrate();
