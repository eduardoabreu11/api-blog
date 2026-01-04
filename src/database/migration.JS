import db from "./postgresql.js";

async function migrate() {
  console.log("🚀 Criando tabelas no PostgreSQL...");

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
    CREATE TABLE IF NOT EXISTS colunistas (
      id_colunista SERIAL PRIMARY KEY,
      nome TEXT,
      foto TEXT
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id_post SERIAL PRIMARY KEY,
      id_usuario INTEGER REFERENCES usuarios(id_usuario),
      texto TEXT,
      imagem_url TEXT,
      titulo TEXT
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS posts_colunistas (
      id_post_colunista SERIAL PRIMARY KEY,
      id_colunista INTEGER REFERENCES colunistas(id_colunista),
      titulo TEXT,
      foto TEXT,
      texto TEXT
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS materias (
      id_materia SERIAL PRIMARY KEY,
      titulo TEXT,
      subtitulo TEXT,
      texto TEXT,
      imagem_url TEXT
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id_video SERIAL PRIMARY KEY,
      video_url TEXT
    );
  `);

  console.log("✅ Migration concluída");
  process.exit();
}

migrate();