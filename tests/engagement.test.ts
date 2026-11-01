import assert from "node:assert/strict";
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import handler from "../api/article-engagement";
import { parseEngagement, rateLimit } from "../server/engagement";
import { getDb } from "../server/db";
import { getArticles } from "../data/articles";

const visitorId = randomUUID();
test("rejects malformed identifiers, actions and like states", () => {
  assert.throws(() => parseEngagement({ slug: "../private", visitorId }, false));
  assert.throws(() => parseEngagement({ slug: "article", visitorId, action: "view" }, true));
  assert.throws(() => parseEngagement({ slug: "article", visitorId, action: "like", liked: "true" }, true));
  assert.throws(() => parseEngagement({ slug: "article", visitorId: "bot" }, false));
  assert.equal(parseEngagement({ slug: "article", visitorId, action: "like", liked: false }, true).liked, false);
});

test("API persists idempotent views/likes, enforces origins and validates published articles", {
  skip: !process.env.TEST_DATABASE_URL && "Set TEST_DATABASE_URL to an isolated local PostgreSQL database",
}, async () => {
  const url = new URL(process.env.TEST_DATABASE_URL!);
  assert.ok(["127.0.0.1", "localhost"].includes(url.hostname), "Integration tests require an isolated LOCAL database");
  process.env.DATABASE_URL = url.toString();
  process.env.ENGAGEMENT_SECRET = "local-test-secret-with-more-than-32-characters";
  process.env.ARTICLE_ALLOWED_ORIGINS = "http://localhost:3000";
  const server = createServer((req, res) => { void handler(req, res); });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const endpoint = `http://127.0.0.1:${address.port}/api/article-engagement`;
  const slug = getArticles()[0]?.slug;
  assert.ok(slug, "A published article is needed for integration tests");
  const origin = "http://localhost:3000";
  const sessionId = randomUUID();
  const otherVisitor = randomUUID();
  const post = (body: Record<string, unknown>, requestOrigin = origin) => fetch(endpoint, {
    method: "POST", headers: { Origin: requestOrigin, "Content-Type": "application/json" }, body: JSON.stringify({ slug, visitorId, ...body }),
  });
  try {
    const db = getDb();
    const initial = await fetch(`${endpoint}?slug=${slug}&visitorId=${visitorId}`, { headers: { Origin: origin } });
    assert.equal(initial.status, 200);
    const baseline = await initial.json();
    assert.equal((await post({ action: "view", sessionId }, "https://untrusted.example")).status, 403);
    assert.equal((await post({ action: "view", sessionId, slug: "article-that-does-not-exist" })).status, 404);
    assert.equal((await post({ action: "like", liked: "yes" })).status, 400);
    const malformed = await fetch(endpoint, { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: "{" });
    assert.equal(malformed.status, 400);
    const preflight = await fetch(endpoint, { method: "OPTIONS", headers: { Origin: origin } });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get("access-control-allow-origin"), origin);
    const duplicates = await Promise.all(Array.from({ length: 8 }, () => post({ action: "view", sessionId })));
    assert.ok(duplicates.every((response) => response.status === 200));
    let response = await post({ action: "view", sessionId });
    assert.equal((await response.json()).views, baseline.views + 1);
    response = await post({ action: "view", sessionId: randomUUID() });
    assert.equal((await response.json()).views, baseline.views + 2);
    await Promise.all(Array.from({ length: 8 }, () => post({ action: "like", liked: true })));
    response = await post({ action: "like", liked: true });
    let stats = await response.json();
    assert.equal(stats.likes, baseline.likes + 1);
    assert.equal(stats.liked, true);
    response = await post({ action: "like", liked: true, visitorId: otherVisitor });
    assert.equal((await response.json()).likes, baseline.likes + 2);
    await post({ action: "like", liked: false });
    response = await post({ action: "like", liked: false });
    stats = await response.json();
    assert.equal(stats.likes, baseline.likes + 1);
    assert.equal(stats.liked, false);
    const rows = await db.articleLike.findMany({ where: { slug } });
    assert.ok(rows.every((row) => row.visitorId !== otherVisitor), "Raw browser UUIDs are not stored");
    const ip = randomUUID();
    const results = await Promise.allSettled(Array.from({ length: 121 }, () => rateLimit(ip)));
    assert.equal(results.filter((result) => result.status === "fulfilled").length, 120);
    assert.equal(results.filter((result) => result.status === "rejected").length, 1);
    const secret = process.env.ENGAGEMENT_SECRET;
    delete process.env.ENGAGEMENT_SECRET;
    assert.equal((await post({ action: "like", liked: true })).status, 503);
    process.env.ENGAGEMENT_SECRET = secret;
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    await getDb().$disconnect();
  }
});
