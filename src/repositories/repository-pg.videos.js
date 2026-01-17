import db from "../database/postgresql.js";

async function ListarVideos() {
  const { rows } = await db.query(`SELECT * FROM videos ORDER BY id_video DESC`);
  return rows;
}

async function PegarVideo(id_video) {
  const { rows } = await db.query(
    `SELECT * FROM videos WHERE id_video = $1`,
    [id_video]
  );
  return rows[0] || null;
}

async function PegarVideoAtivo() {
  const { rows } = await db.query(
    `SELECT * FROM videos WHERE ativo = true LIMIT 1`
  );
  return rows[0] || null;
}

async function PostarVideo(dados) {
  const { rows } = await db.query(
    `INSERT INTO videos (video_url, video_public_id, capa_video, capa_public_id)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [
      dados.video_url,
      dados.video_public_id,
      dados.capa_video,
      dados.capa_public_id
    ]
  );
  return rows[0];
}

async function EditarVideo(dados) {
  const { rows } = await db.query(
    `UPDATE videos
     SET video_url = COALESCE($1, video_url),
         video_public_id = COALESCE($2, video_public_id),
         capa_video = COALESCE($3, capa_video),
         capa_public_id = COALESCE($4, capa_public_id)
     WHERE id_video = $5
     RETURNING *`,
    [
      dados.video_url,
      dados.video_public_id,
      dados.capa_video,
      dados.capa_public_id,
      dados.id_video
    ]
  );
  return rows[0];
}

async function ExcluirVideo(id_video) {
  await db.query(`DELETE FROM videos WHERE id_video = $1`, [id_video]);
}

async function AtivarVideo(id_video) {
  await db.query(`UPDATE videos SET ativo = false`);
  await db.query(
    `UPDATE videos SET ativo = true WHERE id_video = $1`,
    [id_video]
  );
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
