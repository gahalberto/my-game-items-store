# 🎮 Habbo Store - Loja de Mobis para Habbo Origins

Uma loja completa e moderna para venda de mobis do Habbo Origins, construída com Next.js 15, TypeScript, Tailwind CSS e PostgreSQL.

## ✨ Funcionalidades

### 🛍️ Frontend (Cliente)
- **Página Inicial** com destaques e produtos em promoção
- **Catálogo** com listagem paginada e filtros por categoria
- **Busca** por nome/descrição dos produtos
- **Carrinho** persistente com localStorage
- **Checkout** completo com formulário de dados
- **Design responsivo** para desktop e mobile
- **Visual nostálgico** inspirado no Habbo Hotel
- **Botão flutuante** para WhatsApp/Discord

### 🔐 Dashboard Admin
- **CRUD completo** de produtos (mobis)
- **Gerenciamento de pedidos**
- **Visualização de estatísticas**
- **Upload de imagens** para produtos
- **Controle de estoque**

### 🗄️ Banco de Dados
- **PostgreSQL** via Neon Database
- **Prisma ORM** para type-safety
- **Migrações** automáticas
- **Seed** com dados de exemplo

### 🛒 Sistema de Compras
- **Carrinho persistente** (localStorage)
- **Múltiplos métodos de pagamento**
- **Desconto PIX** (5%)
- **Validação de estoque**
- **Criação automática de pedidos**

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **PostgreSQL** - Banco de dados relacional
- **Prisma** - ORM type-safe
- **Neon Database** - PostgreSQL serverless
- **Lucide React** - Ícones SVG
- **React Hot Toast** - Notificações
- **Framer Motion** - Animações (futuro)

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Neon Database (ou PostgreSQL local)

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd habbo-store
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Copie o arquivo `env.example.txt` para `.env` e configure:

```env
# Database (Neon)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Authentication (opcional)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# JWT para admin
JWT_SECRET="your-jwt-secret"

# Cloudinary (opcional - para upload de imagens)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### 4. Configure o banco de dados
```bash
# Sincronizar schema com o banco
npm run db:push

# Popular com dados de exemplo
npm run db:seed
```

### 5. Execute o projeto
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📋 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificar código
npm run db:push      # Sincronizar schema Prisma
npm run db:seed      # Popular banco com dados
npm run db:studio    # Interface visual do Prisma
```

## 🗂️ Estrutura do Projeto

```
habbo-store/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── api/               # API Routes
│   │   │   ├── products/      # CRUD de produtos
│   │   │   └── orders/        # CRUD de pedidos
│   │   ├── catalogo/          # Página do catálogo
│   │   ├── checkout/          # Página de checkout
│   │   ├── sobre/             # Página sobre
│   │   ├── admin/             # Dashboard admin (futuro)
│   │   ├── layout.tsx         # Layout raiz
│   │   └── page.tsx           # Página inicial
│   ├── components/            # Componentes React
│   │   ├── layout/            # Componentes de layout
│   │   ├── product/           # Componentes de produto
│   │   └── cart/              # Componentes do carrinho
│   ├── contexts/              # Contextos React
│   │   └── CartContext.tsx    # Estado global do carrinho
│   ├── lib/                   # Utilitários
│   │   └── prisma.ts          # Cliente Prisma
│   └── types/                 # Tipos TypeScript
├── prisma/
│   ├── schema.prisma          # Schema do banco
│   └── seed.ts                # Dados de exemplo
├── public/                    # Arquivos estáticos
└── tailwind.config.ts         # Configuração Tailwind
```

## 🎨 Tema Visual

O projeto utiliza uma paleta de cores inspirada no Habbo Hotel:

- **Azul Habbo**: `#0066cc` (primary)
- **Amarelo Habbo**: `#fdd835` (accent)
- **Verde Habbo**: `#4caf50` (success)
- **Rosa Habbo**: `#e91e63` (highlight)
- **Roxo Habbo**: `#9c27b0` (secondary)

### Fontes
- **Font Pixel**: Courier New (títulos)
- **Font Habbo**: Arial (texto geral)

## 📊 Modelo de Dados

### User (Usuário)
- `id`, `email`, `name`, `clerkId`, `isAdmin`
- Relacionamentos: `orders[]`, `cartItems[]`

### Product (Produto/Mobi)
- `id`, `name`, `description`, `price`, `image`, `stock`, `category`, `featured`
- Relacionamentos: `orderItems[]`, `cartItems[]`

### Order (Pedido)
- `id`, `userId`, `userName`, `userEmail`, `status`, `total`
- Relacionamentos: `user`, `orderItems[]`

### OrderItem (Item do Pedido)
- `id`, `orderId`, `productId`, `quantity`, `price`
- Relacionamentos: `order`, `product`

### CartItem (Item do Carrinho)
- `id`, `userId`, `productId`, `quantity`
- Relacionamentos: `user`, `product`

## 🔒 Autenticação e Autorização

O projeto está preparado para integração com:
- **Clerk** (recomendado)
- **NextAuth.js**
- **JWT customizado** para admin

### Admin Access
- Login: `admin@habbostore.com`
- Acesso via `/admin` (implementação futura)

## 🎯 Próximas Funcionalidades

### Dashboard Admin
- [ ] Sistema de login para admin
- [ ] CRUD visual de produtos
- [ ] Gerenciamento de pedidos
- [ ] Upload de imagens
- [ ] Relatórios e estatísticas

### Melhorias do Frontend
- [ ] Página individual de produto
- [ ] Sistema de favoritos
- [ ] Histórico de pedidos
- [ ] Reviews e avaliações
- [ ] Sistema de cupons

### Integrações
- [ ] Payment gateway (Stripe/PagSeguro)
- [ ] Sistema de e-mail
- [ ] Bot do Discord
- [ ] API do WhatsApp Business

## 🐛 Problemas Conhecidos

- Algumas imagens dos produtos podem não carregar (URLs de exemplo)
- Sistema de pagamento é simulado (contato manual)
- Upload de imagens não implementado

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **WhatsApp**: [+55 11 99999-9999](https://wa.me/5511999999999)
- **Discord**: [discord.gg/habbo](https://discord.gg/habbo)
- **Email**: admin@habbostore.com

---

**Feito com ❤️ para a comunidade Habbo Origins**
