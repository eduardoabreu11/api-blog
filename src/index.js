import "dotenv/config";
import "./database/migration.JS"; // 🚀 roda migrations automaticamente no boot

import express from "express";
import cors from "cors";
import router from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const corsOptions = {
  origin: [
    "https://adm.orufado.com.br",
    "https://orufado.com.br",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Range"],
  credentials: true
};

app.use(cors(corsOptions));

// 🔥 preflight universal (Express 5 compatible)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return cors(corsOptions)(req, res, next);
  }
  next();
});

// arquivos públicos
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/uploads_videos", express.static(path.join(__dirname, "../uploads_videos")));

// rotas da API
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("API rodando na porta", PORT);
});
