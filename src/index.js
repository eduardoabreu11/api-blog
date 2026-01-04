import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "HEAD", "OPTIONS"],
  allowedHeaders: ["Range", "Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "Accept-Ranges", "Content-Length"]
}));

// imagens
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// vídeos (IMPORTANTE)
app.use("/uploads_videos", express.static(path.join(__dirname, "../uploads_videos")));

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});