import servicePosts from "../services/service.posts.js";


async function Inserir(req, res) {
  try {




    const id_usuario = req.id_usuario;
    const { titulo } = req.body;
    const { texto } = req.body;
    let imagem_url = null;

    if (req.file) {
      // cria a URL pública da imagem
      const host = req.get("host");
      const protocol = req.protocol;
      imagem_url = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    // envia para o service/posts servicePosts.Inserir
    const post = await servicePosts.Inserir(texto, imagem_url, id_usuario, titulo);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function Editar(req, res) {
  try {
    const id_usuario = req.id_usuario;
    const id_post = req.params.id_post;
    const { texto } = req.body;

    let imagem_url = null;

    // Se o usuário enviou nova imagem, monta a URL pública
    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      imagem_url = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const postAtualizado = await servicePosts.Editar(id_usuario, id_post, texto, imagem_url);

    res.status(200).json(postAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao editar post" });
  }
}

async function Excluir(req, res) {


    try{

   const id_usuario = req.id_usuario
    const id_post = req.params.id_post;
    

    const usuario = await servicePosts.Excluir(id_usuario,id_post )

    res.status(201).json(usuario)

    }catch(error){
        res.status(500).json({error})
    }

}

async function PostsId(req, res) {


    try{

    const id_usuario = req.id_usuario
    const id_post = req.params.id_post;

    
    
    

    const usuario = await servicePosts.PostsId(id_usuario, id_post )

    res.status(201).json(usuario)

    }catch(error){
        res.status(500).json({error})
    }

}




async function Posts(req, res) {


    try{

    const id_usuario = req.id_usuario
    
    

    const usuario = await servicePosts.Posts(id_usuario )

    res.status(201).json(usuario)

    }catch(error){
        res.status(500).json({error})
    }

}


// get para o blog

async function PostsUsuarios(req, res) {


    try{

    
    
    

    const usuario = await servicePosts.PostsUsuarios()

    res.status(201).json(usuario)

    }catch(error){
        res.status(500).json({error})
    }

}


async function IdPost (req, res) {
     try {
    const { id_post } = req.params;
    console.log(id_post)
    const post = await servicePosts.IdPost(id_post);

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar post" });
  }
}



export default {Inserir, Editar, Excluir, Posts, PostsId, PostsUsuarios, IdPost}



