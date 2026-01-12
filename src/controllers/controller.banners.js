import serviceBanners from "../services/service.banners.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

async function PegarBanner(req, res) {
  try {
    const { id_banner } = req.params;

    const banner = await serviceBanners.PegarBanner(id_banner);

    return res.status(200).json(banner);
  } catch (err) {
    if (
      err.message === "ID do banner inválido" ||
      err.message === "ID do banner é obrigatório"
    ) {
      return res.status(400).json({ error: err.message });
    }

    if (err.message === "Banner não encontrado") {
      return res.status(404).json({ error: err.message });
    }

    return res.status(500).json({ error: "Erro ao buscar banner" });
  }
}

async function ListarBanners(req, res) {
  try {
    const banners = await serviceBanners.ListarBanners();
    return res.status(200).json(banners);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar banners" });
  }
}

async function InserirBanner(req, res) {
  try {
    let foto = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "banners");
      foto = upload.secure_url;
    }

    const banner = await serviceBanners.InserirBanner(foto);

    return res.status(201).json(banner);
  } catch (err) {
    if (
      err.message === "Imagem inválida" ||
      err.message === "Imagem é obrigatória"
    ) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: "Erro ao inserir banner" });
  }
}

async function EditarBanner(req, res) {
  try {
    const { id_banner } = req.params;
    const { tipo } = req.body;

    let foto = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "banners");
      foto = upload.secure_url;
    }

    const bannerAtualizado = await serviceBanners.EditarBanner({
      id_banner,
      foto,
      tipo,
    });

    return res.status(200).json(bannerAtualizado);
  } catch (err) {
    if (
      err.message === "ID do banner inválido" ||
      err.message === "ID do banner é obrigatório"
    ) {
      return res.status(400).json({ error: err.message });
    }

    if (err.message === "Banner não encontrado") {
      return res.status(404).json({ error: err.message });
    }

    if (err.message === "Imagem inválida") {
      return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: "Erro ao editar banner" });
  }
}

export default {
  EditarBanner,
  PegarBanner,
  InserirBanner,
  ListarBanners,
};
