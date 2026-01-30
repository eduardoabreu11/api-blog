import service from "../services/service.midia-footer.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

/* =========================
   MIDIAS FOOTER
========================= */

async function Inserir(req, res) {
  try {
    const { id_post, id_materia } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Imagem obrigatória" });
    }

    const upload = await uploadToCloudinary(req.file, "midias-footer");

    const midia = await service.Inserir({
      id_post,
      id_materia,
      imagem_url: upload.secure_url,
      imagem_public_id: upload.public_id
    });

    return res.status(201).json(midia);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function ListarPorPost(req, res) {
  try {
    const { id_post } = req.params;
    const midias = await service.ListarPorPost(id_post);
    return res.json(midias);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function ListarPorMateria(req, res) {
  try {
    const { id_materia } = req.params;
    const midias = await service.ListarPorMateria(id_materia);
    return res.json(midias);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function Editar(req, res) {
  try {
    const { id_midia } = req.params;

    let imagem_url = null;
    let imagem_public_id = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "midias-footer");
      imagem_url = upload.secure_url;
      imagem_public_id = upload.public_id;
    }

    const midia = await service.Editar({
      id_midia,
      imagem_url,
      imagem_public_id
    });

    return res.json(midia);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function Excluir(req, res) {
  try {
    const { id_midia } = req.params;
    await service.Excluir(id_midia);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export default {
  Inserir,
  ListarPorPost,
  ListarPorMateria,
  Editar,
  Excluir
};
