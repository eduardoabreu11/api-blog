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
     MIDIAS FOOTER (CARROSSEL)
  ========================= */
  await db.query(`
    CREATE TABLE IF NOT EXISTS midias_footer (
      id_midia SERIAL PRIMARY KEY,

      id_post INTEGER REFERENCES posts(id_post) ON DELETE CASCADE,
      id_materia INTEGER REFERENCES materias(id_materia) ON DELETE CASCADE,

      imagem_url TEXT NOT NULL,
      imagem_public_id TEXT,

      created_at TIMESTAMP DEFAULT NOW(),

      CHECK (
        (id_post IS NOT NULL AND id_materia IS NULL)
        OR
        (id_post IS NULL AND id_materia IS NOT NULL)
      )
    );
  `);

  /* =========================
     ÍNDICES (PERFORMANCE)
  ========================= */
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_midias_footer_post
    ON midias_footer (id_post);
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_midias_footer_materia
    ON midias_footer (id_materia);
  `);

  console.log("✅ Migrations executadas com sucesso");
}

migrate()
  .then(() => process.exit())
  .catch(err => {
    console.error("❌ Erro ao rodar migrations:", err);
    process.exit(1);
  });
