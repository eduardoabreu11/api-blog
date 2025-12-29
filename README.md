# 📰 API — Blog 

API desenvolvida em **Node.js + Express** com **JWT**, **Multer** para upload de imagens/vídeos e **SQLite** para persistência.  
Ela atende **três camadas** do projeto:

- **1️⃣ Site público (visitantes)**
- **2️⃣ Painel do Admin Máximo** (controle total)
- **3️⃣ Painel de Colunistas** (controle parcial dos conteúdos próprios)

---

## 🚀 Tecnologias

- Node.js
- Express
- SQLite3
- Multer (upload)
- JWT
- Bcrypt
- CORS
- Dotenv

---

## 📦 Instalação

```bash
git clone https://github.com/seuusuario/api-blog.git
cd api-blog
npm install
```

---

## ▶️ Rodar o servidor

Crie o arquivo `.env`:

```
PORT=3001
JWT_SECRET=seusecretodetoken
```

Start:

```bash
node index.js
```

---

# 🔐 Sistema de Permissões

### 👑 **Administrador Máximo**
Pode:
- Criar/editar/excluir usuários
- Criar/editar/excluir posts
- Criar banners
- Criar vídeos
- Criar colunistas
- Manipular matérias
- Gerenciar posts de colunistas

### ✍️ **Colunista**
Pode:
- Editar apenas seu próprio perfil
- Criar/editar/excluir **somente seus posts**
- Não acessa dados de outros colunistas

### 🌎 **Visitantes**
Podem:
- Ver posts públicos
- Ver matérias
- Ver colunistas
- Ver vídeos e banners

---

# 📁 Estrutura do Projeto

```
src/
 ├── controllers/
 │     ├── controllerUsuario.js
 │     ├── controllerPosts.js
 │     ├── controllerBanners.js
 │     ├── controllerVideos.js
 │     ├── controllerColunistas.js
 │     └── controllerMaterias.js
 │
 ├── database/
 │     ├── database.db
 │     └── sqlite.js
 │
 ├── repositories/
 │     ├── repoUsuario.js
 │     ├── repoPosts.js
 │     ├── repoBanners.js
 │     ├── repoVideos.js
 │     ├── repoColunistas.js
 │     └── repoMaterias.js
 │
 ├── services/
 │     ├── serviceUsuario.js
 │     ├── servicePosts.js
 │     ├── serviceColunistas.js
 │     ├── serviceMaterias.js
 │     ├── serviceBanners.js
 │     └── serviceVideos.js
 │
 ├── uploads/
 ├── uploads_videos/
 ├── routes.js
 ├── token.js
 ├── index.js
```

---

# 📡 Rotas da API

## 👤 **Usuários**
```
POST   /usuarios/login
POST   /usuarios/registro
GET    /usuarios
PUT    /usuarios
PUT    /usuarios/password
```

---

## 📝 **Posts (Admin)**
```
POST   /posts
GET    /posts/admin
GET    /posts/admin/:id_post
PUT    /posts/:id_post
DELETE /posts/:id_post
```

## 📰 **Posts Públicos**
```
GET    /posts
GET    /posts/:id_post
```

---

## 🎥 Vídeos
```
GET    /videos/:id_video
POST   /videos
PUT    /videos/:id_video
```

---

## 🏞 Banners
```
GET    /banners
GET    /banners/:id_banner
POST   /banners
PUT    /banners/:id_banner
```

---

# ✍️ Colunistas

### 👑 Admin
```
GET    /admin/colunistas
POST   /colunistas
PUT    /colunistas/:id_colunista
DELETE /colunistas/:id_colunista
```

### 🌎 Público
```
GET    /colunistas
```

---

# 📝 Posts dos Colunistas

### 👑 Admin
```
GET    /admin/colunistas/:id_colunista/posts
POST   /colunistas/:id_colunista/posts
PUT    /colunistas/:id_colunista/posts/:id_post_colunista
DELETE /colunistas/:id_colunista/posts/:id_post_colunista
```

### 🌎 Público
```
GET    /colunistas/:id_colunista/posts
```

---

# 📰 Matérias

### 👑 Admin
```
GET    /admin/materias
GET    /admin/materias/:id_materia
POST   /materias
PUT    /materias/:id_materia
DELETE /materias/:id_materia
```

### 🌎 Público
```
GET    /materias
GET    /materias/:id_materia
```

---

# 🖼 Uploads

### 📸 Imagens  
passam pela pasta:

```
/uploads
```

### 🎥 Vídeos  
passam pela pasta:

```
/uploads_videos
```

Rotas para upload usam `multer.single("imagem")` ou `multer.single("video_url")`.

---

# 🔑 Autenticação

O login retorna um token JWT:

```json
{
  "token": "token123..."
}
```

Usar assim:

```
Authorization: Bearer seu_token
```

Todas as rotas de admin e colunista **exigem JWT**.

---

# ✔️ Status

API estável, modularizada e pronta para integrar com:

- painel do admin
- painel dos colunistas
- front-end do blog

---
