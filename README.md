# Encontrei — Frontend (Vite + React)

Este repositório contém um frontend de desenvolvimento para o projeto *Encontrei*. O objetivo é oferecer uma interface simples para testar as APIs já implementadas no backend (`Encontrei-backend`).

Principais pontos:
- O backend padrão do projeto roda em `http://localhost:5000`.
- Em desenvolvimento usamos o Vite dev server (porta `5173`) com proxy para o backend — isso evita problemas de CORS.
- Para servir o frontend na mesma porta do backend (5000) você pode fazer o build e copiar os arquivos para o backend e configurar o Express para servir os arquivos estáticos.

Requisitos
- Node.js >= 16

Instalação

1. Abra o PowerShell e entre na pasta do frontend:

```powershell
cd C:\Encontrei\Encontrei-frontend
```

2. Instale dependências:

```powershell
npm install
```

Desenvolvimento (dev)

- O servidor de desenvolvimento do Vite roda em `http://localhost:5173` por padrão e já contém proxy para as rotas do backend (`/products`, `/stores`, `/users`, `/reservations`).

```powershell
npm run dev
```

Enquanto o backend estiver rodando em `http://localhost:5000`, todas as requisições do frontend às rotas listadas serão encaminhadas ao backend (sem CORS).

Build e servir pela API (mesma porta do backend)

Se você realmente precisa que o frontend seja servido pela mesma porta (`5000`) para testes integrados, siga estes passos:

1. Gere o build:

```powershell
cd C:\Encontrei\Encontrei-frontend
npm run build
```

2. Copie os arquivos do build (`dist`) para uma pasta pública no backend (ex.: `Encontrei-backend/public`):

```powershell
# execute a partir de C:\Encontrei\Encontrei-frontend
$dst = "..\Encontrei-backend\public"
if(Test-Path $dst){ Remove-Item $dst -Recurse -Force }
New-Item -ItemType Directory -Path $dst | Out-Null
Copy-Item -Path "dist\*" -Destination $dst -Recurse -Force
```

3. Configure o backend para servir estáticos (adicionar no `Encontrei-backend/src/index.js`):

```javascript
const path = require('path')
app.use(express.static(path.join(__dirname, '../public')))

// fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
```

4. Reinicie o backend (`npm run dev` no backend). Agora abra `http://localhost:5000` para ver o frontend servido pela mesma porta.

Observações sobre CORS e porta 5000
- Dois servidores não podem escutar a mesma porta simultaneamente. Por isso a opção recomendada em desenvolvimento é usar o proxy do Vite (dev) que encaminha chamadas ao backend.
- Para testes integrados (mesma origem), construa e copie os arquivos para o backend e deixe o Express servir a pasta `public`.

Estrutura (resumida)

- `src/` — código React
  - `main.jsx` — entry
  - `App.jsx` — rotas e layout
  - `api.js` — funções para chamar as rotas do backend
  - `components/` — `ProductList`, `ProductDetail`, `StoreList`, `ReservationForm`

APIs usadas (do backend)
- `GET /products` — lista produtos
- `GET /products/:id` — detalhes do produto
- `GET /stores` — lista lojas
- `GET /users` — lista usuários (usado como compradores)
- `GET /reservations` — lista reservas
- `POST /reservations` — criar reserva (body JSON: `productId`, `buyerId`, `date`, `note`)

Próximos passos sugeridos
- Melhorar o layout e adicionar autenticação (login)
- Salvar reservas locais e mostrar histórico
- Adicionar paginação / filtros para listagem de produtos

Se quiser, eu adiciono um script automatizado para copiar o `dist` para o backend e até alterar o `index.js` do backend para servir automaticamente.
