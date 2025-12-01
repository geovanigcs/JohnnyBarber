#!/bin/bash

echo "🚀 Configurando Johnny Barber - Sistema de Agendamento"
echo "======================================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado. Por favor, instale o Node.js 18+${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js encontrado: $(node --version)${NC}"

# Verificar se PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL não encontrado. Por favor, instale o PostgreSQL${NC}"
    echo "   Ubuntu/Debian: sudo apt install postgresql"
    echo "   macOS: brew install postgresql"
    exit 1
fi

echo -e "${GREEN}✓ PostgreSQL encontrado${NC}"
echo ""

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependências do backend instaladas${NC}"
else
    echo -e "${RED}❌ Erro ao instalar dependências do backend${NC}"
    exit 1
fi

# Criar arquivo .env do backend se não existir
if [ ! -f .env ]; then
    echo ""
    echo "📝 Configurando variáveis de ambiente do backend..."
    cp .env.example .env
    
    # Gerar JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Substituir no .env
    sed -i.bak "s/your-jwt-secret-here-generate-with-openssl-rand-base64-32/$JWT_SECRET/" .env
    
    echo -e "${YELLOW}⚠️  Por favor, edite o arquivo backend/.env e configure:${NC}"
    echo "   - DATABASE_URL (sua conexão PostgreSQL)"
    echo "   - GOOGLE_CLIENT_ID"
    echo "   - GOOGLE_CLIENT_SECRET"
    echo ""
    read -p "Pressione ENTER após configurar o .env..."
fi

# Executar Prisma
echo ""
echo "🗄️  Configurando banco de dados..."
npx prisma generate
npx prisma migrate dev --name init

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Migrations executadas${NC}"
    
    # Executar seed
    echo "🌱 Populando banco de dados..."
    node prisma/seed.js
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Banco de dados populado${NC}"
    fi
else
    echo -e "${RED}❌ Erro ao executar migrations${NC}"
    exit 1
fi

cd ..

# Instalar dependências do frontend
echo ""
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependências do frontend instaladas${NC}"
else
    echo -e "${RED}❌ Erro ao instalar dependências do frontend${NC}"
    exit 1
fi

# Criar arquivo .env.local do frontend se não existir
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Configurando variáveis de ambiente do frontend..."
    cp .env.example .env.local
    
    # Gerar NEXTAUTH secret
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    
    # Substituir no .env.local
    sed -i.bak "s/your-secret-here-generate-with-openssl-rand-base64-32/$NEXTAUTH_SECRET/" .env.local
    
    echo -e "${YELLOW}⚠️  Por favor, edite o arquivo frontend/.env.local e configure:${NC}"
    echo "   - DATABASE_URL (mesma do backend)"
    echo "   - GOOGLE_CLIENT_ID (mesmo do backend)"
    echo "   - GOOGLE_CLIENT_SECRET (mesmo do backend)"
fi

cd ..

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Setup concluído com sucesso!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Configure as credenciais do Google OAuth:"
echo "   - Acesse: https://console.cloud.google.com/"
echo "   - Copie Client ID e Secret para os arquivos .env"
echo ""
echo "2. Inicie o backend:"
echo "   cd backend"
echo "   npm run start:dev"
echo ""
echo "3. Em outro terminal, inicie o frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Acesse: http://localhost:3000"
echo ""
echo -e "${YELLOW}⚡ Dica: Use 'npm run dev' em ambos para modo de desenvolvimento${NC}"
echo ""
