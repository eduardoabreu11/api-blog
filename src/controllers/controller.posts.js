import servicePosts from "../services/service.posts.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

/* =========================
   POSTS
========================= */

async function Inserir(req, res) {
  try {
    const id_usuario = req.id_usuario;
    const { titulo, texto } = req.body;
    let imagem_url = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "posts");
      imagem_url = upload.secure_url;
    }

    const post = await servicePosts.Inserir(
      texto,
      imagem_url,
      id_usuario,
      titulo
    );

    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao inserir post" });
  }
}

async function Editar(req, res) {
  try {
    const id_usuario = req.id_usuario;
    const { id_post } = req.params;
    const { texto, titulo } = req.body;
    let imagem_url = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "posts");
      imagem_url = upload.secure_url;
    }

    const postAtualizado = await servicePosts.Editar({
      id_usuario,
      id_post,
      texto,
      imagem_url,
      titulo,
    });

    return res.status(200).json(postAtualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao editar post" });
  }
}

async function Excluir(req, res) {
  try {
    const id_usuario = req.id_usuario;
    const { id_post } = req.params;

    const result = await servicePosts.Excluir(id_usuario, id_post);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao excluir post" });
  }
}

async function PostsId(req, res) {
  try {
    const id_usuario = req.id_usuario;
    const { id_post } = req.params;

    const post = await servicePosts.PostsId(id_usuario, id_post);

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar post" });
  }
}


async function Posts(req, res) {
  try {
    const id_usuario = req.id_usuario;
    const posts = await servicePosts.Posts(id_usuario);
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar posts" });
  }
}

async function Configurar(req, res) {
  try {
    const { id_post } = req.params;
    const { ativo, ordem } = req.body;

    const post = await servicePosts.Configurar({
      id_post,
      ativo,
      ordem
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}


/* =========================
   POSTS PÚBLICOS (BLOG)
========================= */

async function PostsUsuarios(req, res) {
  try {
    const posts = await servicePosts.PostsUsuarios();
    
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar posts" });
  }
}

async function IdPost(req, res) {
  try {
    const { id_post } = req.params;
    const post = await servicePosts.IdPost(id_post);

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar post" });
  }
}



export default {
  Inserir,
  Editar,
  Excluir,
  Posts,
  PostsId,
  PostsUsuarios,
  IdPost,
  Configurar
};
