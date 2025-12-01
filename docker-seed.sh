#!/bin/bash

# Script para inicializar o banco de dados com seed

echo "🌱 Iniciando seed do banco de dados..."

# Aguardar o backend estar pronto
sleep 5

# Executar seed dentro do container do backend
docker-compose exec backend npx prisma db seed

if [ $? -eq 0 ]; then
    echo "✅ Seed executado com sucesso!"
else
    echo "❌ Erro ao executar seed"
    exit 1
fi
