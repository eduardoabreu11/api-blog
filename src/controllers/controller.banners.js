import serviceBanners from "../services/service.banners.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

/* =========================
   BANNERS
========================= */

/**
 * Buscar banner por ID
 */
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

/**
 * Listar todos os banners
 */
async function ListarBanners(req, res) {
  try {
    const banners = await serviceBanners.ListarBanners();
    return res.status(200).json(banners);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar banners" });
  }
}

/**
 * Inserir banner (desktop + mobile)
 */
async function InserirBanner(req, res) {
  try {
    const { tipo } = req.body;

    let banner = null;
    let banner_mobile = null;

    if (req.files?.banner) {
      const upload = await uploadToCloudinary(
        req.files.banner[0],
        "banners"
      );
      banner = upload.secure_url;
    }

    if (req.files?.banner_mobile) {
      const upload = await uploadToCloudinary(
        req.files.banner_mobile[0],
        "banners"
      );
      banner_mobile = upload.secure_url;
    }

    const novoBanner = await serviceBanners.InserirBanner({
      banner,
      banner_mobile,
      tipo,
    });

    return res.status(201).json(novoBanner);
  } catch (err) {
    console.error(err);

    if (
      err.message === "Banner desktop obrigatório" ||
      err.message === "Banner mobile obrigatório" ||
      err.message === "Tipo obrigatório"
    ) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: "Erro ao inserir banner" });
  }
}

/**
 * Editar banner (parcial)
 */
async function EditarBanner(req, res) {
  try {
    const { id_banner } = req.params;
    const { tipo } = req.body;

    let banner = null;
    let banner_mobile = null;

    if (req.files?.banner) {
      const upload = await uploadToCloudinary(
        req.files.banner[0],
        "banners"
      );
      banner = upload.secure_url;
    }

    if (req.files?.banner_mobile) {
      const upload = await uploadToCloudinary(
        req.files.banner_mobile[0],
        "banners"
      );
      banner_mobile = upload.secure_url;
    }

    const bannerAtualizado = await serviceBanners.EditarBanner({
      id_banner,
      banner,
      banner_mobile,
      tipo,
    });

    return res.status(200).json(bannerAtualizado);
  } catch (err) {
    console.error(err);

    if (
      err.message === "ID do banner inválido" ||
      err.message === "ID do banner é obrigatório"
    ) {
      return res.status(400).json({ error: err.message });
    }

    if (err.message === "Banner não encontrado") {
      return res.status(404).json({ error: err.message });
    }

    return res.status(500).json({ error: "Erro ao editar banner" });
  }
}

export default {
  PegarBanner,
  ListarBanners,
  InserirBanner,
  EditarBanner,
};
