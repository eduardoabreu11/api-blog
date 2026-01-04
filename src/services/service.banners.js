import repoBanners from "../repositories/repository-pg.banners.js"




async function PegarBanner(id_banner) {
    console.log("Service id_banner:", id_banner);
  return await repoBanners.PegarBanner(id_banner);
}

async function ListarBanners() {
    
  return await repoBanners.ListarBanners();
}


async function InserirBanner(fotoUrl) {
  return await repoBanners.InserirBanner(fotoUrl);
}



async function EditarBanner({ id_banner, foto, tipo }) {
  return await repoBanners.EditarBanner({
    id_banner,
    foto,
    tipo,
  });
}          




export default {EditarBanner, PegarBanner, InserirBanner, ListarBanners}