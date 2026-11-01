import assert from "node:assert/strict";
import { createServer } from "node:http";
import handler from "../.api-build/api/article-engagement.js";
import { getArticles } from "../.api-build/data/articles.js";

// Exercise emitted JavaScript with native Node ESM, without a TS loader or database.
process.env.ARTICLE_ALLOWED_ORIGINS = "https://runtime-test.example";
delete process.env.DATABASE_URL;
const server = createServer((req, res) => { void handler(req, res); });
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
try {
  const endpoint = `http://127.0.0.1:${server.address().port}/api/article-engagement`;
  const headers = { Origin: "https://runtime-test.example" };
  assert.equal((await fetch(endpoint, { method: "OPTIONS", headers })).status, 204);
  const visitorId = "00000000-0000-4000-8000-000000000001";
  const missing = await fetch(`${endpoint}?slug=missing-runtime-test&visitorId=${visitorId}`, { headers });
  assert.equal(missing.status, 404);
  const article = getArticles()[0];
  if (article) {
    const unavailable = await fetch(`${endpoint}?slug=${article.slug}&visitorId=${visitorId}`, { headers });
    assert.equal(unavailable.status, 503);
    assert.deepEqual(await unavailable.json(), { error: "Stats unavailable" });
  }
  console.log("Native Node ESM: API imports, Prisma client loading and JSON responses passed.");
} finally {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
