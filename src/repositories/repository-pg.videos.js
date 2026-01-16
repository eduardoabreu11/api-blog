import db from "../database/postgresql.js";

/* LISTAR TODOS */
async function ListarVideos() {
  const { rows } = await db.query(`
    SELECT id_video, video_url, capa_video, ativo
    FROM videos
    ORDER BY id_video DESC
  `);
  return rows;
}

/* PEGAR POR ID */
async function PegarVideo(id_video) {
  const { rows } = await db.query(`
    SELECT id_video, video_url, capa_video, ativo
    FROM videos
    WHERE id_video = $1
  `, [id_video]);

  return rows[0] || null;
}

/* PEGAR VÍDEO DA HOME */
async function PegarVideoAtivo() {
  const { rows } = await db.query(`
    SELECT id_video, video_url, capa_video
    FROM videos
    WHERE ativo = true
    LIMIT 1
  `);

  return rows[0] || null;
}

/* POSTAR */
async function PostarVideo({ video_url, capa_video }) {
  const { rows } = await db.query(`
    INSERT INTO videos (video_url, capa_video)
    VALUES ($1, $2)
    RETURNING *
  `, [video_url, capa_video]);

  return rows[0];
}

/* EDITAR */
async function EditarVideo({ id_video, video_url, capa_video }) {
  const { rows } = await db.query(`
    UPDATE videos
       SET video_url  = COALESCE($1, video_url),
           capa_video = COALESCE($2, capa_video)
     WHERE id_video = $3
     RETURNING *
  `, [video_url, capa_video, id_video]);

  return rows[0] || null;
}

/* ATIVAR VÍDEO */
async function AtivarVideo(id_video) {
  await db.query(`UPDATE videos SET ativo = false`);
  await db.query(`UPDATE videos SET ativo = true WHERE id_video = $1`, [id_video]);
}

export default {
  ListarVideos,
  PegarVideo,
  PegarVideoAtivo,
  PostarVideo,
  EditarVideo,
  AtivarVideo
};

