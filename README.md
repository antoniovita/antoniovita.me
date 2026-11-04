# Antonio Vita — site pessoal

Site estático com experiência profissional, Bobbio, artigos e contato. Feito com Next.js, React, TypeScript, Tailwind CSS e Motion, com versões em português, inglês e italiano.

## Desenvolvimento

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`. O retrato e a assinatura usam os arquivos de `public/`; não é necessário gerar vídeos.

## Verificação e publicação

```bash
npm run typecheck
npm run lint
npm run build
```

O build gera o site estático em `out/`. O workflow em `.github/workflows/nextjs.yml` publica essa pasta no GitHub Pages quando há um push para `main`.

`npm start` é o comando padrão do servidor Next e não serve a exportação estática. Para conferir o resultado publicado localmente, sirva a pasta `out/` com um servidor de arquivos estáticos.

## Organização

- `app/[locale]/`: páginas e layouts.
- `components/`: componentes da interface.
- `content/articles/`: artigos em Markdown; consulte o [guia](content/articles/README.md).
- `data/experience*.ts`: experiência, formação e certificações por idioma.
- `data/site.ts`: links, contato e localização.
- `messages/`: traduções da interface.
- `public/`: imagens, assinatura, currículo e mapas.
- `data/theme.json`: tokens de cores; `npm run sync-theme` atualiza o CSS.

As páginas principais são `/<idioma>/`, `/work/`, `/articles/`, `/books/`, `/about/` e `/contact/`. As rotas antigas `/now/`, `/projects/`, `/experience/` e `/services/` encaminham para as páginas atuais.

## Artigos

Crie `content/articles/<slug>.pt.md`, preencha os metadados e escreva em Markdown. Remova `draft: true` para incluir o artigo no próximo build. Traduções `.en.md` e `.it.md` são opcionais.

## Licença

Todos os direitos reservados.

## Curtidas e visualizações

Os artigos usam uma API Node com Prisma e PostgreSQL do Supabase. Consulte o [guia de configuração e publicação](docs/article-engagement.md). O site estático funciona sem o serviço, exibindo os contadores como indisponíveis até a configuração.
