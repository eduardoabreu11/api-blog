import serviceUsuario from "../services/service.usuario.js";

describe("testando rotinas de usuario" , ()=> {
    it("Deve validar o login", async () => {
        const email = "teste123@hotmail.com";
        const senha = "teste123";

        const usuario = await serviceUsuario.Login({email, senha})

        expect(usuario).toHaveProperty("id")
    })
})