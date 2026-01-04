import db from "../database/postgresql.js";

/* =========================
   VÍDEOS
========================= */

async function PegarVideo(id_video) {
  const sql = `
    SELECT id_video, video_url
      FROM videos
     WHERE id_video = $1
  `;

  const { rows } = await db.query(sql, [id_video]);
  return rows[0] || null;
}

async function PostarVideo(video_url) {
  const sql = `
    INSERT INTO videos (video_url)
    VALUES ($1)
    RETURNING id_video
  `;

  const { rows } = await db.query(sql, [video_url]);
  return rows[0] || null;
}

async function EditarVideo({ id_video, video_url }) {
  const sql = `
    UPDATE videos
       SET video_url = COALESCE($1, video_url)
     WHERE id_video = $2
     RETURNING id_video, video_url
  `;

  const { rows } = await db.query(sql, [video_url, id_video]);
  return rows[0] || null;
}

/* =========================
   EXPORT
========================= */

export default {
  PegarVideo,
  EditarVideo,
  PostarVideo
};