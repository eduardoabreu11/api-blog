import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// habilitar __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// body json
app.use(express.json());

// ✅ CORS CORRETO (PUT, POST, DELETE, OPTIONS)
app.use(cors({
  origin: [
    "https://adm.orufado.com.br",
    "https://orufado.com.br",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Range"
  ],
  exposedHeaders: [
    "Content-Range",
    "Accept-Ranges",
    "Content-Length"
  ],
  credentials: true
}));

// 📂 imagens públicas
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 🎥 vídeos públicos
app.use(
  "/uploads_videos",
  express.static(path.join(__dirname, "../uploads_videos"))
);

// rotas da API
app.use(router);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});