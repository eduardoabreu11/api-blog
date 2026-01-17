import serviceVideos from "../services/service.videos.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";
import cloudinary from "../config/cloudinary.js";

/* =========================
   LISTAR
========================= */
async function ListarVideos(req, res) {
  try {
    const videos = await serviceVideos.ListarVideos();
    return res.status(200).json(videos);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao listar vídeos" });
  }
}

/* =========================
   PEGAR POR ID
========================= */
async function PegarVideo(req, res) {
  try {
    const { id_video } = req.params;
    const video = await serviceVideos.PegarVideo(id_video);
    return res.status(200).json(video);
  } catch (err) {
    if (err.message === "Vídeo inválido" || err.message === "Vídeo não encontrado") {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: "Erro ao buscar vídeo" });
  }
}

/* =========================
   PEGAR VÍDEO ATIVO
========================= */
async function PegarVideoAtivo(req, res) {
  try {
    const video = await serviceVideos.PegarVideoAtivo();
    return res.status(200).json(video);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar vídeo ativo" });
  }
}

/* =========================
   POSTAR NOVO VÍDEO
========================= */
async function PostarVideo(req, res) {
  try {
    const videoFile = req.files?.video?.[0];
    const capaFile = req.files?.capa_video?.[0];

    if (!videoFile) {
      return res.status(400).json({ error: "Vídeo obrigatório" });
    }

    const videoUpload = await uploadToCloudinary(videoFile, "videos");

    let capaUrl = null;
    let capaPublicId = null;

    if (capaFile) {
      const capaUpload = await uploadToCloudinary(capaFile, "videos/capas");
      capaUrl = capaUpload.secure_url;
      capaPublicId = capaUpload.public_id;
    }

    const novoVideo = await serviceVideos.PostarVideo({
      video_url: videoUpload.secure_url,
      video_public_id: videoUpload.public_id,
      capa_video: capaUrl,
      capa_public_id: capaPublicId
    });

    return res.status(201).json(novoVideo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao postar vídeo" });
  }
}

/* =========================
   EDITAR VÍDEO
========================= */
async function EditarVideo(req, res) {
  try {
    const { id_video } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "Arquivo de vídeo obrigatório" });
    }

    const upload = await uploadToCloudinary(req.file, "videos");

    const videoAtualizado = await serviceVideos.EditarVideo({
      id_video,
      video_url: upload.secure_url
    });

    return res.status(200).json(videoAtualizado);
  } catch (err) {
    if (err.message === "Vídeo inválido") {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Erro ao editar vídeo" });
  }
}

/* =========================
   EDITAR CAPA (🔥 NOVO)
========================= */
async function EditarCapa(req, res) {
  try {
    const { id_video } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "Capa obrigatória" });
    }

    const upload = await uploadToCloudinary(req.file, "videos/capas");

    const atualizado = await serviceVideos.EditarVideo({
      id_video,
      capa_video: upload.secure_url
    });

    return res.status(200).json(atualizado);
  } catch (err) {
    if (err.message === "Vídeo inválido") {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Erro ao editar capa" });
  }
}


async function ExcluirVideo(req, res) {
  try {
    const { id_video } = req.params;

    const video = await serviceVideos.PegarVideo(id_video);

    if (video.video_public_id) {
      await cloudinary.uploader.destroy(video.video_public_id, {
        resource_type: "video"
      });
    }

    if (video.capa_public_id) {
      await cloudinary.uploader.destroy(video.capa_public_id, {
        resource_type: "image"
      });
    }

    await serviceVideos.ExcluirVideo(id_video);

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao excluir vídeo" });
  }
}

/* =========================
   ATIVAR VÍDEO
========================= */
async function AtivarVideo(req, res) {
  try {
    const { id_video } = req.params;
    await serviceVideos.AtivarVideo(id_video);
    return res.status(204).send();
  } catch (err) {
    if (err.message === "Vídeo inválido") {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Erro ao ativar vídeo" });
  }
}

export default {
  ListarVideos,
  PegarVideo,
  PegarVideoAtivo,
  PostarVideo,
  EditarVideo,
  EditarCapa,
  AtivarVideo,
  ExcluirVideo
};
