"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { Seal } from "./Seal";

type Door = "project" | "business";

const noopSubscribe = () => () => {};
const readDoorParam = (): Door => (new URLSearchParams(window.location.search).get("door") === "business" ? "business" : "project");
const serverDoorParam = (): Door => "project";

export default function ContactForm() {
  const t = useTranslations("contact");
  const root = useTranslations();
  // ?door=business from the home page preselects the door.
  const doorParam = useSyncExternalStore(noopSubscribe, readDoorParam, serverDoorParam);
  const [doorChoice, setDoor] = useState<Door | null>(null);
  const door: Door = doorChoice ?? doorParam;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const date = useMemo(() => new Date().toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" }), []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError(t("required"));
      return;
    }
    setError("");
    const subject = `${door === "project" ? t("subjectProject") : t("subjectBusiness")} · ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()}${email.trim() ? `\n${email.trim()}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const doors: { id: Door; title: string; hint: string }[] = [
    { id: "project", title: t("doorProject"), hint: t("doorProjectHint") },
    { id: "business", title: t("doorBusiness"), hint: t("doorBusinessHint") },
  ];

  const field = "w-full rounded-2xl bg-raised px-4 py-3.5 text-[17px] text-fg outline-none ring-1 ring-transparent transition-shadow placeholder:text-faint focus:ring-accent";

  return (
    <form onSubmit={send} noValidate className="grid gap-6">
      <fieldset className="grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">{t("label")}</legend>
        {doors.map((d) => (
          <label key={d.id} className="relative cursor-pointer rounded-2xl p-5">
            {door === d.id ? (
              <motion.span layoutId="door-active" className="absolute inset-0 rounded-2xl bg-fg" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
            ) : (
              <span className="absolute inset-0 rounded-2xl bg-raised" />
            )}
            <input type="radio" name="door" value={d.id} checked={door === d.id} onChange={() => setDoor(d.id)} className="sr-only" />
            <span className={cn("relative block font-display text-[21px] font-bold tracking-[-0.02em] transition-colors", door === d.id ? "text-surface" : "text-fg")}>
              {d.title}
            </span>
            <span className={cn("relative mt-1 block text-[14.5px] transition-colors", door === d.id ? "text-surface/70" : "text-dim")}>{d.hint}</span>
          </label>
        ))}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-[14px] font-medium text-dim">{t("name")}</span>
          <input id="contact-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={60} required />
        </label>
        <label className="grid gap-2">
          <span className="text-[14px] font-medium text-dim">{t("email")}</span>
          <input id="contact-email" className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="text-[14px] font-medium text-dim">{t("message")}</span>
        <textarea
          id="contact-message"
          className={cn(field, "min-h-40 resize-y")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={door === "project" ? t("messagePlaceholderProject") : t("messagePlaceholderBusiness")}
          required
        />
      </label>

      <div className="relative overflow-hidden rounded-2xl bg-raised px-5 pb-4 pt-4">
        <span className="text-[14px] font-medium text-dim">{t("signature")}</span>
        <p className="mt-1 min-h-[1.25em] overflow-hidden whitespace-nowrap pr-24 font-hand text-[clamp(48px,6vw,72px)] leading-[1.25] text-fg" aria-live="polite">
          {name.trim() || " "}
        </p>
        <hr className="-mt-3 border-line-2" />
        <div className="mt-2 flex flex-wrap justify-between gap-2 text-[13px] text-dim">
          <span>
            {door === "project" ? t("subjectProject") : t("subjectBusiness")} · {date}
          </span>
          <span>{t("signatureHint")}</span>
        </div>
        <motion.div
          className="absolute right-5 top-4 w-[76px]"
          initial={false}
          animate={name.trim() ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4, rotate: -40 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <Seal id="ring-contact" text={root("seal")} className="w-full" />
        </motion.div>
      </div>

      {error && (
        <p role="alert" className="text-[14px] text-crit">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary px-7 py-4">
          <PiPaperPlaneTiltBold size={17} />
          {t("send")}
        </button>
        <p className="max-w-[40ch] text-[14px] text-dim">{t("sendNote")}</p>
      </div>
    </form>
  );
}
