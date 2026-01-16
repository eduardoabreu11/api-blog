import repoVideos from "../repositories/repository-pg.videos.js";

async function ListarVideos() {
  return repoVideos.ListarVideos();
}

async function PegarVideo(id_video) {
  if (!id_video || isNaN(id_video)) throw new Error("Vídeo inválido");

  const video = await repoVideos.PegarVideo(id_video);
  if (!video) throw new Error("Vídeo não encontrado");

  return video;
}

async function PegarVideoAtivo() {
  return repoVideos.PegarVideoAtivo();
}

async function PostarVideo({ video_url, capa_video }) {
  if (!video_url) throw new Error("Vídeo obrigatório");
  return repoVideos.PostarVideo({ video_url, capa_video });
}

async function EditarVideo({ id_video, video_url, capa_video }) {
  if (!id_video || isNaN(id_video)) throw new Error("Vídeo inválido");

  return repoVideos.EditarVideo({ id_video, video_url, capa_video });
}

async function AtivarVideo(id_video) {
  if (!id_video || isNaN(id_video)) throw new Error("Vídeo inválido");
  await repoVideos.AtivarVideo(id_video);
}

export default {
  ListarVideos,
  PegarVideo,
  PegarVideoAtivo,
  PostarVideo,
  EditarVideo,
  AtivarVideo
};
