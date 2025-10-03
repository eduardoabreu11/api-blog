import jwt from "jsonwebtoken";
import "dotenv/config";

const secretToken = process.env.JWT_SECRET;

function CreateJwt(id_usuario){
    const token = jwt.sign({id_usuario},secretToken, {
        expiresIn:999999
    });

    return token
}


function ValidateJwt(req, res, next){
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).send({error:"token não informado"});
    }

    const [aux, token] =authToken.split(" ");

    jwt.verify(token, secretToken, (err, decoded) =>{
        if(err)
            return res.status(401).send({error: "Token inválido"})

        //salva id e ususario dentro da req para ser usado no futuro

        req.id_usuario = decoded.id_usuario;

        next();
    });
}

export default {CreateJwt, ValidateJwt}