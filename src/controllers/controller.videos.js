import serviceVideos from "../services/service.videos.js";

async function PegarVideos(req, res) {
  try {
    const { id_video } = req.params;
     
    
    const video = await serviceVideos.PegarVideo(id_video);
    res.status(200).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar vídeo" });
  }
}

async function PostarVideo(req, res) {
  try {
    let video_url = null;

    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      video_url = `${protocol}://${host}/uploads_videos/${req.file.filename}`;
      
    }

    // envia só a string da URL para o service
    console.log(video_url)
    const video = await serviceVideos.PostarVideos(video_url);

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function EditarVideos(req, res) {
  try {
    const { id_video } = req.params;

    let video_url = null;

    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      video_url = `${protocol}://${host}/uploads/videos/${req.file.filename}`;
    }

    const videoAtualizado = await serviceVideos.EditarVideo({ id_video, video_url });

    res.status(200).json(videoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao editar vídeo" });
  }
}

export default { PegarVideos, EditarVideos, PostarVideo };