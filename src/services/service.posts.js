import repoPosts from "../repositories/repository.posts.js"

async function Inserir(texto, imagem_url, id_usuario, titulo) {



  const usuario = await repoPosts.Inserir(texto, imagem_url, id_usuario, titulo);

  
  return usuario;
}



async function Editar(id_usuario, id_post, texto, imagem_url) {

  const post = await repoPosts.Editar(id_usuario, id_post, texto, imagem_url);

  
  return post;
}

async function Excluir(id_usuario, id_post) {


    

    

    const usuario = await repoPosts.Excluir(id_usuario, id_post )

    return usuario

   

}

async function PostsId(id_usuario, id_post) {



    
    const usuario = await repoPosts.PostsId(id_usuario, id_post )

    return usuario

   

}



async function Posts(id_usuario) {




    const usuario = await repoPosts.Posts(id_usuario )

    return usuario

   

}

async function PostsUsuarios() {




    const usuario = await repoPosts.PostsUsuarios( )

    return usuario

   

}

async function IdPost(id_post) {




    const usuario = await repoPosts.IdPost(id_post)

    return usuario

   

}







export default {Inserir, Editar, Excluir, Posts, PostsId, PostsUsuarios, IdPost}