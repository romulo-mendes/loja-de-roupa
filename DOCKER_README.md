# 🐳 Configuração Docker - Clothing Store

Este projeto utiliza Docker para gerenciar o banco de dados PostgreSQL e outros serviços necessários.

## 📋 Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- [Node.js](https://nodejs.org/) versão 18 ou superior

## 🚀 Configuração Rápida

\`\`\`bash
# 1. Clonar o repositório e instalar dependências
npm install

# 2. Configurar e iniciar todo o ambiente
npm run setup
\`\`\`

## 🔧 Configuração Manual

### 1. Configurar Variáveis de Ambiente

\`\`\`bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar variáveis conforme necessário
nano .env
\`\`\`

### 2. Iniciar Ambiente Docker

\`\`\`bash
# Configurar e iniciar containers
npm run docker:setup

# Ou manualmente:
docker-compose up -d
\`\`\`

### 3. Configurar Banco de Dados

\`\`\`bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrations
npm run db:migrate

# Popular com dados iniciais
npm run db:seed
\`\`\`

## 🛠️ Scripts Disponíveis

### Docker
- `npm run docker:setup` - Configuração inicial completa
- `npm run docker:start` - Iniciar containers
- `npm run docker:stop` - Parar containers
- `npm run docker:restart` - Reiniciar containers
- `npm run docker:logs` - Ver logs em tempo real
- `npm run docker:cleanup` - Limpar ambiente

### Banco de Dados
- `npm run db:generate` - Gerar cliente Prisma
- `npm run db:migrate` - Executar migrations
- `npm run db:seed` - Popular dados iniciais
- `npm run db:studio` - Abrir Prisma Studio
- `npm run db:reset` - Resetar banco

### Backup
- `npm run backup:create` - Criar backup
- `npm run backup:restore` - Instruções para restaurar

## 🌐 Serviços Disponíveis

| Serviço | URL | Credenciais |
|---------|-----|-------------|
| **PostgreSQL** | `localhost:5432` | Ver arquivo `.env` |
| **pgAdmin** | http://localhost:5050 | admin@clothingstore.com / admin123 |
| **Redis** | `localhost:6379` | Ver arquivo `.env` |

## 📊 Monitoramento

### Verificar Status dos Containers
\`\`\`bash
docker-compose ps
\`\`\`

### Ver Logs
\`\`\`bash
# Todos os serviços
npm run docker:logs

# Serviço específico
docker-compose logs -f postgres
docker-compose logs -f pgadmin
\`\`\`

### Conectar ao Banco
\`\`\`bash
# Via Docker
docker exec -it clothing_store_db psql -U clothing_admin -d clothing_store

# Via cliente local (se instalado)
psql -h localhost -p 5432 -U clothing_admin -d clothing_store
\`\`\`

## 🔒 Segurança

### Variáveis de Ambiente Importantes
- `POSTGRES_PASSWORD` - Senha do banco (altere em produção)
- `PGADMIN_PASSWORD` - Senha do pgAdmin
- `REDIS_PASSWORD` - Senha do Redis
- `NEXTAUTH_SECRET` - Chave secreta do NextAuth

### Recomendações
1. **Nunca** commite o arquivo `.env`
2. Use senhas fortes em produção
3. Configure firewall adequadamente
4. Use SSL/TLS em produção

## 🗂️ Estrutura de Volumes

\`\`\`
volumes/
├── postgres_data/     # Dados do PostgreSQL
├── pgadmin_data/      # Configurações do pgAdmin
└── redis_data/        # Dados do Redis
\`\`\`

## 🔄 Backup e Restore

### Criar Backup
\`\`\`bash
npm run backup:create
\`\`\`

### Restaurar Backup
\`\`\`bash
# Descompactar backup
gunzip backups/clothing_store_backup_YYYYMMDD_HHMMSS.sql.gz

# Restaurar
docker exec -i clothing_store_db psql -U clothing_admin -d clothing_store < backups/clothing_store_backup_YYYYMMDD_HHMMSS.sql
\`\`\`

## 🐛 Troubleshooting

### Container não inicia
\`\`\`bash
# Verificar logs
docker-compose logs postgres

# Verificar portas em uso
netstat -tulpn | grep :5432
\`\`\`

### Erro de conexão
\`\`\`bash
# Verificar se o container está rodando
docker-compose ps

# Testar conexão
docker exec clothing_store_db pg_isready -U clothing_admin
\`\`\`

### Resetar ambiente
\`\`\`bash
# Parar tudo e limpar
npm run docker:cleanup

# Reconfigurar
npm run docker:setup
\`\`\`

## 📈 Performance

### Configurações do PostgreSQL
- Shared buffers otimizados
- Conexões máximas configuradas
- Logs de performance habilitados

### Monitoramento
\`\`\`bash
# Ver estatísticas do banco
docker exec -it clothing_store_db psql -U clothing_admin -d clothing_store -c "SELECT * FROM pg_stat_activity;"
\`\`\`

## 🚀 Deploy em Produção

Para produção, considere:

1. **Usar serviços gerenciados**:
   - [Neon](https://neon.tech/) para PostgreSQL
   - [Upstash](https://upstash.com/) para Redis

2. **Configurar SSL/TLS**
3. **Usar secrets managers**
4. **Configurar backups automáticos**
5. **Monitoramento e alertas**

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs: `npm run docker:logs`
2. Consulte a documentação do Docker
3. Abra uma issue no repositório
