import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowRightBold } from "react-icons/pi";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { isLocale } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

/** Date of the last edit to the "now" items in messages/*.json. Update it with the text. */
const UPDATED = new Date("2026-10-15T12:00:00-03:00");

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/now", title: t("meta.now.title"), description: t("meta.now.description"), og: "now" });
}

export default async function NowPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  const items = t.raw("now.items") as { title: string; text: string }[];
  const date = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" }).format(UPDATED);

  return (
    <div className="grid gap-2 md:gap-3">
      <PageHeader title={t("now.title")} subtitle={t("now.subtitle")} note={t("now.label", { date })} />
      <Reveal className="card pad pb-0">
        <Stagger as="ol">
          {items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className={`bleed grid gap-x-10 gap-y-2 py-8 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.2fr)] md:items-baseline ${i > 0 ? "rule" : ""}`}
            >
              <span className="font-mono text-[14px] text-faint">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-bold leading-none tracking-[-0.024em]">{item.title}</h2>
              <p className="text-[18px] text-dim">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="bleed rule flex justify-end py-6">
          <Link href={`/${locale}/contact/`} className="btn btn-primary">
            {t("home.ctaContact")}
            <PiArrowRightBold size={14} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
