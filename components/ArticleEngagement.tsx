"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { PiEyeBold, PiHeartBold, PiHeartFill } from "react-icons/pi";

type Stats = { views: number; likes: number; liked: boolean };
const endpoint = process.env.NEXT_PUBLIC_ARTICLE_API_URL;
const fallbackIds = new Map<string, string>();

function browserId(kind: "visitor" | "session") {
  const key = `articles:${kind}`;
  try {
    const storage = kind === "visitor" ? localStorage : sessionStorage;
    const saved = storage.getItem(key);
    if (saved && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(saved)) return saved;
    const id = crypto.randomUUID();
    storage.setItem(key, id);
    return id;
  } catch {
    // Private browsing can block storage; keep a stable identity for this page load.
    if (!fallbackIds.has(key)) fallbackIds.set(key, crypto.randomUUID());
    return fallbackIds.get(key)!;
  }
}

async function requestStats(body: Record<string, unknown>, signal?: AbortSignal): Promise<Stats> {
  if (!endpoint) throw new Error("Stats unavailable");
  const timeout = AbortSignal.timeout(10000);
  const response = await fetch(endpoint, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body), signal: signal ? AbortSignal.any([signal, timeout]) : timeout, cache: "no-store",
  });
  if (!response.ok) throw new Error("Stats unavailable");
  const data = await response.json();
  if (!Number.isSafeInteger(data.views) || data.views < 0 || !Number.isSafeInteger(data.likes) || data.likes < 0 || typeof data.liked !== "boolean") {
    throw new Error("Invalid stats response");
  }
  return data;
}

export default function ArticleEngagement({ slug }: { slug: string }) {
  const t = useTranslations("articles.engagement");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    void requestStats({ slug, action: "view", visitorId: browserId("visitor"), sessionId: browserId("session") }, controller.signal)
      .then((data) => { if (active) { setStats(data); setError(false); } })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; controller.abort(); };
  }, [slug, attempt]);

  async function toggleLike() {
    if (!stats || saving) return;
    setSaving(true);
    try {
      const data = await requestStats({ slug, action: "like", visitorId: browserId("visitor"), liked: !stats.liked });
      setStats(data);
      setError(false);
    } catch { setError(true); }
    finally { setSaving(false); }
  }

  const unavailable = error || !endpoint;
  const Heart = stats?.liked ? PiHeartFill : PiHeartBold;
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-dim">
      <span className="inline-flex items-center gap-2" title={t("viewsHint")}>
        <PiEyeBold size={17} aria-hidden="true" />
        {stats ? t("views", { count: stats.views }) : `— ${t("viewsLabel")}`}
      </span>
      <button type="button" onClick={toggleLike} disabled={!stats || saving} aria-pressed={stats?.liked ?? false}
        aria-label={stats?.liked ? t("unlike") : t("like")} aria-busy={saving}
        className="inline-flex items-center gap-2 rounded-full py-1 font-medium text-fg transition-opacity disabled:cursor-default disabled:opacity-50">
        <Heart size={17} aria-hidden="true" />
        {stats ? t("likes", { count: stats.likes }) : `— ${t("likesLabel")}`}
      </button>
      {unavailable && (
        <span role="status" className="inline-flex items-center gap-2 text-[12px] text-faint">
          {t("unavailable")}
          {endpoint && <button type="button" onClick={() => setAttempt((n) => n + 1)} className="underline underline-offset-4">{t("retry")}</button>}
        </span>
      )}
    </div>
  );
}
