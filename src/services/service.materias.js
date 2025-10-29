import repoMaterias from "../repositories/repository.materias.js";



async function PegarMaterias() {
  const materias = await repoMaterias.PegarMaterias();
  return materias;
}
async function ListarMaterias() {
  const materias = await repoMaterias.ListarMaterias();
  return materias;
}
async function PegarMateria(id_materia) {
  const materias = await repoMaterias.PegarMateria(id_materia);
  return materias;
}

async function ListarMateria(id_materia) {
  const materias = await repoMaterias.ListarMateria(id_materia);
  return materias;
}

async function InserirMateria({ titulo, subtitulo, texto, imagem_url }) {
  const materia = await repoMaterias.InserirMateria({ titulo,subtitulo, texto, imagem_url });
  return materia;
}

async function EditarMateria({ id_materia, titulo,subtitulo, texto, imagem_url }) {
    
  const materia = await repoMaterias.EditarMateria({ id_materia, titulo, subtitulo, texto, imagem_url });
  return materia;
}

async function ExcluirMateria(id_materia) {
  const materia = await repoMaterias.ExcluirMateria(id_materia);
  return materia;
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