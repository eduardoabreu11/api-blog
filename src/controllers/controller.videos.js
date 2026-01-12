import serviceVideos from "../services/service.videos.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

/* =========================
   VÍDEOS
========================= */

async function PegarVideos(req, res) {
  try {
    const { id_video } = req.params;

    const video = await serviceVideos.PegarVideo(id_video);

    if (!video) {
      return res.status(404).json({ error: "Vídeo não encontrado" });
    }

    return res.status(200).json(video);
  } catch (error) {
    console.error(error);

    if (error.message === "Vídeo inválido") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro ao buscar vídeo" });
  }
}

async function PostarVideo(req, res) {
  try {
    let video_url = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "videos");
      video_url = upload.secure_url;
    }

    const video = await serviceVideos.PostarVideos(video_url);

    return res.status(201).json(video);
  } catch (error) {
    console.error(error);

    if (
      error.message === "URL do vídeo é obrigatória" ||
      error.message === "Vídeo inválido"
    ) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro ao postar vídeo" });
  }
}

async function EditarVideos(req, res) {
  try {
    const { id_video } = req.params;
    let video_url = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "videos");
      video_url = upload.secure_url;
    }

    const videoAtualizado = await serviceVideos.EditarVideo({
      id_video,
      video_url,
    });

    return res.status(200).json(videoAtualizado);
  } catch (error) {
    console.error(error);

    if (error.message === "Vídeo inválido") {
      return res.status(400).json({ error: error.message });
    }

    if (error.message === "Vídeo não encontrado") {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro ao editar vídeo" });
  }
}

export default {
  PegarVideos,
  EditarVideos,
  PostarVideo,
};
