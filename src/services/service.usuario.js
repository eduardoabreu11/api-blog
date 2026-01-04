import bcrypt from "bcrypt";
import jwt from "../token.js";
import repoUsuario from "../repositories/repository-pg.usuario.js"



async function Inserir(nome, email, senha) {

    const hashSenha = await bcrypt.hash(senha, 10);
   
   
    const usuario = await repoUsuario.Inserir(nome,email,hashSenha)

    usuario.token = jwt.CreateJwt(usuario.id_usuario);
    
    

    return usuario;

  

}

async function Login(email, senha) {


    
    const usuario = await repoUsuario.ListarByEmail(email);

    if (usuario.length == 0)
            return [];
    else{
        if (await bcrypt.compare(senha, usuario.senha)){
            
            delete usuario.senha
            usuario.token = jwt.CreateJwt(usuario.id_usuario);

            return usuario
        }

        else{
            return [];
        }
    }

      

}


async function Perfil(id_usuario) {


    
   
    const usuario = await repoUsuario.ListarById(id_usuario);

    return usuario


    

}

async function Editar(id_usuario, nome, email) {


    

    

    const usuario = await repoUsuario.Editar(id_usuario,nome,email, )

    return usuario

   

}

async function Senha(id_usuario, senha) {

    const hashSenha = await bcrypt.hash(senha,10)

    const usuario = await repoUsuario.Senha(id_usuario,hashSenha )

    return usuario
}






export default {Inserir, Login, Perfil, Editar, Senha}