Requisitos funcionais:
-[x] usuario(admin) se autentica na web
    POST /usuarios/login
-[x] usuario(admin) cria sua conta  
    POST /usuarios/registro

-[x] admin/usuarios recebem todos os posts
    GET /posts

-[x] (Admin) visualiza um post específico por ID
    GET /posts/id_post

-[x] (admin)edita post
    PUT /posts/id_post

-[x] (admin)insere post
    POST /posts

-[x] (admin)exclui post
    DELETE /posts/id_post


-[] admin/usuarios recebem todos videos e banners
    GET/midia

-[] (admin) edita video e banner
    PUT/midia


-[x] admin recebem todos colunistas
    GET /colunistas

-[x] (admin) insere colunistas
    POST /colunistas

-[x] (admin) edita colunistas
    PUT /colunistas/ID_COLUNISTA

-[x] (admin) remove colunistas
    DELETE /colunistas/ID_COLUNISTA

-[x] admin recebem todos posts do colunista
    GET /colunistas/:id_colunista/posts

-[x] (admin/colunista) insere post
    POST /colunistas/:id_colunista/posts

-[x] (admin/colunista) edita post
    PUT /colunistas/:id_colunista/posts/ID_POST

-[x] (admin/colunista) exclui post
    DELETE /colunistas/:id_colunista/posts/ID_POST

    


-[] (admin) recebem todos texto com imagem
    GET /texto

-[] (Admin) visualiza um texto com imagem específico por ID
    GET /textos/:id_texto

-[] (admin) insere texto com imagem
    POST /textos

-[] (admin) edita texto com imagem
    PUT /textos/:id_texto

-[] (admin) exclui texto com imagem
    DELETE /textos/:id_texto




requisistos nao funcionais

-[] jwt para identificação
-[] senha criptografada


regras de negocio
-[] (admin)Todos campos obrigatorios
-[] (admin) texto minimo 100 caractres
-[]  Ordem de exibição dos posts: sempre do mais recente para o mais antigo
