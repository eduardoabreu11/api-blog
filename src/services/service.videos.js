import repoVideos from "../repositories/repository-pg.videos.js";

/**
 * Pegar vídeo por ID
 */
async function PegarVideo(id_video) {
  if (!id_video || isNaN(id_video)) {
    throw new Error("Vídeo inválido");
  }

  const video = await repoVideos.PegarVideo(id_video);

  if (!video) {
    throw new Error("Vídeo não encontrado");
  }

  return video;
}

/**
 * Postar vídeo
 */
async function PostarVideos(video_url) {
  if (!video_url || typeof video_url !== "string") {
    throw new Error("URL do vídeo é obrigatória");
  }

  const video = await repoVideos.PostarVideo(video_url);
  return video;
}

/**
 * Editar vídeo
 */
async function EditarVideo({ id_video, video_url }) {
  if (!id_video || isNaN(id_video)) {
    throw new Error("Vídeo inválido");
  }

  if (!video_url || typeof video_url !== "string") {
    throw new Error("URL do vídeo é obrigatória");
  }

  const videoExistente = await repoVideos.PegarVideo(id_video);

  if (!videoExistente) {
    throw new Error("Vídeo não encontrado");
  }

  const video = await repoVideos.EditarVideo({
    id_video,
    video_url,
  });

  return video;
}

export default {
  PegarVideo,
  EditarVideo,
  PostarVideos,
};
