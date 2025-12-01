#!/bin/bash

echo "🚀 Iniciando Johnny Barber em modo desenvolvimento..."
echo "✨ Hot reload ativado - suas alterações serão aplicadas automaticamente!"
echo ""

docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build

echo ""
echo "✅ Frontend: http://localhost:3000"
echo "✅ Backend: http://localhost:3333"
echo "✅ Database: localhost:5432"
