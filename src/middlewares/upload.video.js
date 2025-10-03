import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve("uploads_videos");

// garante que a pasta exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  }
});

const uploadVideo = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
  fileFilter: (req, file, cb) => {
    if (/^video\/(mp4|mov|webm|x-matroska)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Apenas vídeos são permitidos."));
    }
  }
});

export default uploadVideo;