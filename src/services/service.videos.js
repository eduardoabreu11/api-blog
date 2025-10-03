import repoVideos from "../repositories/repository.videos.js";

async function PegarVideo(id_video) {
  
  return await repoVideos.PegarVideo(id_video);
}


async function PostarVideos(video_url) {
  return await repoVideos.PostarVideo(video_url);
}

async function EditarVideo({ id_video, video_url }) {
  return await repoVideos.EditarVideo({ id_video, video_url });
}

export default {PegarVideo, EditarVideo, PostarVideos}