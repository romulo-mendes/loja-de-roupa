#!/bin/bash

# Script para configurar e iniciar o ambiente Docker

set -e

echo "🐳 Configurando ambiente Docker para Clothing Store..."

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    echo "✅ Arquivo .env criado. Por favor, configure as variáveis conforme necessário."
fi

# Criar diretórios necessários
echo "📁 Criando diretórios necessários..."
mkdir -p docker/postgres/init
mkdir -p docker/pgadmin

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down --remove-orphans

# Remover volumes antigos (opcional - descomente se quiser limpar dados)
# echo "🗑️  Removendo volumes antigos..."
# docker-compose down -v

# Construir e iniciar containers
echo "🚀 Iniciando containers..."
docker-compose up -d

# Aguardar o banco ficar pronto
echo "⏳ Aguardando o banco de dados ficar pronto..."
sleep 10

# Verificar status dos containers
echo "📊 Status dos containers:"
docker-compose ps

# Verificar logs do PostgreSQL
echo "📋 Últimos logs do PostgreSQL:"
docker-compose logs --tail=10 postgres

echo ""
echo "✅ Ambiente Docker configurado com sucesso!"
echo ""
echo "🔗 Serviços disponíveis:"
echo "   - PostgreSQL: localhost:5432"
echo "   - pgAdmin: http://localhost:5050"
echo "   - Redis: localhost:6379"
echo ""
echo "📝 Próximos passos:"
echo "   1. Configure as variáveis no arquivo .env"
echo "   2. Execute: npm run db:generate"
echo "   3. Execute: npm run db:migrate"
echo "   4. Execute: npm run db:seed"
echo ""
