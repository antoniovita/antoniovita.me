# Artigos

Cada artigo fica em um arquivo `<slug>.<idioma>.md` nesta pasta. Exemplo:

- `construindo-o-bobbio.pt.md`
- `construindo-o-bobbio.en.md` (tradução opcional)
- `construindo-o-bobbio.it.md` (tradução opcional)

Crie um arquivo como `meu-artigo.pt.md` e preencha o cabeçalho YAML:

```yaml
---
title: "Construindo o Bobbio"
summary: "O que estou aprendendo ao construir uma IA jurídica."
date: "2026-11-01"
readingMinutes: 3
categories: [economia, cripto]
draft: true
---
```

Escreva o corpo em Markdown abaixo do cabeçalho. São aceitos parágrafos, títulos, listas, links, imagens, citações, blocos de código e tabelas. Coloque imagens em `public/articles/` e use caminhos como `![Descrição](/articles/imagem.png)`.

`title`, `summary` e `date` são obrigatórios. `readingMinutes` é opcional: quando omitido, o tempo é estimado a partir do texto. As traduções devem usar o mesmo slug e a mesma data. Use a mesma estimativa de leitura nas traduções se quiser informar esse campo.

Você pode publicar apenas em português. Se faltar uma tradução, o site usa inglês, português ou italiano, nessa ordem, conforme disponível.

Para publicar, remova `draft: true` (ou defina `draft: false`) e faça o build/deploy. Rascunhos ficam fora da listagem, das páginas geradas e do sitemap. A data não agenda publicação: um texto sem `draft: true` é publicado mesmo se tiver data futura.

A URL é `/pt/articles/<slug>/`. Não é necessário editar arquivos TypeScript. A listagem é ordenada pela data, do mais recente para o mais antigo.

## Categorias

Use `categories` no cabeçalho, com uma ou mais categorias:

```yaml
categories: [economia, cripto]
# Outro exemplo:
# categories: [engenharia]
```

As categorias aparecem no artigo e na listagem, que permite filtrar por tema. Apenas categorias com artigos publicados aparecem nos filtros. Um artigo pode pertencer a várias categorias. O campo é opcional: artigos antigos sem categorias continuam aparecendo em “Todos”.

`economia`, `cripto` e `engenharia` já têm rótulos traduzidos nos três idiomas. Você também pode usar novos nomes, como `Inteligência Artificial`, sem editar código. Nas traduções do mesmo artigo, mantenha os mesmos identificadores; as categorias são compartilhadas entre os idiomas.

## Imagens

Coloque os arquivos em `public/articles/`. Para uma capa, adicione ao cabeçalho:

```yaml
cover: "/articles/minha-capa.jpg"
coverAlt: "Descrição do que aparece na imagem"
```

A capa é opcional e aparece no topo do artigo, nas prévias da home e da listagem e no compartilhamento em redes sociais. Use preferencialmente uma imagem horizontal em proporção 16:9; as prévias recortam a imagem para preencher esse formato. `coverAlt` é obrigatório quando há capa. Caminhos locais devem apontar para arquivos existentes em `public/`; URLs HTTPS também são aceitas. Cada tradução pode ter sua própria capa e descrição.

No corpo, use Markdown, deixando uma linha em branco antes e depois:

```md
![Gado em uma fazenda brasileira](/articles/rebanho.jpg)
```

Imagens no corpo mantêm suas proporções, se ajustam à largura do texto e carregam sob demanda. Descreva a imagem entre os colchetes para acessibilidade. Artigos sem imagens continuam funcionando normalmente.
