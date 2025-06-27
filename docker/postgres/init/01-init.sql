-- Configurações iniciais do banco de dados
-- Este arquivo é executado automaticamente quando o container é criado

-- Criar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Configurar timezone
SET timezone = 'America/Sao_Paulo';

-- Criar usuário adicional para a aplicação (se necessário)
-- CREATE USER app_user WITH PASSWORD 'app_password';
-- GRANT CONNECT ON DATABASE clothing_store TO app_user;

-- Configurações de performance
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET pg_stat_statements.track = 'all';
ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET log_min_duration_statement = 1000;

-- Recarregar configurações
SELECT pg_reload_conf();

-- Log de inicialização
DO $$
BEGIN
    RAISE NOTICE 'Banco de dados clothing_store inicializado com sucesso!';
    RAISE NOTICE 'Timezone configurado para: %', current_setting('timezone');
    RAISE NOTICE 'Extensões instaladas: uuid-ossp, pg_trgm, unaccent';
END $$;
