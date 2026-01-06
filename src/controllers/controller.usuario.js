import serviceUsuario from "../services/service.usuario.js";

/* =========================
   USUÁRIO
========================= */

async function Inserir(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const usuario = await serviceUsuario.Inserir(nome, email, senha);

    return res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

async function Login(req, res) {
  try {
    const { email, senha } = req.body;

    const usuario = await serviceUsuario.Login(email, senha);

    if (!usuario || usuario.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao realizar login" });
  }
}

async function Perfil(req, res) {
  try {
    const id_usuario = req.id_usuario;

    const usuario = await serviceUsuario.Perfil(id_usuario);

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar perfil" });
  }
}

async function Editar(req, res) {
  try {
    const id_usuario = req.id_usuario;
    const { nome, email } = req.body;

    const usuario = await serviceUsuario.Editar(id_usuario, nome, email);

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao editar usuário" });
  }
}

async function Senha(req, res) {
  try {
    const id_usuario = req.id_usuario;
    const { senha } = req.body;

    const usuario = await serviceUsuario.Senha(id_usuario, senha);

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao alterar senha" });
  }
}

export default {
  Inserir,
  Login,
  Perfil,
  Editar,
  Senha,
};
