import db from "./postgresql.js";

async function migrate() {
  console.log("🚀 Rodando migrations no PostgreSQL...");

  await db.query(`
    ALTER TABLE banners
    ADD COLUMN IF NOT EXISTS banner_mobile TEXT;
  `);

  console.log("✅ Migrations executadas com sucesso");
}

migrate();