# 🐳 Docker Guide - Johnny Barber

Guia completo para executar o projeto usando Docker e Docker Compose.

## 📋 Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+

### Instalar Docker

#### Ubuntu/Debian
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

#### macOS
```bash
brew install docker docker-compose
```

#### Windows
Baixe o Docker Desktop: https://www.docker.com/products/docker-desktop

## 🚀 Início Rápido

### Opção 1: Script Automático (Recomendado)

```bash
# Executar script de setup
./docker-setup.sh
```

O script irá:
1. ✅ Verificar instalações do Docker
2. ✅ Criar arquivo .env com secrets gerados
3. ✅ Construir as imagens
4. ✅ Iniciar os containers
5. ✅ Executar migrations e seed

### Opção 2: Manual

```bash
# 1. Criar arquivo .env
cp .env.docker.example .env

# 2. Editar .env com suas credenciais
nano .env

# 3. Construir imagens
docker-compose build

# 4. Iniciar containers
docker-compose up -d

# 5. Executar migrations e seed
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend node prisma/seed.js
```

## 📦 Arquivos Docker

### Estrutura
```
Johnny Barber/
├── docker-compose.yml              # Produção
├── docker-compose.dev.yml          # Desenvolvimento
├── docker-setup.sh                 # Script de setup
├── docker-seed.sh                  # Script de seed
├── .env.docker.example             # Template de variáveis
├── backend/
│   ├── Dockerfile                  # Imagem de produção
│   ├── Dockerfile.dev              # Imagem de desenvolvimento
│   └── .dockerignore
└── frontend/
    ├── Dockerfile                  # Imagem de produção
    ├── Dockerfile.dev              # Imagem de desenvolvimento
    └── .dockerignore
```

## 🏗️ Serviços

### PostgreSQL
- **Container:** `johnny-barber-db`
- **Porta:** 5432
- **Usuário:** postgres
- **Senha:** postgres
- **Database:** johnny_barber

### Backend (NestJS)
- **Container:** `johnny-barber-backend`
- **Porta:** 3333
- **URL:** http://localhost:3333

### Frontend (Next.js)
- **Container:** `johnny-barber-frontend`
- **Porta:** 3000
- **URL:** http://localhost:3000

## 🔧 Comandos Docker

### Gerenciamento de Containers

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (CUIDADO: apaga o banco!)
docker-compose down -v

# Reiniciar todos os serviços
docker-compose restart

# Reiniciar um serviço específico
docker-compose restart backend

# Ver status dos containers
docker-compose ps
```

### Logs

```bash
# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Ver últimas 100 linhas
docker-compose logs --tail=100 backend
```

### Construir Imagens

```bash
# Construir todas as imagens
docker-compose build

# Construir sem cache
docker-compose build --no-cache

# Construir apenas um serviço
docker-compose build backend
docker-compose build frontend
```

### Executar Comandos nos Containers

```bash
# Acessar shell do backend
docker-compose exec backend sh

# Acessar shell do frontend
docker-compose exec frontend sh

# Acessar PostgreSQL
docker-compose exec postgres psql -U postgres -d johnny_barber

# Executar comando específico
docker-compose exec backend npm run start:dev
```

### Banco de Dados

```bash
# Executar migrations
docker-compose exec backend npx prisma migrate deploy

# Executar seed
docker-compose exec backend node prisma/seed.js

# Abrir Prisma Studio
docker-compose exec backend npx prisma studio

# Criar migration
docker-compose exec backend npx prisma migrate dev --name nome_da_migration

# Reset do banco (CUIDADO!)
docker-compose exec backend npx prisma migrate reset
```

## 🔄 Modo Desenvolvimento

Para desenvolvimento com hot reload:

```bash
# Usar arquivo de desenvolvimento
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Parar
docker-compose -f docker-compose.dev.yml down
```

### Diferenças Dev vs Prod

**Desenvolvimento:**
- ✅ Hot reload ativado
- ✅ Volumes montados (mudanças refletem instantaneamente)
- ✅ Debug port (9229) exposto
- ✅ Source maps ativados

**Produção:**
- ✅ Build otimizado
- ✅ Imagens menores
- ✅ Sem volumes de código
- ✅ Pronto para deploy

## 🌍 Variáveis de Ambiente

Edite o arquivo `.env`:

```env
# JWT Secret (gerado automaticamente)
JWT_SECRET=sua-secret-aqui

# NextAuth Secret (gerado automaticamente)
NEXTAUTH_SECRET=sua-secret-aqui

# Google OAuth (configure no Google Cloud Console)
GOOGLE_CLIENT_ID=seu-client-id
GOOGLE_CLIENT_SECRET=seu-client-secret

# URLs
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CALLBACK_URL=http://localhost:3333/auth/google/callback
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs de erro
docker-compose logs backend

# Verificar se a porta está em uso
lsof -i :3333  # Backend
lsof -i :3000  # Frontend
lsof -i :5432  # PostgreSQL
```

### Erro de conexão com banco

```bash
# Verificar se o PostgreSQL está rodando
docker-compose ps postgres

# Verificar logs do PostgreSQL
docker-compose logs postgres

# Reiniciar PostgreSQL
docker-compose restart postgres
```

### Erro no Prisma

```bash
# Regenerar Prisma Client
docker-compose exec backend npx prisma generate

# Aplicar migrations
docker-compose exec backend npx prisma migrate deploy
```

### Limpar tudo e recomeçar

```bash
# Parar e remover tudo
docker-compose down -v

# Remover imagens
docker-compose down --rmi all

# Limpar cache do Docker
docker system prune -a

# Reconstruir
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Monitoramento

### Ver uso de recursos

```bash
# CPU, memória, rede de cada container
docker stats

# Informações de um container específico
docker inspect johnny-barber-backend
```

### Verificar saúde dos containers

```bash
# Status de saúde
docker-compose ps

# Healthcheck do PostgreSQL
docker-compose exec postgres pg_isready -U postgres
```

## 🚀 Deploy em Produção

### Docker Compose em servidor

```bash
# 1. Clonar repositório no servidor
git clone <seu-repo>
cd "Johnny Barber"

# 2. Configurar variáveis de ambiente
cp .env.docker.example .env
nano .env  # Editar com valores de produção

# 3. Construir e iniciar
docker-compose build
docker-compose up -d

# 4. Migrations e seed
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend node prisma/seed.js
```

### Com Nginx Reverse Proxy

Adicione ao seu nginx.conf:

```nginx
# Frontend
server {
    listen 80;
    server_name seudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend
server {
    listen 80;
    server_name api.seudominio.com;

    location / {
        proxy_pass http://localhost:3333;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔐 Segurança em Produção

1. **Alterar senhas padrão:**
   - Mudar senha do PostgreSQL
   - Gerar novos JWT secrets

2. **Usar secrets:**
   ```bash
   # Gerar secrets seguros
   openssl rand -base64 32
   ```

3. **HTTPS:**
   - Configure SSL/TLS
   - Use Let's Encrypt

4. **Firewall:**
   - Não exponha PostgreSQL (porta 5432)
   - Use rede interna do Docker

## 📝 Backup e Restore

### Backup do Banco

```bash
# Criar backup
docker-compose exec postgres pg_dump -U postgres johnny_barber > backup.sql

# Com timestamp
docker-compose exec postgres pg_dump -U postgres johnny_barber > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore do Banco

```bash
# Restaurar backup
docker-compose exec -T postgres psql -U postgres johnny_barber < backup.sql
```

## 🎯 Dicas

1. **Use .env para diferentes ambientes:**
   - `.env.development`
   - `.env.staging`
   - `.env.production`

2. **Mantenha imagens atualizadas:**
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

3. **Monitore logs regularmente:**
   ```bash
   docker-compose logs -f --tail=100
   ```

4. **Backup automático:**
   - Configure cron job para backups diários

---

**🐳 Johnny Barber - Dockerizado com Sucesso**
