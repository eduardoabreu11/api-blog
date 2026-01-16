import multer from "multer";

const storage = multer.memoryStorage();

const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {

    // 🎥 vídeo
    if (
      file.fieldname === "video" &&
      /^video\/(mp4|mov|webm|x-matroska)$/.test(file.mimetype)
    ) {
      return cb(null, true);
    }

    // 🖼️ capa do vídeo
    if (
      file.fieldname === "capa_video" &&
      /^image\/(jpeg|png|jpg|webp)$/.test(file.mimetype)
    ) {
      return cb(null, true);
    }

    cb(new Error("Tipo de arquivo inválido"));
  },
});

export default uploadVideo;
