import { query } from "../database/sqlite.js";

async function PegarColunistas() {

    
    let sql = `SELECT * FROM colunistas  ORDER BY id_colunista DESC`;
   const colunistas = await query(sql, []);
   


    return colunistas;

  

}

async function ListarColunistas() {

    
    let sql = `SELECT * FROM colunistas  ORDER BY id_colunista DESC`;
   const colunistas = await query(sql, []);
   


    return colunistas;

  

}



async function InserirColunista({nome, foto}) {
  let sql = `
    insert into colunistas(nome, foto)
    values(?, ?)
    returning id_colunista, nome, foto
  `;
  const colunista = await query(sql, [nome, foto]);

  return colunista[0];
}



async function EditarColunista({nome, foto, id_colunista}) {
  let sql = `
    update colunistas
       set nome = coalesce(?, nome),
          foto = coalesce(?, foto)
          
     where id_colunista = ?
  `;

  await query(sql, [nome, foto, id_colunista ]);

  // Pega o registro atualizado
  const rows = await query(
    "select nome, foto, id_colunista from colunistas where id_colunista = ?",
    [id_colunista]
  );

  return rows[0] || null;
}



async function ExcluirColunista(id_colunista) {


  let sql = `delete from colunistas where id_colunista = ?`;
    await query(sql, [id_colunista]);
   


    return {id_colunista};
    

}

// posts colunistas

async function PegarPosts(id_colunista) {

    
    let sql = `SELECT * FROM posts_colunistas where id_colunista = ? ORDER BY id_post_colunista DESC`;
   const postcolunistas = await query(sql, [id_colunista]);
   


    return postcolunistas;

  

}

async function ListarPosts(id_colunista) {

    
    let sql = `SELECT * FROM posts_colunistas where id_colunista = ? ORDER BY id_post_colunista DESC`;
   const postcolunistas = await query(sql, [id_colunista]);
   


    return postcolunistas;

  

}



async function InserirPost({titulo, texto, foto, id_colunista}) {
  let sql = `
    insert into posts_colunistas(id_colunista ,titulo, foto, texto)
    values(?, ?, ?, ?)
    returning id_colunista, id_post_colunista, titulo, foto, texto
  `;
  const postcolunista = await query(sql, [ id_colunista ,titulo, foto,  texto]);

  return postcolunista[0];
}



async function EditarPost({id_post_colunista, id_colunista, titulo, texto, foto}) {

    
  let sql = `
    update posts_colunistas
       set foto = coalesce(?, foto),
           texto = coalesce(?, texto),
           titulo = coalesce(?, titulo)
     where id_colunista = ? and id_post_colunista = ?
     returning id_colunista, titulo, foto, texto
  `;

  const postcolunista = await query(sql, [ foto, texto, titulo, id_colunista, id_post_colunista]);

  return postcolunista[0] || null;
}



async function ExcluirPost({id_colunista, id_post_colunista}) {
    
   
  let sql = `delete from posts_colunistas where id_colunista = ? and id_post_colunista = ?`;

 await query(sql, [id_colunista, id_post_colunista]);
   


    return id_post_colunista ;
    

}












export default {PegarColunistas, InserirColunista, EditarColunista, ExcluirColunista,ListarColunistas,ListarPosts, PegarPosts,InserirPost, EditarPost, ExcluirPost}
