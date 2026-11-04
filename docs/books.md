Coloque as capas dos livros em `public/books/` e cadastre cada recomendação em `data/books.ts`.

Exemplo:

```ts
{
  title: "Título do livro",
  author: "Nome do autor",
  cover: "/books/capa.jpg",
  categories: ["Economia"],
  recommendation: {
    pt: "Por que recomendo este livro.",
    en: "Why I recommend this book.",
    it: "Perché consiglio questo libro.",
  },
}
```

- `categories` usa os mesmos nomes dos artigos (`lib/article-categories.ts`), então os rótulos já saem traduzidos. Uma categoria nova aparece como foi escrita; para traduzi-la, adicione-a em `labels` nesse arquivo. O filtro da página de livros é montado a partir delas.
- Mantenha a recomendação em uma frase curta (cerca de 60 caracteres): o card reserva espaço para três linhas e os cards ficam alinhados.
- As descrições em outros idiomas são opcionais; o português serve como alternativa.
