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
      ativo BOOLEAN DEFAULT true
    );
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
      imagem_public_id TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      ativo BOOLEAN DEFAULT true
    );
  `);

  /* =========================
     MIDIAS FOOTER
  ========================= */
  await db.query(`
    CREATE TABLE IF NOT EXISTS midias_footer (
      id_midia SERIAL PRIMARY KEY,
      imagem_url TEXT NOT NULL,
      imagem_public_id TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  /* =========================
     COLUNAS DEFENSIVAS
  ========================= */
  await db.query(`
    ALTER TABLE midias_footer
    ADD COLUMN IF NOT EXISTS id_post INTEGER;
  `);

  await db.query(`
    ALTER TABLE midias_footer
    ADD COLUMN IF NOT EXISTS id_materia INTEGER;
  `);

    /* =========================
     REMOVER LIXO ANTIGO
  ========================= */
  await db.query(`
    ALTER TABLE midias_footer
    DROP COLUMN IF EXISTS tipo_ref;
  `);

  await db.query(`
    ALTER TABLE midias_footer
    DROP COLUMN IF EXISTS id_ref CASCADE;
  `);

  /* =========================
     FOREIGN KEYS
  ========================= */
  try {
    await db.query(`
      ALTER TABLE midias_footer
      ADD CONSTRAINT fk_midias_footer_post
      FOREIGN KEY (id_post)
      REFERENCES posts(id_post)
      ON DELETE CASCADE;
    `);
  } catch {}

  try {
    await db.query(`
      ALTER TABLE midias_footer
      ADD CONSTRAINT fk_midias_footer_materia
      FOREIGN KEY (id_materia)
      REFERENCES materias(id_materia)
      ON DELETE CASCADE;
    `);
  } catch {}

  /* =========================
     CHECK (OU POST OU MATÉRIA)
  ========================= */
  try {
    await db.query(`
      ALTER TABLE midias_footer
      ADD CONSTRAINT chk_midias_footer_ref
      CHECK (
        (id_post IS NOT NULL AND id_materia IS NULL)
        OR
        (id_post IS NULL AND id_materia IS NOT NULL)
      );
    `);
  } catch {}

  console.log("✅ Migrations executadas com sucesso");
}

migrate()
  .then(() => process.exit())
  .catch(err => {
    console.error("❌ Erro ao rodar migrations:", err);
    process.exit(1);
  });
