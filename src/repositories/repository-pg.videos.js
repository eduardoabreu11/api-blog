import db from "../database/postgresql.js";

/* LISTAR TODOS */
async function ListarVideos() {
  const { rows } = await db.query(`
    SELECT *
    FROM videos
    ORDER BY id_video DESC
  `);
  return rows;
}

/* PEGAR POR ID */
async function PegarVideo(id_video) {
  const { rows } = await db.query(`
    SELECT *
    FROM videos
    WHERE id_video = $1
  `, [id_video]);

  return rows[0] || null;
}

/* PEGAR ATIVO */
async function PegarVideoAtivo() {
  const { rows } = await db.query(`
    SELECT *
    FROM videos
    WHERE ativo = true
    LIMIT 1
  `);
  return rows[0] || null;
}

/* INSERIR */
async function PostarVideo({
  video_url,
  video_public_id,
  capa_video,
  capa_public_id
}) {
  const { rows } = await db.query(`
    INSERT INTO videos (
      video_url,
      video_public_id,
      capa_video,
      capa_public_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [video_url, video_public_id, capa_video, capa_public_id]);

  return rows[0];
}

/* EDITAR */
async function EditarVideo({
  id_video,
  video_url,
  video_public_id,
  capa_video,
  capa_public_id
}) {
  const { rows } = await db.query(`
    UPDATE videos
       SET video_url = COALESCE($1, video_url),
           video_public_id = COALESCE($2, video_public_id),
           capa_video = COALESCE($3, capa_video),
           capa_public_id = COALESCE($4, capa_public_id)
     WHERE id_video = $5
     RETURNING *
  `, [
    video_url,
    video_public_id,
    capa_video,
    capa_public_id,
    id_video
  ]);

  return rows[0] || null;
}

/* EXCLUIR */
async function ExcluirVideo(id_video) {
  await db.query(`
    DELETE FROM videos
    WHERE id_video = $1
  `, [id_video]);
}

/* ATIVAR */
async function AtivarVideo(id_video) {
  await db.query(`UPDATE videos SET ativo = false`);
  await db.query(`
    UPDATE videos
       SET ativo = true
     WHERE id_video = $1
  `, [id_video]);
}

export default {
  ListarVideos,
  PegarVideo,
  PegarVideoAtivo,
  PostarVideo,
  EditarVideo,
  ExcluirVideo,
  AtivarVideo
};
