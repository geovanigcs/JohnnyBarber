# Johnny Barber - Sistema de Agendamento para Barbearia

Sistema completo de agendamento online para a barbearia Johnny Barber, desenvolvido com Next.js, NestJS e Prisma.

## 🚀 Tecnologias

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **GSAP** - Animações avançadas
- **NextAuth.js** - Autenticação
- **Axios** - Requisições HTTP

### Backend
- **NestJS** - Framework Node.js
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Passport** - Estratégias de autenticação

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## 🔧 Instalação

### Opção 1: Docker (Recomendado) 🐳

```bash
# 1. Clone o repositório
git clone <seu-repositorio>
cd "Johnny Barber"

# 2. Execute o script de setup
./docker-setup.sh

# Pronto! A aplicação estará rodando em:
# Frontend: http://localhost:3000
# Backend:  http://localhost:3333
```

**Comandos úteis com Docker:**
```bash
make help          # Ver todos os comandos
make dev           # Modo desenvolvimento (hot reload)
make logs          # Ver logs
make down          # Parar containers
make seed          # Popular banco
```

Ver guia completo: [DOCKER.md](DOCKER.md)

---

### Opção 2: Instalação Manual

#### 2.1. Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env com suas configurações
# - DATABASE_URL
# - JWT_SECRET (gerar com: openssl rand -base64 32)
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET

# Executar migrations
npx prisma migrate dev

# Executar seed (popular banco de dados)
node prisma/seed.js

# Iniciar servidor de desenvolvimento
npm run start:dev
```

O backend estará rodando em `http://localhost:3333`

#### 2.2. Configurar Frontend

```bash
cd ../frontend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env.local

# Editar .env.local com suas configurações
# - DATABASE_URL (mesmo do backend)
# - NEXTAUTH_SECRET (gerar com: openssl rand -base64 32)
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - NEXT_PUBLIC_API_URL=http://localhost:3333

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## 🗃️ Estrutura do Banco de Dados

### Modelos

- **User** - Usuários do sistema
- **Barbershop** - Barbearia (Johnny Barber)
- **Barber** - Barbeiros
- **Service** - Serviços oferecidos
- **Booking** - Agendamentos

## 🔐 Configurar Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Configure as URLs autorizadas:
   - Origens JavaScript: `http://localhost:3000`
   - URIs de redirecionamento: 
     - `http://localhost:3000/api/auth/callback/google`
     - `http://localhost:3333/auth/google/callback`
6. Copie o Client ID e Client Secret para os arquivos `.env`

## 📱 Funcionalidades

### Público
- ✅ Visualizar serviços
- ✅ Visualizar barbeiros
- ✅ Informações da barbearia
- ✅ Contato e localização

### Autenticado
- ✅ Login com Google
- ✅ Login com email/senha
- ✅ Criar conta
- ✅ Agendar horários
- ✅ Visualizar agendamentos
- ✅ Cancelar agendamentos
- ✅ Editar perfil

## 🎨 Design

O design é baseado em um estilo vintage e moderno, com:
- Paleta de cores escura (dark mode)
- Animações suaves e interativas
- Responsivo (mobile, tablet, desktop)
- Scrollbar customizada
- Micro-interações

## 🚀 Deploy

### Backend (Recomendado: Railway, Heroku, DigitalOcean)

1. Configure as variáveis de ambiente
2. Execute `npm run build`
3. Execute `npm run start:prod`

### Frontend (Recomendado: Vercel, Netlify)

1. Configure as variáveis de ambiente
2. Execute `npm run build`
3. Deploy automático via Git

### Banco de Dados (Recomendado: Supabase, Railway, Neon)

1. Crie uma instância PostgreSQL
2. Configure a DATABASE_URL
3. Execute as migrations: `npx prisma migrate deploy`
4. Execute o seed: `node prisma/seed.js`

## 📝 Scripts Disponíveis

### Backend
```bash
npm run start:dev   # Desenvolvimento
npm run build       # Build
npm run start:prod  # Produção
npm run lint        # Lint
```

### Frontend
```bash
npm run dev         # Desenvolvimento
npm run build       # Build
npm run start       # Produção
npm run lint        # Lint
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido para Johnny Barber

## 📞 Suporte

Para suporte, entre em contato:
- Email: contato@gigiosbarbearia.com
- Telefone: (11) 99034-5308
