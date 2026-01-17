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
      tipo TEXT,
      banner_mobile TEXT
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id_video SERIAL PRIMARY KEY,
      video_url TEXT,
      capa_video TEXT,
      ativo BOOLEAN DEFAULT false,

      -- 🔥 ESSENCIAIS PARA CLOUDINARY
      video_public_id TEXT,
      capa_public_id TEXT
    );
  `);

  // 🔁 GARANTIA (caso a tabela já exista)
  await db.query(`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS video_public_id TEXT;
  `);

  await db.query(`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS capa_public_id TEXT;
  `);

  console.log("✅ Migrations executadas com sucesso");
}

migrate();
