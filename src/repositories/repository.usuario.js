import { query } from "../database/sqlite.js";



async function Inserir(nome, email, senha) {

    
   let sql = `insert into usuarios(nome , email , senha) values(?, ?, ?) returning id_usuario`;
   const usuario = await query(sql, [nome, email,senha]);
   


    return usuario[0];

  

}

async function ListarByEmail(email) {

    let sql = `select * from usuarios where email = ?`;
   const usuario = await query(sql, [email]);

   if(usuario.length == 0)
    return []
   else
    return usuario[0]


    

}


async function ListarById(id_usuario) {

    let sql = `SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = ?`;
   const usuario = await query(sql, [id_usuario]);

   if(usuario.length == 0)
    return []
   else
    return usuario[0]


    

}

async function Editar(id_usuario, nome, email) {


    
     
   let sql = `update usuarios set nome =?, email =? where id_usuario = ?`;
   const usuario = await query(sql, [nome, email,id_usuario]);


    return {id_usuario};
    

   

}

async function Senha(id_usuario, senha) {


  let sql = `update usuarios set senha =? where id_usuario = ?`;
   const usuario = await query(sql, [senha, id_usuario]);
   console.log(usuario)


    return {id_usuario};
    

}






export default {Inserir, ListarByEmail, ListarById, Editar, Senha}