Coloque as capas dos livros em `public/books/` e cadastre cada recomendação em `data/books.ts`.

Exemplo:

```ts
{
  title: "Título do livro",
  titles: { en: "Book title", it: "Titolo del libro" },
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

- `title` é o título original. `titles` é opcional e traz o título em outros idiomas quando ele muda (a edição publicada ou a tradução natural); sem entrada, o título original aparece.
- `categories` usa os mesmos nomes dos artigos (`lib/article-categories.ts`), então os rótulos já saem traduzidos. Uma categoria nova aparece como foi escrita; para traduzi-la, adicione-a em `labels` nesse arquivo. O filtro da página de livros é montado a partir delas.
- Mantenha a recomendação em uma frase curta (cerca de 60 caracteres): o card reserva espaço para três linhas e os cards ficam alinhados.
- As descrições em outros idiomas são opcionais; o português serve como alternativa.
