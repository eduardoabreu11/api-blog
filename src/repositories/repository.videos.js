import { query } from "../database/sqlite.js";

async function PegarVideo(id_video) {
  
  const sql = `SELECT id_video, video_url FROM videos WHERE id_video = ?`;
  const result = await query(sql, [id_video]);
  console.log(result)
  return result[0] || null;
}

async function PostarVideo(video_url) {
  let sql = `INSERT INTO videos(video_url) VALUES(?) RETURNING id_video`;
  const result = await query(sql, [video_url]);
  return result[0] || null;
}

async function EditarVideo({ id_video, video_url }) {
  const sql = `
  UPDATE videos
  SET video_url = COALESCE(?, video_url)
  WHERE id_video = ?
  RETURNING id_video, video_url
`;
  const result = await query(sql, [video_url, id_video]);
  return result[0] || null;
}

export default { PegarVideo, EditarVideo, PostarVideo };