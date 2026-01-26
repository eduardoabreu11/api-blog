import serviceMaterias from "../services/service.materias.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

/* =========================
   MATÉRIAS
========================= */

async function PegarMaterias(req, res) {
  try {
    const materias = await serviceMaterias.PegarMaterias();
    return res.status(200).json(materias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar matérias" });
  }
}

async function ListarMaterias(req, res) {
  try {
    const materias = await serviceMaterias.ListarMaterias();
    return res.status(200).json(materias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar matérias" });
  }
}

async function PegarMateria(req, res) {
  try {
    const { id_materia } = req.params;
    const materia = await serviceMaterias.PegarMateria(id_materia);

    if (!materia) {
      return res.status(404).json({ error: "Matéria não encontrada" });
    }

    return res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar matéria" });
  }
}

async function ListarMateria(req, res) {
  try {
    const { id_materia } = req.params;
    const materia = await serviceMaterias.ListarMateria(id_materia);

    if (!materia) {
      return res.status(404).json({ error: "Matéria não encontrada" });
    }

    return res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar matéria" });
  }
}

async function InserirMateria(req, res) {
  try {
    const { titulo, subtitulo, texto } = req.body;
    let imagem_url = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "materias");
      imagem_url = upload.secure_url;
    }

    const materia = await serviceMaterias.InserirMateria({
      titulo,
      subtitulo,
      texto,
      imagem_url,
    });

    return res.status(201).json(materia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao inserir matéria" });
  }
}

async function EditarMateria(req, res) {
  try {
    const { id_materia } = req.params;
    const { titulo, subtitulo, texto, ativo, ordem } = req.body;
    let imagem_url = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "materias");
      imagem_url = upload.secure_url;
    }

    const materia = await serviceMaterias.EditarMateria({
      id_materia,
      titulo,
      subtitulo,
      texto,
      imagem_url,
      ativo,
      ordem
    });

    return res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao editar matéria" });
  }
}

async function ExcluirMateria(req, res) {
  try {
    const { id_materia } = req.params;

    await serviceMaterias.ExcluirMateria(id_materia);

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    if (error.message.includes("ID")) {
      return res.status(400).json({ error: error.message });
    }

    if (error.message === "Matéria não encontrada") {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro ao excluir matéria" });
  }
}

async function ConfigMateria(req, res) {
  try {
    const { id_materia } = req.params;
    const { ativo, ordem } = req.body;

   if (ordem != null) {
  const materiaAtual = await serviceMaterias.PegarMateria(id_materia);

  if (materiaAtual.ativo === true) {
    const existe = await serviceMaterias.ExisteOrdemAtiva({
      ordem,
      id_materia
    });

    if (existe) {
      return res.status(400).json({
        error: `Já existe uma matéria ativa na posição ${ordem}`
      });
    }
  }
}


    const materia = await serviceMaterias.ConfigMateria({
      id_materia,
      ativo,
      ordem
    });

    return res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: error.message || "Erro ao atualizar configuração"
    });
  }
}




export default {
  PegarMaterias,
  PegarMateria,
  InserirMateria,
  EditarMateria,
  ExcluirMateria,
  ListarMaterias,
  ListarMateria,
  ConfigMateria
};
