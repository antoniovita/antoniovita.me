"use client";
import Image from "next/image";
import Link from "next/link";
import {
  PiEnvelopeSimpleBold,
  PiGithubLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
} from "react-icons/pi";
import { useTranslations, useLocale } from "next-intl";

const Footer = () => {
  const year = new Date().getFullYear();
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="flex justify-center border-t border-theme-border mt-14">
      <div className="w-[90%] max-w-7xl border-l border-r border-dashed border-theme-border px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Image src="/signature.png" width={150} height={100} alt="Antonio Vita" />
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              {t("description")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              {t("explore")}
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <Link href={`/${locale}`} className="hover:text-black transition-colors">Home</Link>
              <Link href={`/${locale}/projects`} className="hover:text-black transition-colors">Projects</Link>
              <Link href={`/${locale}/services`} className="hover:text-black transition-colors">Services</Link>
              <Link href={`/${locale}/about`} className="hover:text-black transition-colors">About</Link>
              <Link href={`/${locale}/experience`} className="hover:text-black transition-colors">Experience</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              {t("contact")}
            </p>
            <a
              href="mailto:antoniovitafonseca@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
            >
              <PiEnvelopeSimpleBold size={16} />
              antoniovitafonseca@gmail.com
            </a>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com/antoniovita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 inline-flex items-center justify-center border border-theme-border rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="GitHub"
              >
                <PiGithubLogo size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/antonio-vita-6177922b7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 inline-flex items-center justify-center border border-theme-border rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="LinkedIn"
              >
                <PiLinkedinLogo size={18} />
              </a>
              <a
                href="https://www.instagram.com/defi.institute/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 inline-flex items-center justify-center border border-theme-border rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Instagram"
              >
                <PiInstagramLogo size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
