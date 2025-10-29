import { query } from "../database/sqlite.js";


async function PegarMaterias() {

    
    let sql = `SELECT * FROM materias  ORDER BY id_materia DESC`;
   const materia = await query(sql, []);
   


    return materia;

  

}

async function ListarMaterias() {

    
    let sql = `SELECT * FROM materias  ORDER BY id_materia DESC`;
   const materia = await query(sql, []);
   


    return materia;

  

}


async function PegarMateria(id_materia) {

    
    let sql = `SELECT * FROM materias where id_materia = ?  ORDER BY id_materia DESC`;
   const materia = await query(sql, [id_materia]);
   


    return materia[0];

  

}


async function ListarMateria(id_materia) {

    
    let sql = `SELECT * FROM materias where id_materia = ?  ORDER BY id_materia DESC`;
   const materia = await query(sql, [id_materia]);
   


    return materia[0];

  

}



async function InserirMateria({titulo, texto, imagem_url, subtitulo}) {
  let sql = `
    insert into materias(titulo, texto, imagem_url, subtitulo)
    values(?, ?, ?, ?)
    returning id_materia, titulo, texto, imagem_url, subtitulo
  `;
  const materia = await query(sql, [titulo, texto, imagem_url, subtitulo]);

  return materia[0];
}



async function EditarMateria({ id_materia, titulo, texto, imagem_url, subtitulo }) {
  const sql = `
    UPDATE materias
       SET titulo    = COALESCE(?, titulo),
           texto     = COALESCE(?, texto),
           imagem_url      = COALESCE(?, imagem_url),
           subtitulo = COALESCE(?, subtitulo)
     WHERE id_materia = ?
     RETURNING id_materia, titulo, texto, imagem_url, subtitulo
  `;

  const materia = await query(sql, [titulo, texto, imagem_url, subtitulo, id_materia]);

  return materia[0] || null;
}


async function ExcluirMateria({id_materia}) {
  console.log(id_materia)

  let sql = `delete from materias where id_materia = ?`;
    await query(sql, [id_materia]);
   


    return {id_materia};
    

}


export default {PegarMateria,PegarMaterias, InserirMateria,EditarMateria, ExcluirMateria, ListarMaterias, ListarMateria}
