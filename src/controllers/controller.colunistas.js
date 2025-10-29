import serviceColunistas from "../services/serviceColunistas.js";

async function PegarColunistas(req, res) {
  try {
    const colunistas = await serviceColunistas.PegarColunistas(); 

    if (!colunistas || colunistas.length === 0) {
      return res.status(404).json({ error: "Nenhum colunista encontrado" });
    }

    res.status(200).json(colunistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar colunistas" });
  }
}

async function ListarColunistas(req, res) {
  try {
    const colunistas = await serviceColunistas.ListarColunistas(); 

    if (!colunistas || colunistas.length === 0) {
      return res.status(404).json({ error: "Nenhum colunista encontrado" });
    }

    res.status(200).json(colunistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar colunistas" });
  }
}

async function InserirColunista(req, res) {
  try {

    console.log("Ae")

    const { nome } = req.body;
    console.log(nome)
    let foto = null;

    if (req.file) {
      // cria a URL pública da imagem
      const host = req.get("host");
      const protocol = req.protocol;
      foto = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    // envia para o service/posts servicePosts.Inserir
    const post = await serviceColunistas.InserirColunista({nome, foto});

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
}


async function EditarColunista(req, res) {
  try {
    
    const id_colunista = req.params.id_colunista;
    const { nome } = req.body;

    let foto = null;

    // Se o usuário enviou nova imagem, monta a URL pública
    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      foto = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const colunistaAtualizado = await serviceColunistas.EditarColunista({nome, foto, id_colunista});

    res.status(200).json(colunistaAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao editar post" });
  }
}


async function ExcluirColunista(req, res) {
  try {
    const { id_colunista } = req.params;

     console.log(id_colunista + "controller")

    const colunistaExcluido = await serviceColunistas.ExcluirColunista({ id_colunista });

    res.status(200).json(colunistaExcluido);
  } catch (error) {
    res.status(500).json({ error });
  }
}



// posts dos colunistas



async function PegarPosts(req, res) {
  try {

    const { id_colunista } = req.params;
    const posts = await serviceColunistas.PegarPosts(id_colunista); 

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "Nenhum post encontrado" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar posts do colunista" });
  }
}

async function ListarPosts(req, res) {
  try {

    const { id_colunista } = req.params;
    const posts = await serviceColunistas.ListarPosts(id_colunista); 

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "Nenhum post encontrado" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar posts do colunista" });
  }
}


async function InserirPost(req, res) {
  try {


    const { id_colunista } = req.params;
    const { titulo } = req.body;
    const { texto } = req.body;
    let foto = null;

    if (req.file) {
      // cria a URL pública da imagem
      const host = req.get("host");
      const protocol = req.protocol;
      foto = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    // envia para o service/posts servicePosts.Inserir
    const post = await serviceColunistas.InserirPost({titulo, texto, foto, id_colunista});

    res.status(201).json(post);
  } catch (error) {
    console.error("ERRO InserirPost:", error);
    res.status(500).json({ error: error.message });
}
}



async function EditarPost(req, res) {
  try {
    
    const { id_colunista, id_post_colunista } = req.params;
    const { titulo, texto } = req.body;

    console.log(id_post_colunista + " id_post_colunista")

    let foto = null;

    // Se o usuário enviou nova imagem, monta a URL pública
    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      foto = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const PostAtualizado = await serviceColunistas.EditarPost({id_colunista, id_post_colunista, titulo,texto, foto});

    res.status(200).json(PostAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao editar post" });
  }
}


async function ExcluirPost(req, res) {
  try {

    console.log("ae")
    const { id_post_colunista, id_colunista } = req.params;
    
    
    console.log(id_colunista, id_post_colunista + " controller")
    const PostExcluido = await serviceColunistas.ExcluirPost({ id_post_colunista, id_colunista });

    res.status(200).json(PostExcluido);
  } catch (error) {
    res.status(500).json({ error });
  }
}








export default {PegarColunistas, InserirColunista, EditarColunista, ExcluirColunista, PegarPosts,InserirPost,ListarPosts, ListarColunistas , EditarPost, ExcluirPost}