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
  let video_url = null;
  let capa_video = null;

  if (req.files?.video) {
    const upload = await uploadToCloudinary(req.files.video[0], "videos");
    video_url = upload.secure_url;
  }

  if (req.files?.capa_video) {
    const upload = await uploadToCloudinary(req.files.capa_video[0], "capas");
    capa_video = upload.secure_url;
  }

  const video = await serviceVideos.PostarVideo({ video_url, capa_video });
  res.status(201).json(video);
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
