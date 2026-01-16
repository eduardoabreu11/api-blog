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

async function InserirBanner({ banner, banner_mobile, tipo }) {
  if (!banner) throw new Error("Banner desktop obrigatório");
  if (!banner_mobile) throw new Error("Banner mobile obrigatório");
  if (!tipo) throw new Error("Tipo obrigatório");

  return repoBanners.InserirBanner({ banner, banner_mobile, tipo });
}


async function EditarBanner({ id_banner, banner, banner_mobile, tipo }) {
  if (!id_banner) {
    throw new Error("ID do banner é obrigatório");
  }

  if (isNaN(id_banner)) {
    throw new Error("ID do banner inválido");
  }

  const bannerExistente = await repoBanners.PegarBanner(id_banner);

  if (!bannerExistente) {
    throw new Error("Banner não encontrado");
  }

  return await repoBanners.EditarBanner({
    id_banner,
    banner,
    banner_mobile,
    tipo,
  });
}


export default {
  PegarBanner,
  ListarBanners,
  InserirBanner,
  EditarBanner,
};