import serviceMaterias from "../services/service.materias.js";

async function PegarMaterias(req, res) {
  try {
    const materias = await serviceMaterias.PegarMaterias(); 

    if (!materias || materias.length === 0) {
      return res.status(404).json({ error: "Nenhuma matéria encontrada" });
    }

    res.status(200).json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar matérias" });
  }
}

async function ListarMaterias(req, res) {
  try {
    const materias = await serviceMaterias.ListarMaterias(); 

    if (!materias || materias.length === 0) {
      return res.status(404).json({ error: "Nenhuma matéria encontrada" });
    }

    res.status(200).json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar matérias" });
  }
}

async function PegarMateria(req, res) {
  try {
    const { id_materia } = req.params;
    const materia = await serviceMaterias.PegarMateria(id_materia); 

    if (!materia || materia.length === 0) {
      return res.status(404).json({ error: "Nenhuma matéria encontrada" });
    }

    res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar matéria" });
  }
}

async function ListarMateria(req, res) {
  try {
    const { id_materia } = req.params;
    const materia = await serviceMaterias.ListarMateria(id_materia); 

    if (!materia || materia.length === 0) {
      return res.status(404).json({ error: "Nenhuma matéria encontrada" });
    }

    res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar matéria" });
  }
}

async function InserirMateria(req, res) {
  try {
    const { titulo, subtitulo, texto } = req.body;
    let foto = null;

    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      foto = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const materia = await serviceMaterias.InserirMateria({ titulo, subtitulo, texto, foto });
    res.status(201).json(materia);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function EditarMateria(req, res) {
  try {
    const { id_materia } = req.params;
    
    const { titulo, subtitulo, texto } = req.body;
    let foto = null;

    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      foto = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const materia = await serviceMaterias.EditarMateria({ id_materia, titulo, subtitulo, texto, foto });
    res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao editar matéria" });
  }
}

async function ExcluirMateria(req, res) {
  try {
    const { id_materia } = req.params;
    
    const materiaExcluida = await serviceMaterias.ExcluirMateria({ id_materia });
    res.status(200).json(materiaExcluida);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default {
  PegarMaterias,
  PegarMateria,
  InserirMateria,
  EditarMateria,
  ExcluirMateria,
  ListarMaterias,
  ListarMateria
};