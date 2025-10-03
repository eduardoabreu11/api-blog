import serviceUsuario from "../services/service.usuario.js";


async function Inserir(req, res) {


    try{
    const {nome, email, senha} = req.body;
    
   
    const usuario = await serviceUsuario.Inserir(nome,email,senha)

    
    res.status(201).json(usuario)

    }catch(error){
        res.status(500).json({error})
    }

}

async function Login(req, res) {


    try{
    const { email, senha} = req.body;

    const usuario = await serviceUsuario.Login(email,senha);

        if(usuario.length == 0)
            res.status(401).json({error: "Email ou senha inválidas"})
        else
            res.status(201).json(usuario)

    }catch(error){
            res.status(500).json({error})
    }

}


async function Perfil(req, res) {


    try{
    
    const id_usuario = req.id_usuario
    
   
    const usuario = await serviceUsuario.Perfil(id_usuario)
        
    res.status(201).json(usuario)

    }catch(error){
        res.status(500).json({error})
    }

}

async function Editar(req, res) {


    try{

    const id_usuario = req.id_usuario
    const {nome, email} = req.body;

    const usuario = await serviceUsuario.Editar(id_usuario,nome,email, )

    res.status(201).json(usuario)

    }catch(error){
        res.status(500).json({error})
    }

}

async function Senha(req, res) {


    try{

    const id_usuario = req.id_usuario
    const {senha} = req.body;

    const usuario = await serviceUsuario.Senha(id_usuario,senha )

    res.status(201).json(usuario)

    }catch(error){
        res.status(500).json({error})
    }

}






export default {Inserir, Login, Perfil, Editar, Senha}