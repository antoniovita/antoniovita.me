import type { IncomingMessage, ServerResponse } from "node:http";
import { getArticle } from "../data/articles";
import { engagement, parseEngagement, rateLimit, RequestError } from "../server/engagement";

async function readBody(req: IncomingMessage & { body?: unknown }) {
  if (req.body !== undefined) {
    if (JSON.stringify(req.body).length > 4096) throw new RequestError(413, "Request too large");
    try { return typeof req.body === "string" ? JSON.parse(req.body) : req.body; }
    catch { throw new RequestError(400, "Invalid JSON"); }
  }
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;
    if (size > 4096) throw new RequestError(413, "Request too large");
    chunks.push(buffer);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString()); }
  catch { throw new RequestError(400, "Invalid JSON"); }
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Vary", "Origin");
  const origin = req.headers.origin;
  const allowed = (process.env.ARTICLE_ALLOWED_ORIGINS ?? "http://localhost:3000").split(",").map((s) => s.trim());
  if (!origin || !allowed.includes(origin)) {
    res.writeHead(403).end(JSON.stringify({ error: "Origin not allowed" }));
    return;
  }
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.writeHead(204).end(); return; }
  try {
    if (req.method !== "GET" && req.method !== "POST") throw new RequestError(405, "Method not allowed");
    const write = req.method === "POST";
    if (write && !req.headers["content-type"]?.startsWith("application/json")) throw new RequestError(415, "JSON required");
    const url = new URL(req.url ?? "/", "http://localhost");
    const input = parseEngagement(write ? await readBody(req) : Object.fromEntries(url.searchParams), write);
    if (!getArticle(input.slug)) throw new RequestError(404, "Article not found");
    if (!process.env.DATABASE_URL || !process.env.ENGAGEMENT_SECRET) throw new RequestError(503, "Stats unavailable");
    const ip = process.env.VERCEL ? String(req.headers["x-forwarded-for"] ?? "unknown").split(",")[0].trim() : req.socket.remoteAddress ?? "local";
    await rateLimit(ip);
    res.writeHead(200).end(JSON.stringify(await engagement(input)));
  } catch (error) {
    const status = error instanceof RequestError ? error.status : 503;
    if (status === 429) res.setHeader("Retry-After", "60");
    if (status === 405) res.setHeader("Allow", "GET, POST, OPTIONS");
    res.writeHead(status).end(JSON.stringify({ error: error instanceof RequestError ? error.message : "Stats unavailable" }));
  }
}
