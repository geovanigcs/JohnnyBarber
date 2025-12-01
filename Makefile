# Makefile para Johnny Barber

.PHONY: help build up down restart logs clean dev prod seed shell

# Cores para output
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

help: ## Mostrar ajuda
	@echo "$(GREEN)Johnny Barber - Comandos Disponíveis$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

# Configuração Inicial
setup: ## Configurar ambiente Docker pela primeira vez
	@echo "$(GREEN)🐳 Configurando ambiente Docker...$(NC)"
	@./docker-setup.sh

# Desenvolvimento
dev: ## Iniciar em modo desenvolvimento (hot reload)
	@echo "$(GREEN)🚀 Iniciando em modo desenvolvimento...$(NC)"
	docker-compose -f docker-compose.dev.yml up -d
	@echo "$(GREEN)✅ Serviços iniciados!$(NC)"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend:  http://localhost:3333"

dev-logs: ## Ver logs do modo desenvolvimento
	docker-compose -f docker-compose.dev.yml logs -f

dev-down: ## Parar modo desenvolvimento
	docker-compose -f docker-compose.dev.yml down

# Produção
prod: ## Iniciar em modo produção
	@echo "$(GREEN)🚀 Iniciando em modo produção...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✅ Serviços iniciados!$(NC)"

build: ## Construir todas as imagens
	@echo "$(GREEN)🏗️  Construindo imagens...$(NC)"
	docker-compose build

build-no-cache: ## Construir sem cache
	@echo "$(GREEN)🏗️  Construindo imagens sem cache...$(NC)"
	docker-compose build --no-cache

up: ## Iniciar containers
	docker-compose up -d

down: ## Parar containers
	docker-compose down

restart: ## Reiniciar containers
	docker-compose restart

# Logs
logs: ## Ver logs de todos os serviços
	docker-compose logs -f

logs-backend: ## Ver logs do backend
	docker-compose logs -f backend

logs-frontend: ## Ver logs do frontend
	docker-compose logs -f frontend

logs-db: ## Ver logs do banco de dados
	docker-compose logs -f postgres

# Banco de Dados
migrate: ## Executar migrations
	@echo "$(GREEN)🗄️  Executando migrations...$(NC)"
	docker-compose exec backend npx prisma migrate deploy

migrate-dev: ## Criar nova migration
	@echo "$(GREEN)🗄️  Criando migration...$(NC)"
	@read -p "Nome da migration: " name; \
	docker-compose exec backend npx prisma migrate dev --name $$name

seed: ## Popular banco de dados
	@echo "$(GREEN)🌱 Executando seed...$(NC)"
	docker-compose exec backend node prisma/seed.js

studio: ## Abrir Prisma Studio
	@echo "$(GREEN)📊 Abrindo Prisma Studio em http://localhost:5555$(NC)"
	docker-compose exec backend npx prisma studio

db-reset: ## Reset do banco (CUIDADO!)
	@echo "$(YELLOW)⚠️  Isso irá apagar todos os dados!$(NC)"
	@read -p "Tem certeza? [y/N] " confirm; \
	if [ "$$confirm" = "y" ]; then \
		docker-compose exec backend npx prisma migrate reset; \
	fi

# Shell
shell-backend: ## Acessar shell do backend
	docker-compose exec backend sh

shell-frontend: ## Acessar shell do frontend
	docker-compose exec frontend sh

shell-db: ## Acessar PostgreSQL
	docker-compose exec postgres psql -U postgres -d johnny_barber

# Limpeza
clean: ## Parar e remover containers
	docker-compose down

clean-all: ## Remover containers, volumes e imagens
	@echo "$(YELLOW)⚠️  Isso irá remover tudo!$(NC)"
	@read -p "Tem certeza? [y/N] " confirm; \
	if [ "$$confirm" = "y" ]; then \
		docker-compose down -v --rmi all; \
	fi

prune: ## Limpar sistema Docker
	docker system prune -f

# Status
ps: ## Ver status dos containers
	docker-compose ps

stats: ## Ver uso de recursos
	docker stats

# Backup
backup: ## Criar backup do banco
	@echo "$(GREEN)💾 Criando backup...$(NC)"
	@mkdir -p backups
	docker-compose exec -T postgres pg_dump -U postgres johnny_barber > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)✅ Backup criado em backups/$(NC)"

restore: ## Restaurar último backup
	@echo "$(YELLOW)⚠️  Isso irá sobrescrever o banco atual!$(NC)"
	@read -p "Tem certeza? [y/N] " confirm; \
	if [ "$$confirm" = "y" ]; then \
		latest=$$(ls -t backups/backup_*.sql | head -1); \
		echo "Restaurando $$latest..."; \
		docker-compose exec -T postgres psql -U postgres johnny_barber < $$latest; \
		echo "$(GREEN)✅ Backup restaurado!$(NC)"; \
	fi

# Testes
test-backend: ## Executar testes do backend
	docker-compose exec backend npm run test

test-frontend: ## Executar testes do frontend
	docker-compose exec frontend npm run test

# Instalação de dependências
install-backend: ## Instalar dependências do backend
	docker-compose exec backend npm install

install-frontend: ## Instalar dependências do frontend
	docker-compose exec frontend npm install
