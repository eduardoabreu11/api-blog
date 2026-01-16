import serviceVideos from "../services/service.videos.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

async function ListarVideos(req, res) {
  const videos = await serviceVideos.ListarVideos();
  res.json(videos);
}

async function PegarVideos(req, res) {
  try {
    const video = await serviceVideos.PegarVideo(req.params.id_video);
    res.json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function PegarVideoAtivo(req, res) {
  const video = await serviceVideos.PegarVideoAtivo();
  res.json(video);
}

async function PostarVideo(req, res) {
  try {
    let video_url = null;
    let capa_video = null;

    if (req.file) {
      const uploadVideoRes = await uploadToCloudinary(req.file, "videos");
      video_url = uploadVideoRes.secure_url;
    }

    if (req.files?.capa_video) {
      const uploadCapa = await uploadToCloudinary(
        req.files.capa_video[0],
        "videos"
      );
      capa_video = uploadCapa.secure_url;
    }

    const video = await serviceVideos.PostarVideos({
      video_url,
      capa_video
    });

    return res.status(201).json(video);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao postar vídeo" });
  }
}



async function EditarVideos(req, res) {
  const video = await serviceVideos.EditarVideo({
    id_video: req.params.id_video,
    video_url: req.file ? (await uploadToCloudinary(req.file, "videos")).secure_url : null
  });

  res.json(video);
}

async function AtivarVideo(req, res) {
  await serviceVideos.AtivarVideo(req.params.id_video);
  res.json({ ok: true });
}

export default {
  ListarVideos,
  PegarVideos,
  PegarVideoAtivo,
  PostarVideo,
  EditarVideos,
  AtivarVideo
};
