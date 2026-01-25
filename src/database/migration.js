import db from "./postgresql.js";

async function migrate() {
  console.log("🚀 Rodando migrations no PostgreSQL...");

  /* =========================
     USUÁRIOS
  ========================= */
  await db.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario SERIAL PRIMARY KEY,
      nome VARCHAR(50),
      email VARCHAR(100),
      senha VARCHAR(100)
    );
  `);

  /* =========================
     BANNERS
  ========================= */
  await db.query(`
    CREATE TABLE IF NOT EXISTS banners (
      id_banner SERIAL PRIMARY KEY,
      banner TEXT,
      banner_public_id TEXT,
      banner_mobile TEXT,
      banner_mobile_public_id TEXT,
      tipo TEXT
    );
  `);

  await db.query(`
    ALTER TABLE banners
    ADD COLUMN IF NOT EXISTS banner_public_id TEXT;
  `);

  await db.query(`
    ALTER TABLE banners
    ADD COLUMN IF NOT EXISTS banner_mobile_public_id TEXT;
  `);

  /* =========================
     VÍDEOS
  ========================= */
  await db.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id_video SERIAL PRIMARY KEY,
      video_url TEXT,
      capa_video TEXT,
      ativo BOOLEAN DEFAULT false,
      video_public_id TEXT,
      capa_public_id TEXT
    );
  `);

  await db.query(`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS video_public_id TEXT;
  `);

  await db.query(`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS capa_public_id TEXT;
  `);

  /* =========================
     POSTS
  ========================= */
  await db.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id_post SERIAL PRIMARY KEY,
      id_usuario INTEGER REFERENCES usuarios(id_usuario),
      titulo TEXT,
      texto TEXT,
      imagem_url TEXT,
      imagem_public_id TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      ativo BOOLEAN DEFAULT true,
      ordem INTEGER
    );
  `);

  // Se a tabela já existia antes, garante que as colunas existam:
  await db.query(`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS id_usuario INTEGER;
  `);

  // tenta criar a FK (se já existir, ignora no catch)
  try {
    await db.query(`
      ALTER TABLE posts
      ADD CONSTRAINT posts_id_usuario_fk
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);
    `);
  } catch (e) {}

  await db.query(`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS imagem_public_id TEXT;
  `);

  await db.query(`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();
  `);

  await db.query(`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;
  `);

  await db.query(`
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS ordem INTEGER;
  `);

  /* =========================
     MATÉRIAS
  ========================= */
  await db.query(`
    CREATE TABLE IF NOT EXISTS materias (
      id_materia SERIAL PRIMARY KEY,
      titulo TEXT,
      subtitulo TEXT,
      texto TEXT,
      imagem_url TEXT,
      imagem_public_id TEXT
    );
  `);

  await db.query(`
    ALTER TABLE materias
    ADD COLUMN IF NOT EXISTS imagem_public_id TEXT;
  `);

  await db.query(`
    ALTER TABLE materias
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();
  `);

  /* =========================
     COLUNISTAS
  ========================= */
  await db.query(`
    CREATE TABLE IF NOT EXISTS colunistas (
      id_colunista SERIAL PRIMARY KEY,
      nome TEXT,
      foto TEXT,
      foto_public_id TEXT
    );
  `);

  await db.query(`
    ALTER TABLE colunistas
    ADD COLUMN IF NOT EXISTS foto_public_id TEXT;
  `);

  /* =========================
     POSTS DOS COLUNISTAS
  ========================= */
  await db.query(`
    CREATE TABLE IF NOT EXISTS posts_colunistas (
      id_post_colunista SERIAL PRIMARY KEY,
      id_colunista INTEGER REFERENCES colunistas(id_colunista),
      titulo TEXT,
      texto TEXT,
      foto TEXT,
      foto_public_id TEXT
    );
  `);

  await db.query(`
    ALTER TABLE posts_colunistas
    ADD COLUMN IF NOT EXISTS foto_public_id TEXT;
  `);

  await db.query(`
    ALTER TABLE posts_colunistas
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();
  `);

  console.log("✅ Migrations executadas com sucesso");
}

migrate();
