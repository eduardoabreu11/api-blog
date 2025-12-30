import "dotenv/config";
import sqlite3 from "sqlite3";

const SQLite = sqlite3.verbose();

// fallback seguro (local + Render)
const DB_PATH = process.env.DATABASE || "src/database/banco.db";

const db = new SQLite.Database(
  DB_PATH,
  SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Erro ao conectar com o SQLite:", err.message);
    } else {
      console.log("SQLite conectado em:", DB_PATH);
    }
  }
);

function query(command, params = [], method = "all") {
  return new Promise((resolve, reject) => {
    db[method](command, params, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

export { db, query };