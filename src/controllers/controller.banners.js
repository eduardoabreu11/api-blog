import serviceBanners from "../services/service.banners.js";



async function PegarBanner(req, res) {
  try {

      
    const { id_banner } = req.params;
    
    const banner = await serviceBanners.PegarBanner(id_banner);
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar banner" });
  }
}

async function ListarBanners(req, res) {
  try {


    const banner = await serviceBanners.ListarBanners();
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar banner" });
  }
}



async function InserirBanner(req, res) {
  try {
    let foto = null;

    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      foto = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    // envia só a string da URL para o service
    const banner = await serviceBanners.InserirBanner(foto);

    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ error });
  }
}


async function EditarBanner(req, res) {
  try {
    const { id_banner } = req.params;

    let foto = null;

    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      foto = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const BannerAtualizado = await serviceBanners.EditarBanner({ id_banner, foto });

    res.status(200).json(BannerAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao editar banner" });
  }
}

export default {EditarBanner, PegarBanner, InserirBanner, ListarBanners}