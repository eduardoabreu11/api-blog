import repo from "../repositories/repository.midia-footer.js";

/* =========================
   MIDIAS FOOTER
========================= */

async function Inserir({
  id_post,
  id_materia,
  imagem_url,
  imagem_public_id
}) {
  if (!id_post && !id_materia) {
    throw new Error("Informe id_post ou id_materia");
  }

  if (id_post && id_materia) {
    throw new Error("A mídia não pode pertencer a post e matéria ao mesmo tempo");
  }

  return await repo.Inserir({
    id_post,
    id_materia,
    imagem_url,
    imagem_public_id
  });
}

async function ListarPorPost(id_post) {
  if (!id_post || isNaN(id_post)) {
    throw new Error("ID do post inválido");
  }

  return await repo.ListarPorPost(id_post);
}

async function ListarPorMateria(id_materia) {
  if (!id_materia || isNaN(id_materia)) {
    throw new Error("ID da matéria inválido");
  }

  return await repo.ListarPorMateria(id_materia);
}

async function Editar({
  id_midia,
  imagem_url,
  imagem_public_id
}) {
  if (!id_midia || isNaN(id_midia)) {
    throw new Error("ID da mídia inválido");
  }

  const existe = await repo.PegarPorId(id_midia);
  if (!existe) {
    throw new Error("Mídia não encontrada");
  }

  return await repo.Editar({
    id_midia,
    imagem_url,
    imagem_public_id
  });
}

async function Excluir(id_midia) {
  if (!id_midia || isNaN(id_midia)) {
    throw new Error("ID da mídia inválido");
  }

  const existe = await repo.PegarPorId(id_midia);
  if (!existe) {
    throw new Error("Mídia não encontrada");
  }

  await repo.Excluir(id_midia);
}

export default {
  Inserir,
  ListarPorPost,
  ListarPorMateria,
  Editar,
  Excluir
};
