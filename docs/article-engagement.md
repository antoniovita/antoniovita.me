# Curtidas e visualizações

O frontend continua estático e compatível com GitHub Pages. `api/article-engagement.ts` é uma função Node que usa Prisma 7 e PostgreSQL do Supabase. Ela precisa ser publicada em um serviço com execução Node (a configuração `vercel.json` já está incluída). GitHub Pages sozinho não executa essa API.

## Configuração do Supabase

1. Crie ou escolha um projeto Supabase. Estas migrations só adicionam `ArticleView`, `ArticleLike` e `EngagementRateLimit`.
2. Copie `.env.example` para `.env`. Preencha `DATABASE_URL` com a conexão do transaction pooler, porta 6543, e `DIRECT_URL` com a conexão direta ou session pooler, porta 5432. Use as URLs do painel **Connect**; codifique caracteres especiais da senha na URL.
3. Gere `ENGAGEMENT_SECRET` com `openssl rand -hex 32` e salve em `.env`. Não use prefixo `NEXT_PUBLIC_` para segredos.
4. Execute:

```bash
npm run db:generate
npm run db:migrate
```

O acesso ao banco é feito somente pela API. As tabelas têm RLS habilitado sem políticas públicas; use uma conexão administrativa/migradora apropriada no servidor. Não é preciso expor a chave `service_role` nem instalar o SDK de navegador do Supabase.

## Desenvolvimento

```bash
npm run dev:api
# Em outro terminal:
npm run dev
```

A API local usa a porta 3001. O frontend lê `NEXT_PUBLIC_ARTICLE_API_URL=http://localhost:3001/api/article-engagement`. Reinicie o Next após alterar variáveis `NEXT_PUBLIC_`.

Sem banco configurado ou com a API indisponível, o texto continua acessível, os contadores mostram “—” e o botão fica desabilitado até a primeira resposta. Erros de gravação preservam o último valor confirmado e permitem tentar novamente.

## Publicação

- **API na Vercel:** importe este repositório. `vercel.json` usa o preset Other, gera `out/` e inclui a função `api/article-engagement.ts`. Node 22 ou superior é necessário (Prisma 7). Configure `DATABASE_URL`, `ENGAGEMENT_SECRET` e `ARTICLE_ALLOWED_ORIGINS` no ambiente de execução. Inclua as origens exatas do site, separadas por vírgula, sem barras finais. O build inclui os arquivos Markdown para validar os slugs publicados.
- **Migrations:** rode `npm run db:migrate` com `DIRECT_URL` antes de usar a API. O deploy não altera o banco automaticamente.
- **Frontend no GitHub Pages:** configure a variável de repositório `NEXT_PUBLIC_ARTICLE_API_URL` com a URL completa da função, por exemplo `https://seu-projeto.vercel.app/api/article-engagement`, e faça um novo deploy. O workflow já lê essa variável. Apenas ela é pública; as credenciais do banco ficam no servidor da API.
- **Frontend também na Vercel:** configure `NEXT_PUBLIC_ARTICLE_API_URL=/api/article-engagement` antes do build e adicione o domínio do site a `ARTICLE_ALLOWED_ORIGINS`.
- Publique novamente a API quando adicionar ou remover artigos, para atualizar a lista de slugs permitidos.

## Contagem

- View: uma linha por artigo e UUID de sessão, salvo em `sessionStorage`. Recarregar a página não aumenta a contagem. Abrir outra sessão pode aumentar. Traduções compartilham o mesmo slug e os mesmos totais.
- Curtida: uma linha por artigo e UUID persistido em `localStorage`. O visitante pode curtir e descurtir. Reenviar o mesmo estado não duplica curtidas.
- Os identificadores são armazenados como hashes. O limite é de 120 chamadas por IP por minuto, aplicado no banco; só o HMAC do IP é armazenado, com expiração e limpeza a cada requisição.
- O limite não autentica visitantes. Limpar o navegador, usar outro dispositivo ou forjar IDs pode gerar novas interações; estes são contadores anônimos, não uma medição auditada de pessoas únicas. Para tráfego abusivo, use também proteção de borda no host da API.
- Curtidas e views não expiram. Registros do limite expiram; um segredo estável permite limitar as requisições de forma consistente entre instâncias.

## Testes

```bash
npm run test:engagement
```

Os testes de validação rodam sem banco. Para a integração real, forneça `TEST_DATABASE_URL` apontando para um PostgreSQL local isolado, já migrado (não use o banco de produção). Os testes recusam hosts remotos, criam interações para o primeiro artigo publicado e verificam deduplicação concorrente, curtir/descurtir, CORS, entrada inválida e rate limiting. Descarte o banco de teste após a execução.

Referências: [Prisma 7](https://www.prisma.io/docs/orm/v7), [Supabase com Prisma](https://supabase.com/docs/guides/database/prisma) e [funções Node na Vercel](https://vercel.com/docs/functions/runtimes/node-js).
