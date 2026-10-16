import Link from "next/link";
import { PiArrowUpRightBold } from "react-icons/pi";
import { site, type Locale } from "@/data/site";
import { getT } from "@/lib/i18n";
import { Reveal } from "./motion/Reveal";
import { Signature } from "./Signature";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const year = new Date().getFullYear();
  const links = [
    { href: "/work", label: t("nav.work") },
    { href: "/articles", label: t("nav.articles") },
    { href: "/now", label: t("nav.now") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];
  const socials = [
    { href: site.github, label: "GitHub" },
    { href: site.linkedin, label: "LinkedIn" },
    { href: site.instagram, label: "Instagram" },
  ];

  return (
    <footer className="frame mt-2 md:mt-3" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <Reveal className="card pad overflow-hidden pb-0">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Link
              href={`/${locale}/contact/`}
              className="group block whitespace-nowrap font-display text-[clamp(26px,5.2vw,76px)] font-bold leading-[0.88] tracking-[-0.024em]"
            >
              <span className="transition-colors duration-300 group-hover:text-dim">{t("contact.title")}</span>
              <span className="ml-[0.2em] inline-grid h-[0.6em] w-[0.6em] translate-y-[-0.05em] place-items-center align-middle rounded-full bg-fg text-surface transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                <PiArrowUpRightBold className="h-[45%] w-[45%]" />
              </span>
            </Link>
          </div>
          <div className="grid gap-1 md:justify-items-end">
            <Signature className="w-[220px] text-fg" />
            <p className="text-[14px] text-dim">{t("footer.signLine")}</p>
          </div>
        </div>

        <div className="bleed rule mt-14 grid gap-6 py-6 text-[15px] md:grid-cols-3 md:items-center">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((l) => (
              <Link key={l.href} href={`/${locale}${l.href}/`} className="text-dim transition-colors hover:text-fg">
                {l.label}
              </Link>
            ))}
            <a href={site.cv} download className="text-dim transition-colors hover:text-fg">
              CV
            </a>
          </nav>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-center">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-dim transition-colors hover:text-fg">
                {s.label}
                <PiArrowUpRightBold size={12} />
              </a>
            ))}
          </div>
          <p className="text-[13.5px] text-faint md:text-right">
            © {year} Antonio Vita · {t("footer.rights")}
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
