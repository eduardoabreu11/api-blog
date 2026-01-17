import serviceVideos from "../services/service.videos.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";
import cloudinary from "../config/cloudinary.js";

/* LISTAR */
async function ListarVideos(req, res) {
  try {
    const videos = await serviceVideos.ListarVideos();
    return res.status(200).json(videos);
  } catch {
    return res.status(500).json({ error: "Erro ao listar vídeos" });
  }
}

/* PEGAR POR ID */
async function PegarVideo(req, res) {
  try {
    const video = await serviceVideos.PegarVideo(req.params.id_video);
    return res.status(200).json(video);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

/* PEGAR ATIVO */
async function PegarVideoAtivo(req, res) {
  try {
    const video = await serviceVideos.PegarVideoAtivo();
    return res.status(200).json(video);
  } catch {
    return res.status(500).json({ error: "Erro ao buscar vídeo ativo" });
  }
}

/* INSERIR */
async function PostarVideo(req, res) {
  try {
    const videoFile = req.files?.video?.[0];
    const capaFile = req.files?.capa_video?.[0];

    if (!videoFile) {
      return res.status(400).json({ error: "Vídeo obrigatório" });
    }

    const videoUpload = await uploadToCloudinary(videoFile, "videos");

    let capaUpload = null;
    if (capaFile) {
      capaUpload = await uploadToCloudinary(capaFile, "videos/capas");
    }

    const novo = await serviceVideos.PostarVideo({
      video_url: videoUpload.secure_url,
      video_public_id: videoUpload.public_id,
      capa_video: capaUpload?.secure_url || null,
      capa_public_id: capaUpload?.public_id || null
    });

    return res.status(201).json(novo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao postar vídeo" });
  }
}

/* EDITAR VÍDEO */
async function EditarVideo(req, res) {
  try {
    const upload = await uploadToCloudinary(req.file, "videos");

    const atualizado = await serviceVideos.EditarVideo({
      id_video: req.params.id_video,
      video_url: upload.secure_url,
      video_public_id: upload.public_id
    });

    return res.status(200).json(atualizado);
  } catch {
    return res.status(500).json({ error: "Erro ao editar vídeo" });
  }
}

/* EDITAR CAPA */
async function EditarCapa(req, res) {
  try {
    const upload = await uploadToCloudinary(req.file, "videos/capas");

    const atualizado = await serviceVideos.EditarVideo({
      id_video: req.params.id_video,
      capa_video: upload.secure_url,
      capa_public_id: upload.public_id
    });

    return res.status(200).json(atualizado);
  } catch {
    return res.status(500).json({ error: "Erro ao editar capa" });
  }
}

/* EXCLUIR */
async function ExcluirVideo(req, res) {
  try {
    const video = await serviceVideos.PegarVideo(req.params.id_video);

    if (video.video_public_id) {
      await cloudinary.uploader.destroy(video.video_public_id, {
        resource_type: "video"
      });
    }

    if (video.capa_public_id) {
      await cloudinary.uploader.destroy(video.capa_public_id);
    }

    await serviceVideos.ExcluirVideo(req.params.id_video);
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao excluir vídeo" });
  }
}

/* ATIVAR */
async function AtivarVideo(req, res) {
  await serviceVideos.AtivarVideo(req.params.id_video);
  return res.status(204).send();
}

export default {
  ListarVideos,
  PegarVideo,
  PegarVideoAtivo,
  PostarVideo,
  EditarVideo,
  EditarCapa,
  ExcluirVideo,
  AtivarVideo
};
