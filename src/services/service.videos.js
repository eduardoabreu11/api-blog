import repoVideos from "../repositories/repository-pg.videos.js";

async function ListarVideos() {
  return repoVideos.ListarVideos();
}

async function PegarVideo(id_video) {
  if (!id_video || isNaN(id_video)) {
    throw new Error("Vídeo inválido");
  }

  const video = await repoVideos.PegarVideo(id_video);
  if (!video) throw new Error("Vídeo não encontrado");

  return video;
}

async function PegarVideoAtivo() {
  return repoVideos.PegarVideoAtivo();
}

async function PostarVideo({
  video_url,
  video_public_id,
  capa_video,
  capa_public_id
}) {
  if (!video_url || !video_public_id) {
    throw new Error("Vídeo obrigatório");
  }

  return repoVideos.PostarVideo({
    video_url,
    video_public_id,
    capa_video,
    capa_public_id
  });
}


async function EditarVideo({ id_video, video_url = null, capa_video = null }) {
  if (!id_video || isNaN(id_video)) {
    throw new Error("Vídeo inválido");
  }

  return repoVideos.EditarVideo({
    id_video,
    video_url,
    capa_video
  });
}

async function AtivarVideo(id_video) {
  if (!id_video || isNaN(id_video)) {
    throw new Error("Vídeo inválido");
  }


  await repoVideos.AtivarVideo(id_video);
}

async function ExcluirVideo(id_video) {
  await db.query(`
    DELETE FROM videos
    WHERE id_video = $1
  `, [id_video]);
}


export default {
  ListarVideos,
  PegarVideo,
  PegarVideoAtivo,
  PostarVideo,
  EditarVideo,
  AtivarVideo,
  ExcluirVideo
};
