import multer from "multer";

const storage = multer.memoryStorage();

const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    // vídeo
    if (
      file.fieldname === "video_url" &&
      /^video\/(mp4|mov|webm|x-matroska)$/.test(file.mimetype)
    ) {
      return cb(null, true);
    }

    // capa do vídeo
    if (
      file.fieldname === "capa_video" &&
      /^image\/(jpeg|png|webp|jpg)$/.test(file.mimetype)
    ) {
      return cb(null, true);
    }

    cb(new Error("Tipo de arquivo inválido"));
  },
});

export default uploadVideo;
