import "dotenv/config";
import { createServer } from "node:http";
import handler from "../api/article-engagement";

const port = Number(process.env.ARTICLE_API_PORT ?? 3001);
createServer((req, res) => {
  if (new URL(req.url ?? "/", "http://localhost").pathname !== "/api/article-engagement") {
    res.writeHead(404).end();
    return;
  }
  void handler(req, res);
}).listen(port, "127.0.0.1", () => console.log(`Article API: http://localhost:${port}/api/article-engagement`));
