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

async function PostarVideo(dados) {
  return repoVideos.PostarVideo(dados);
}

async function EditarVideo(dados) {
  return repoVideos.EditarVideo(dados);
}

async function ExcluirVideo(id_video) {
  await repoVideos.ExcluirVideo(id_video);
}

async function AtivarVideo(id_video) {
  await repoVideos.AtivarVideo(id_video);
}

export default {
  ListarVideos,
  PegarVideo,
  PegarVideoAtivo,
  PostarVideo,
  EditarVideo,
  ExcluirVideo,
  AtivarVideo
};
