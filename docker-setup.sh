#!/bin/bash

echo "🐳 Configurando ambiente Docker para Johnny Barber"
echo "=================================================="
echo ""

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Por favor, instale o Docker:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✅ Docker encontrado: $(docker --version)"

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não encontrado. Por favor, instale o Docker Compose:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker Compose encontrado: $(docker-compose --version)"
echo ""

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.docker.example .env
    
    # Gerar secrets
    JWT_SECRET=$(openssl rand -base64 32)
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    
    # Substituir no .env (compatível com Linux e macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/change-me-in-production-use-openssl-rand-base64-32/$JWT_SECRET/" .env
        sed -i '' "2s/change-me-in-production-use-openssl-rand-base64-32/$NEXTAUTH_SECRET/" .env
    else
        # Linux
        sed -i "0,/change-me-in-production-use-openssl-rand-base64-32/s//$JWT_SECRET/" .env
        sed -i "0,/change-me-in-production-use-openssl-rand-base64-32/s//$NEXTAUTH_SECRET/" .env
    fi
    
    echo "✅ Arquivo .env criado com secrets gerados"
    echo ""
    echo "⚠️  IMPORTANTE: Edite o arquivo .env e configure:"
    echo "   - GOOGLE_CLIENT_ID"
    echo "   - GOOGLE_CLIENT_SECRET"
    echo ""
    read -p "Pressione ENTER após configurar o Google OAuth..."
fi

echo ""
echo "🏗️  Construindo imagens Docker..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ Erro ao construir imagens"
    exit 1
fi

echo ""
echo "✅ Imagens construídas com sucesso!"
echo ""
echo "🚀 Iniciando containers..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ Erro ao iniciar containers"
    exit 1
fi

echo ""
echo "⏳ Aguardando serviços iniciarem..."
sleep 10

echo ""
echo "🌱 Executando seed do banco de dados..."
docker-compose exec -T backend node prisma/seed.js

echo ""
echo "========================================="
echo "✅ Ambiente Docker configurado!"
echo "========================================="
echo ""
echo "📱 Aplicação disponível em:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3333"
echo ""
echo "📊 Comandos úteis:"
echo "   Ver logs:        docker-compose logs -f"
echo "   Parar:           docker-compose down"
echo "   Reiniciar:       docker-compose restart"
echo "   Executar seed:   docker-compose exec backend node prisma/seed.js"
echo "   Acessar shell:   docker-compose exec backend sh"
echo ""
