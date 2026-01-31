import serviceColunistas from "../services/serviceColunistas.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

/* =========================
   COLUNISTAS
========================= */

async function PegarColunistas(req, res) {
  try {
    const colunistas = await serviceColunistas.PegarColunistas();
    return res.status(200).json(colunistas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar colunistas" });
  }
}

async function PegarPost(req, res) {
  try {
    const { id_colunista, id_post_colunista } = req.params;

    const post = await serviceColunistas.PegarPost({
      id_colunista,
      id_post_colunista,
    });

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar post" });
  }
}


async function ListarColunistas(req, res) {
  try {
    const colunistas = await serviceColunistas.ListarColunistas();
    return res.status(200).json(colunistas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar colunistas" });
  }
}

async function InserirColunista(req, res) {
  try {
    const { nome } = req.body;
    let foto = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "colunistas");
      foto = upload.secure_url;
    }

    const colunista = await serviceColunistas.InserirColunista({ nome, foto });

    return res.status(201).json(colunista);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao inserir colunista" });
  }
}

async function EditarColunista(req, res) {
  try {
    const { id_colunista } = req.params;
    const { nome } = req.body;
    let foto = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "colunistas");
      foto = upload.secure_url;
    }

    const colunista = await serviceColunistas.EditarColunista({
      id_colunista,
      nome,
      foto,
    });

    return res.status(200).json(colunista);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao editar colunista" });
  }
}

async function ExcluirColunista(req, res) {
  try {
    const { id_colunista } = req.params;
    const result = await serviceColunistas.ExcluirColunista({ id_colunista });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao excluir colunista" });
  }
}

/* =========================
   POSTS DOS COLUNISTAS
========================= */

async function PegarPosts(req, res) {
  try {
    const { id_colunista } = req.params;
    const posts = await serviceColunistas.PegarPosts(id_colunista);
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar posts do colunista" });
  }
}

async function ListarPosts(req, res) {
  try {
    const { id_colunista } = req.params;
    const posts = await serviceColunistas.ListarPosts(id_colunista);
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar posts do colunista" });
  }
}

async function InserirPost(req, res) {
  try {
    const { id_colunista } = req.params;
    const { titulo, texto } = req.body;
    let foto = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "colunistas_posts");
      foto = upload.secure_url;
    }

    const post = await serviceColunistas.InserirPost({
      id_colunista,
      titulo,
      texto,
      foto,
    });

    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao inserir post" });
  }
}

async function EditarPost(req, res) {
  try {
    const { id_colunista, id_post_colunista } = req.params;
    const { titulo, texto } = req.body;
    let foto = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file, "colunistas_posts");
      foto = upload.secure_url;
    }

    const post = await serviceColunistas.EditarPost({
      id_colunista,
      id_post_colunista,
      titulo,
      texto,
      foto,
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao editar post" });
  }
}

async function ExcluirPost(req, res) {
  try {
    const { id_post_colunista, id_colunista } = req.params;
    const result = await serviceColunistas.ExcluirPost({
      id_post_colunista,
      id_colunista,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao excluir post" });
  }
}

export default {
  PegarColunistas,
  ListarColunistas,
  InserirColunista,
  EditarColunista,
  ExcluirColunista,
  PegarPosts,
  ListarPosts,
  InserirPost,
  EditarPost,
  ExcluirPost,
  PegarPost
};
