import repoColunistas from "../repositories/repository.colunistas.js";


async function PegarColunistas() {




    const usuario = await repoColunistas.PegarColunistas( )

    return usuario

   

}

async function ListarColunistas() {




    const usuario = await repoColunistas.ListarColunistas( )

    return usuario

   

}


async function InserirColunista({nome, foto}) {



  const usuario = await repoColunistas.InserirColunista({nome, foto});

  
  return usuario;
}


async function EditarColunista({nome, foto, id_colunista}) {

  const post = await repoColunistas.EditarColunista({nome, foto, id_colunista});

  
  return post;
}

async function ExcluirColunista(id_colunista) {


    const usuario = await repoColunistas.ExcluirColunista(id_colunista )

    return usuario

   

}

//posts colunistas

async function PegarPosts(id_colunista) {




    const post = await repoColunistas.PegarPosts( id_colunista)

    return post

   

}
async function ListarPosts(id_colunista) {




    const post = await repoColunistas.ListarPosts( id_colunista)

    return post

   

}

async function InserirPost({titulo, texto, foto, id_colunista}) {



  const post = await repoColunistas.InserirPost({titulo, texto, foto, id_colunista});

  
  return post;
}


async function ExcluirPost({id_post_colunista, id_colunista}) {
      
         console.log(id_colunista, id_post_colunista + " service")
    const post = await repoColunistas.ExcluirPost({ id_post_colunista, id_colunista})

    return post

   

}

async function EditarPost({id_colunista, id_post_colunista, titulo,texto, foto}) {


    console.log(id_post_colunista + "service")
     
  const post = await repoColunistas.EditarPost({id_colunista, id_post_colunista, titulo,texto, foto});

  
  return post;
}














export default {PegarColunistas, InserirColunista, EditarColunista, ExcluirColunista,ListarColunistas,ListarPosts, PegarPosts,InserirPost, EditarPost, ExcluirPost}
