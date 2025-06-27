#!/bin/bash

# Script para limpar o ambiente Docker

set -e

echo "🧹 Limpando ambiente Docker..."

# Parar todos os containers
echo "🛑 Parando containers..."
docker-compose down

# Remover volumes (dados serão perdidos!)
read -p "❓ Deseja remover os volumes (dados serão perdidos)? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Removendo volumes..."
    docker-compose down -v
    docker volume prune -f
fi

# Remover imagens não utilizadas
read -p "❓ Deseja remover imagens Docker não utilizadas? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Removendo imagens não utilizadas..."
    docker image prune -f
fi

echo "✅ Limpeza concluída!"
