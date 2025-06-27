# Configuração do Banco de Dados PostgreSQL

## Pré-requisitos

1. **PostgreSQL** instalado localmente ou acesso a um servidor PostgreSQL
2. **Node.js** versão 18 ou superior
3. **npm** ou **yarn**

## Configuração

### 1. Instalar Dependências

\`\`\`bash
npm install
# ou
yarn install
\`\`\`

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

\`\`\`bash
cp .env.example .env
\`\`\`

Edite o arquivo `.env` e configure a URL do banco:

\`\`\`env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/clothing_store?schema=public"
\`\`\`

### 3. Configurar o Banco de Dados

#### Opção A: Usando Migrations (Recomendado para Produção)

\`\`\`bash
# Gerar o cliente Prisma
npm run db:generate

# Executar migrations
npm run db:migrate

# Popular o banco com dados iniciais
npm run db:seed
\`\`\`

#### Opção B: Push direto (Desenvolvimento)

\`\`\`bash
# Gerar o cliente Prisma
npm run db:generate

# Sincronizar schema com o banco
npm run db:push

# Popular o banco com dados iniciais
npm run db:seed
\`\`\`

### 4. Verificar a Instalação

\`\`\`bash
# Abrir Prisma Studio para visualizar os dados
npm run db:studio
\`\`\`

## Scripts Disponíveis

- `npm run db:generate` - Gera o cliente Prisma
- `npm run db:push` - Sincroniza o schema com o banco (desenvolvimento)
- `npm run db:migrate` - Executa migrations (produção)
- `npm run db:seed` - Popula o banco com dados iniciais
- `npm run db:studio` - Abre interface visual do banco
- `npm run db:reset` - Reseta o banco (cuidado!)

## Estrutura das Tabelas

### Categories
- `id` - ID único (CUID)
- `name` - Nome da categoria (único)
- `slug` - Slug para URLs (único)
- `description` - Descrição opcional
- `image` - URL da imagem
- `isActive` - Status ativo/inativo
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Products
- `id` - ID único (CUID)
- `name` - Nome do produto
- `slug` - Slug para URLs (único)
- `description` - Descrição do produto
- `price` - Preço (Decimal)
- `image` - Imagem principal
- `images` - Array de imagens
- `sizes` - Array de tamanhos
- `colors` - Array de cores
- `stock` - Quantidade em estoque
- `isActive` - Status ativo/inativo
- `isFeatured` - Produto em destaque
- `categoryId` - Referência à categoria
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### CartItems
- `id` - ID único (CUID)
- `quantity` - Quantidade
- `selectedSize` - Tamanho selecionado
- `selectedColor` - Cor selecionada
- `productId` - Referência ao produto
- `userId` - Referência ao usuário (opcional)
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

## Relacionamentos

- **Category** → **Products** (1:N)
- **Product** → **CartItems** (1:N)

## Troubleshooting

### Erro de Conexão
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais na `DATABASE_URL`
- Teste a conexão com `psql` ou outro cliente

### Erro de Schema
- Execute `npm run db:reset` para resetar (cuidado com dados!)
- Verifique se não há conflitos de migration

### Erro de Permissões
- Certifique-se que o usuário tem permissões para criar/modificar tabelas
- Verifique se o banco de dados existe
