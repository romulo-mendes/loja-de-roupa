#!/bin/bash

# Script para fazer backup do banco de dados

set -e

# Carregar variáveis de ambiente
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Configurações
BACKUP_DIR="backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/clothing_store_backup_${TIMESTAMP}.sql"

echo "💾 Iniciando backup do banco de dados..."

# Criar diretório de backup se não existir
mkdir -p $BACKUP_DIR

# Fazer backup
echo "📦 Criando backup..."
docker exec clothing_store_db pg_dump -U ${POSTGRES_USER:-clothing_admin} -d ${POSTGRES_DB:-clothing_store} > $BACKUP_FILE

# Comprimir backup
echo "🗜️  Comprimindo backup..."
gzip $BACKUP_FILE

echo "✅ Backup criado: ${BACKUP_FILE}.gz"
echo "📊 Tamanho do arquivo: $(du -h ${BACKUP_FILE}.gz | cut -f1)"

# Limpar backups antigos (manter apenas os últimos 7)
echo "🧹 Limpando backups antigos..."
find $BACKUP_DIR -name "*.gz" -type f -mtime +7 -delete

echo "✅ Backup concluído com sucesso!"
