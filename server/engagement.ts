import { createHash, createHmac } from "node:crypto";
import { getDb } from "./db";

export type EngagementInput = {
  slug: string;
  visitorId: string;
  action?: "view" | "like";
  sessionId?: string;
  liked?: boolean;
};

export class RequestError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export function parseEngagement(value: unknown, write: boolean): EngagementInput {
  if (!value || typeof value !== "object") throw new RequestError(400, "Invalid request");
  const input = value as Record<string, unknown>;
  if (typeof input.slug !== "string" || input.slug.length > 200 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) ||
      typeof input.visitorId !== "string" || !uuid.test(input.visitorId)) {
    throw new RequestError(400, "Invalid article or visitor");
  }
  if (write && input.action !== "view" && input.action !== "like") throw new RequestError(400, "Invalid action");
  if (write && input.action === "view" && (typeof input.sessionId !== "string" || !uuid.test(input.sessionId))) {
    throw new RequestError(400, "Invalid session");
  }
  if (write && input.action === "like" && typeof input.liked !== "boolean") throw new RequestError(400, "Invalid like state");
  return { slug: input.slug, visitorId: input.visitorId, action: write ? input.action as "view" | "like" : undefined,
    sessionId: input.sessionId as string | undefined, liked: input.liked as boolean | undefined };
}

const hash = (value: string) => createHash("sha256").update(value.toLowerCase()).digest("hex");

export async function rateLimit(ip: string) {
  const secret = process.env.ENGAGEMENT_SECRET;
  if (!secret || secret.length < 32) throw new Error("Engagement secret is not configured");
  const now = Date.now();
  const bucket = Math.floor(now / 60000);
  const key = createHmac("sha256", secret).update(`${ip}:${bucket}`).digest("hex");
  const db = getDb();
  const row = await db.engagementRateLimit.upsert({
    where: { key },
    create: { key, expiresAt: new Date((bucket + 2) * 60000) },
    update: { requests: { increment: 1 } },
  });
  await db.engagementRateLimit.deleteMany({ where: { expiresAt: { lt: new Date(now) } } });
  if (row.requests > 120) throw new RequestError(429, "Too many requests");
}

/** Unique keys make retried views and desired like states idempotent. */
export async function engagement(input: EngagementInput) {
  const db = getDb();
  const { slug } = input;
  const visitorId = hash(input.visitorId);
  return db.$transaction(async (tx) => {
    if (input.action === "view") {
      await tx.articleView.createMany({ data: [{ slug, sessionId: hash(input.sessionId!) }], skipDuplicates: true });
    } else if (input.action === "like") {
      if (input.liked) await tx.articleLike.createMany({ data: [{ slug, visitorId }], skipDuplicates: true });
      else await tx.articleLike.deleteMany({ where: { slug, visitorId } });
    }
    const [views, likes, ownLike] = await Promise.all([
      tx.articleView.count({ where: { slug } }),
      tx.articleLike.count({ where: { slug } }),
      tx.articleLike.findUnique({ where: { slug_visitorId: { slug, visitorId } } }),
    ]);
    return { views, likes, liked: Boolean(ownLike) };
  });
}
