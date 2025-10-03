import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// para conseguir usar __dirname com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(express.json());
app.use(cors());

// serve a pasta uploads como pública para imgs
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// serve a pasta uploads_videos como pública para videos
app.use("/uploads_videos", express.static(path.resolve("uploads_videos")));


// rotas
app.use(router);

// iniciar servidor
app.listen(process.env.PORT, () => {
    console.log("servidor rodando na porta " + process.env.PORT);
});