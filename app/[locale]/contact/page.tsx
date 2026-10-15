import { notFound } from "next/navigation";
import { PiArrowUpRightBold } from "react-icons/pi";
import ContactForm from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { isLocale, site } from "@/data/site";
import { getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return pageMetadata({ locale, path: "/contact", title: t("meta.contact.title"), description: t("meta.contact.description"), og: "contact" });
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getT(locale);
  const channels = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "LinkedIn", value: "Antonio Vita", href: site.linkedin },
    { label: "GitHub", value: "antoniovita", href: site.github },
  ];

  return (
    <div className="grid gap-2 md:gap-3">
      <PageHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />
      <div className="grid gap-2 md:gap-3 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="card pad">
          <ContactForm />
        </Reveal>
        <Reveal delay={0.08} className="card pad flex flex-col pb-0">
          <h2 className="font-display text-[24px] font-semibold tracking-[-0.025em]">{t("contact.direct")}</h2>
          <ul className="mt-6">
            {channels.map((c) => (
              <li key={c.label} className="bleed rule">
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5">
                  <span>
                    <span className="block text-[14px] text-dim">{c.label}</span>
                    <span className="font-display text-[22px] font-semibold tracking-[-0.02em] break-all">{c.value}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-raised transition-all duration-300 group-hover:rotate-45 group-hover:bg-fg group-hover:text-surface">
                    <PiArrowUpRightBold size={15} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
