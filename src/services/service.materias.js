import repoMaterias from "../repositories/repository-pg.materias.js";

async function PegarMaterias() {
  return await repoMaterias.PegarMaterias();
}

async function ListarMaterias() {
  return await repoMaterias.ListarMaterias();
}

async function PegarMateria(id_materia) {
  if (!id_materia) {
    throw new Error("ID da matéria é obrigatório");
  }

  if (isNaN(id_materia)) {
    throw new Error("ID da matéria inválido");
  }

  const materia = await repoMaterias.PegarMateria(id_materia);

  if (!materia) {
    throw new Error("Matéria não encontrada");
  }

  return materia;
}

async function ListarMateria(id_materia) {
  if (!id_materia) {
    throw new Error("ID da matéria é obrigatório");
  }

  if (isNaN(id_materia)) {
    throw new Error("ID da matéria inválido");
  }

  const materia = await repoMaterias.ListarMateria(id_materia);

  if (!materia) {
    throw new Error("Matéria não encontrada");
  }

  return materia;
}

async function InserirMateria({ titulo, subtitulo, texto, imagem_url }) {
  if (!titulo || typeof titulo !== "string") {
    throw new Error("Título é obrigatório");
  }

  if (!texto || typeof texto !== "string") {
    throw new Error("Texto é obrigatório");
  }

  return await repoMaterias.InserirMateria({
    titulo,
    subtitulo,
    texto,
    imagem_url,
  });
}

async function EditarMateria({
  id_materia,
  titulo,
  subtitulo,
  texto,
  imagem_url,
  ativo,
  ordem
}) {
  if (!id_materia || isNaN(id_materia)) {
    throw new Error("ID da matéria inválido");
  }

  const materiaExistente = await repoMaterias.PegarMateria(id_materia);
  if (!materiaExistente) {
    throw new Error("Matéria não encontrada");
  }

  return await repoMaterias.EditarMateria({
    id_materia,
    titulo,
    subtitulo,
    texto,
    imagem_url,
    ativo,
    ordem
  });
}


async function ExcluirMateria(id_materia) {
  if (!id_materia) {
    throw new Error("ID da matéria é obrigatório");
  }

  if (isNaN(id_materia)) {
    throw new Error("ID da matéria inválido");
  }

  const materiaExistente = await repoMaterias.PegarMateria(id_materia);

  if (!materiaExistente) {
    throw new Error("Matéria não encontrada");
  }

  return await repoMaterias.ExcluirMateria(id_materia);
}


async function ConfigMateria({ id_materia, ativo, ordem }) {
  if (!id_materia || isNaN(id_materia)) {
    throw new Error("ID da matéria inválido");
  }

  const materiaExistente = await repoMaterias.PegarMateria(id_materia);
  if (!materiaExistente) {
    throw new Error("Matéria não encontrada");
  }

  // 🔥 VALIDA ORDEM DUPLICADA
  if (ativo === true && ordem != null) {
    const ordemExiste = await repoMaterias.ExisteOrdemAtiva({
      ordem,
      id_materia
    });

    if (ordemExiste) {
      throw new Error(`Já existe uma matéria ativa com a ordem ${ordem}`);
    }
  }

  return await repoMaterias.ConfigMateria({
    id_materia,
    ativo,
    ordem
  });
}


export default {
  PegarMaterias,
  ListarMaterias,
  PegarMateria,
  ListarMateria,
  InserirMateria,
  EditarMateria,
  ExcluirMateria,
  ConfigMateria
};