import multer from "multer";

const storage = multer.memoryStorage();

const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
  fileFilter: (req, file, cb) => {
    if (/^video\/(mp4|mov|webm|x-matroska)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Apenas vídeos são permitidos."));
  },
});

export default uploadVideo;
