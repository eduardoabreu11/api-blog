import { Router } from "express";
import controllerUsuario from "./controllers/controller.usuario.js";
import controllerPosts from "./controllers/controller.posts.js";
import controllerColunistas from "./controllers/controller.colunistas.js";
import controllerBanners from "./controllers/controller.banners.js";
import controllerVideos from "./controllers/controller.videos.js";
import jwt from "./token.js";
import upload from "./middlewares/upload.js";
import uploadVideo from "./middlewares/upload.video.js";

import controllerMaterias from "./controllers/controller.materias.js";

const router = Router();



// usuarios

router.post("/usuarios/login", controllerUsuario.Login);
router.post("/usuarios/registro", controllerUsuario.Inserir);
router.get("/usuarios", jwt.ValidateJwt ,controllerUsuario.Perfil);
router.put("/usuarios", jwt.ValidateJwt, controllerUsuario.Editar);
router.put("/usuarios/password", jwt.ValidateJwt , controllerUsuario.Senha);


// posts
router.post("/posts",jwt.ValidateJwt , upload.single("imagem"), controllerPosts.Inserir);
router.get("/posts/admin", jwt.ValidateJwt , controllerPosts.Posts);
router.get("/posts/admin/:id_post",jwt.ValidateJwt , controllerPosts.PostsId);
router.put("/posts/:id_post",jwt.ValidateJwt , upload.single("imagem"), controllerPosts.Editar);
router.delete("/posts/:id_post",jwt.ValidateJwt , controllerPosts.Excluir);

router.get("/posts", controllerPosts.PostsUsuarios);
router.get("/posts/:id_post", controllerPosts.IdPost);



// =========================
// BANNERS
// =========================

router.get("/banners/:id_banner", controllerBanners.PegarBanner);

router.get("/banners", controllerBanners.ListarBanners);

router.post(
  "/banners",
  jwt.ValidateJwt,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "banner_mobile", maxCount: 1 }
  ]),
  controllerBanners.InserirBanner
);

router.put(
  "/banners/:id_banner",
  jwt.ValidateJwt,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "banner_mobile", maxCount: 1 }
  ]),
  controllerBanners.EditarBanner
);



// video
router.get("/videos", controllerVideos.ListarVideos);
router.get("/videos/ativo", controllerVideos.PegarVideoAtivo);
router.get("/videos/:id_video", controllerVideos.PegarVideos);

router.post(
  "/videos",
  jwt.ValidateJwt,
  uploadVideo.fields([
    { name: "video", maxCount: 1 },
    { name: "capa_video", maxCount: 1 }
  ]),
  controllerVideos.PostarVideo
);


router.put(
  "/videos/:id_video",
  jwt.ValidateJwt,
  uploadVideo.single("video"),
  controllerVideos.EditarVideos
);

router.put(
  "/videos/:id_video/ativar",
  jwt.ValidateJwt,
  controllerVideos.AtivarVideo
);




// Colunistas
router.get("/admin/colunistas", jwt.ValidateJwt,  controllerColunistas.PegarColunistas);  
router.post("/colunistas", jwt.ValidateJwt, upload.single('foto'), controllerColunistas.InserirColunista);  
router.put("/colunistas/:id_colunista", jwt.ValidateJwt, upload.single('foto'), controllerColunistas.EditarColunista);  
router.delete("/colunistas/:id_colunista", jwt.ValidateJwt, controllerColunistas.ExcluirColunista);  

router.get("/colunistas", controllerColunistas.ListarColunistas); 


// Posts do colunista
router.get("/admin/colunistas/:id_colunista/posts", jwt.ValidateJwt, controllerColunistas.PegarPosts);  
router.post("/colunistas/:id_colunista/posts", jwt.ValidateJwt, upload.single('foto'), controllerColunistas.InserirPost);  
router.put("/colunistas/:id_colunista/posts/:id_post_colunista", jwt.ValidateJwt, upload.single('foto'), controllerColunistas.EditarPost);  
router.delete("/colunistas/:id_colunista/posts/:id_post_colunista", jwt.ValidateJwt, controllerColunistas.ExcluirPost);

router.get("/colunistas/:id_colunista/posts", controllerColunistas.ListarPosts);



//Materias
router.get("/admin/materias", jwt.ValidateJwt, controllerMaterias.PegarMaterias);  
router.get("/admin/materias/:id_materia", jwt.ValidateJwt, controllerMaterias.PegarMateria);  
router.post("/materias", jwt.ValidateJwt, upload.single('imagem_url'),controllerMaterias.InserirMateria);  
router.put("/materias/:id_materia", jwt.ValidateJwt, upload.single('imagem_url'),controllerMaterias.EditarMateria);  
router.delete("/materias/:id_materia", jwt.ValidateJwt, controllerMaterias.ExcluirMateria);  

router.get("/materias", controllerMaterias.ListarMaterias);
router.get("/materias/:id_materia", controllerMaterias.ListarMateria);



export default router;