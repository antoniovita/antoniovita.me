"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PiCheckBold, PiLinkBold, PiLinkedinLogoBold, PiShareFatBold, PiWhatsappLogoBold, PiXLogoBold } from "react-icons/pi";
import { cn } from "@/lib/cn";

type ArticleShareProps = {
  /** Canonical absolute URL of the article. */
  url: string;
  title: string;
  /** Where the menu opens: below the button (top of the article) or above it (end of the article). */
  placement?: "down" | "up";
  className?: string;
};

/** Copies text even where the async clipboard API is refused (older browsers, some in-app views). */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    try {
      return document.execCommand("copy");
    } finally {
      field.remove();
    }
  }
}

/** Share button: the native share sheet on touch devices, a small menu everywhere else. */
export default function ArticleShare({ url, title, placement = "down", className }: ArticleShareProps) {
  const t = useTranslations("articles.share");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function onShare() {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (touch && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        // The person closed the sheet: nothing more to do. Any other failure falls back to the menu.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    setOpen((value) => !value);
  }

  async function onCopy() {
    if (await copyText(url)) setCopied(true);
    setOpen(false);
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const targets = [
    { id: "linkedin", label: "LinkedIn", Icon: PiLinkedinLogoBold, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { id: "x", label: "X", Icon: PiXLogoBold, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { id: "whatsapp", label: "WhatsApp", Icon: PiWhatsappLogoBold, href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
  ];
  const itemClass = "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14.5px] transition-colors hover:bg-surface/10 focus-visible:bg-surface/10";

  return (
    <div ref={root} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={onShare}
        aria-haspopup="menu"
        aria-expanded={open}
        className="btn btn-soft px-4 py-2.5 text-[14px]"
      >
        {copied ? <PiCheckBold size={15} aria-hidden="true" /> : <PiShareFatBold size={15} aria-hidden="true" />}
        <span aria-live="polite">{copied ? t("copied") : t("label")}</span>
      </button>
      {open && (
        <div
          role="menu"
          aria-label={t("menu")}
          className={cn(
            "absolute left-0 z-30 w-[220px] rounded-2xl bg-fg p-1.5 text-surface shadow-(--shadow-pop)",
            placement === "down" ? "top-full mt-2" : "bottom-full mb-2",
          )}
        >
          <button type="button" role="menuitem" onClick={onCopy} className={itemClass}>
            <PiLinkBold size={17} aria-hidden="true" />
            {t("copy")}
          </button>
          {targets.map(({ id, label, Icon, href }) => (
            <a
              key={id}
              role="menuitem"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <Icon size={17} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
