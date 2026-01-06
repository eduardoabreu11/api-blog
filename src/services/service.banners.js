import repoBanners from "../repositories/repository-pg.banners.js";

async function PegarBanner(id_banner) {
  if (!id_banner) {
    throw new Error("ID do banner é obrigatório");
  }

  if (isNaN(id_banner)) {
    throw new Error("ID do banner inválido");
  }

  const banner = await repoBanners.PegarBanner(id_banner);

  if (!banner) {
    throw new Error("Banner não encontrado");
  }

  return banner;
}

async function ListarBanners() {
  return await repoBanners.ListarBanners();
}

async function InserirBanner(fotoUrl) {
  if (!fotoUrl) {
    throw new Error("A foto do banner é obrigatória");
  }

  if (typeof fotoUrl !== "string") {
    throw new Error("Formato inválido da foto");
  }

  return await repoBanners.InserirBanner(fotoUrl);
}

async function EditarBanner({ id_banner, foto, tipo }) {
  if (!id_banner) {
    throw new Error("ID do banner é obrigatório");
  }

  if (isNaN(id_banner)) {
    throw new Error("ID do banner inválido");
  }

  if (!foto) {
    throw new Error("A foto do banner é obrigatória");
  }

  if (!tipo) {
    throw new Error("O tipo do banner é obrigatório");
  }

  const bannerExistente = await repoBanners.PegarBanner(id_banner);

  if (!bannerExistente) {
    throw new Error("Banner não encontrado");
  }

  return await repoBanners.EditarBanner({
    id_banner,
    foto,
    tipo,
  });
}

export default {
  PegarBanner,
  ListarBanners,
  InserirBanner,
  EditarBanner,
};