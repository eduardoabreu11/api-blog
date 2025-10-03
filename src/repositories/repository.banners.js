import { query } from "../database/sqlite.js";



async function PegarBanner(id_banner) {
      
  const sql = `SELECT id_banner, banner FROM banners WHERE id_banner = ?`;
  const result = await query(sql, [id_banner]);
  return result[0] || null;
}

async function ListarBanners() {
      
  const sql = `SELECT * FROM banners`;
  const result = await query(sql, []);
  return result;
}


async function InserirBanner(fotoUrl) {
  let sql = `INSERT INTO banners(banner) VALUES(?) RETURNING id_banner`;
  const banner = await query(sql, [fotoUrl]);
  return banner[0];
}


async function EditarBanner({id_banner, foto}) {

    
  let sql = `
    update banners
       set banner = coalesce(?, banner)
        where id_banner = ?
     returning id_banner, banner
  `;

  const banner = await query(sql, [ foto, id_banner]);

  return banner[0] || null;
}


export default {EditarBanner, PegarBanner, InserirBanner, ListarBanners}
