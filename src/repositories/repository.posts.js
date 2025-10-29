import { query } from "../database/sqlite.js";



async function Inserir(texto, imagem_url, id_usuario, titulo) {
  let sql = `
    insert into posts(texto, imagem_url, id_usuario, titulo)
    values(?, ?, ?, ?)
    returning id_post, texto, imagem_url, id_usuario, titulo
  `;
  const post = await query(sql, [texto, imagem_url, id_usuario, titulo]);
  return post[0];
}


async function Editar({id_usuario, id_post, texto, imagem_url, titulo}) {
  let sql = `
    update posts
       set texto = coalesce(?, texto),
          imagem_url = coalesce(?, imagem_url),
          titulo = coalesce(?, titulo)
     where id_usuario = ? and id_post = ?
  `;

  await query(sql, [texto, imagem_url, titulo, id_usuario, id_post]);

  // Pega o registro atualizado
  const rows = await query(
    "select id_post, texto, imagem_url, titulo, id_usuario from posts where id_post = ? and id_usuario = ?",
    [id_post, id_usuario]
  );

  return rows[0] || null;
}


async function PostsId(id_usuario, id_post) {

    
    let sql = `SELECT * FROM posts WHERE id_usuario = ? and id_post = ?`;
    
   const posts = await query(sql, [id_usuario, id_post]);
   


    return posts[0];

  

}



async function Posts(id_usuario) {

    
    let sql = `SELECT * FROM posts ORDER BY id_post DESC`;
   const posts = await query(sql, [id_usuario]);
   


    return posts;

  

}

async function PostsUsuarios() {

    
    let sql = `SELECT * FROM posts  ORDER BY id_post DESC`;
   const posts = await query(sql, []);
   


    return posts;

  

}
async function IdPost(id_post) {

    
    let sql = `SELECT * FROM posts  where id_post = ?`;
   const posts = await query(sql, [id_post]);
   


    return posts;

  

}


async function Excluir(id_usuario, id_post) {


  let sql = `delete from posts where id_usuario = ? and id_post = ?`;
    await query(sql, [id_usuario, id_post]);
   


    return {id_post};
    

}




export default {Inserir,Posts, PostsId, Editar, Excluir, PostsUsuarios, IdPost}