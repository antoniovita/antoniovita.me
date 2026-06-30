"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiHouseSimpleBold, PiUserCircleBold, PiBasketBold, PiCertificateBold, PiBookOpenBold, PiGlobeBold, PiXBold, PiListBold } from "react-icons/pi";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from "next/image";
import NavControls from "@/components/NavControls";
import { useTranslations, useLocale } from "next-intl";

const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
];

const NavBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const t = useTranslations("nav");
    const locale = useLocale();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // fechar sidebar ao navegar
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // travar scroll do body quando sidebar aberta
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [sidebarOpen]);

    const menuItems = [
        { name: t("home"), icon: PiHouseSimpleBold, href: `/${locale}` },
        { name: t("projects"), icon: PiBookOpenBold, href: `/${locale}/projects` },
        { name: t("services"), icon: PiBasketBold, href: `/${locale}/services` },
        { name: t("experience"), icon: PiCertificateBold, href: `/${locale}/experience` },
        { name: t("about"), icon: PiUserCircleBold, href: `/${locale}/about` },
    ];

    const isActiveRoute = (href: string) => {
        if (href === `/${locale}`) return pathname === `/${locale}` || pathname === '/';
        return pathname.startsWith(href);
    };

    const switchLocale = (newLocale: string) => {
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/"));
        setSidebarOpen(false);
    };

    return (
        <>
            {/* ── desktop nav ── */}
            <nav className={`hidden md:block fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-theme-border/80 shadow-sm" : "bg-white border-theme-border"}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between py-4">
                        <Link href={`/${locale}`}>
                            <Image src="/signature.png" width={230} height={100} alt="Home" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 h-11 border border-theme-border bg-white px-1.5 rounded-full">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = isActiveRoute(item.href);
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="relative flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors group"
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-gray-100 border border-theme-border rounded-full"
                                                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                                                />
                                            )}
                                            <motion.div
                                                initial={false}
                                                animate={{ scale: isActive ? 1.08 : 1, y: isActive ? -0.5 : 0 }}
                                                transition={{ type: "spring", stiffness: 340, damping: 24 }}
                                                className="relative z-10"
                                            >
                                                <Icon size={18} className={isActive ? "text-black" : "text-gray-500 group-hover:text-black"} />
                                            </motion.div>
                                            <motion.span
                                                initial={false}
                                                animate={{ width: isActive ? "auto" : 0, opacity: isActive ? 1 : 0, marginLeft: isActive ? 2 : 0 }}
                                                transition={{ duration: 0.22, ease: "easeOut" }}
                                                className={`relative z-10 whitespace-nowrap ${isActive ? "text-black" : "text-gray-500"}`}
                                            >
                                                {item.name}
                                            </motion.span>
                                        </Link>
                                    );
                                })}
                            </div>
                            <NavControls />
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── mobile header — sem blur ── */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-theme-border flex items-end justify-between px-4 pb-3" style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}>
                <Link href={`/${locale}`}>
                    <Image src="/signature.png" width={150} height={60} alt="Home" />
                </Link>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg hover:bg-theme-elevated transition-colors text-theme-fg"
                    aria-label="Open menu"
                >
                    <PiListBold size={22} />
                </button>
            </header>

            {/* ── sidebar overlay + drawer ── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* drawer */}
                        <motion.aside
                            key="drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 34 }}
                            className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-white border-l border-theme-border flex flex-col" style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
                        >
                            {/* drawer header */}
                            <div className="flex items-center justify-between px-5 h-14 border-b border-theme-border shrink-0">
                                <Image src="/signature.png" width={130} height={50} alt="Home" />
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 rounded-lg hover:bg-theme-elevated transition-colors text-theme-muted"
                                    aria-label="Close menu"
                                >
                                    <PiXBold size={18} />
                                </button>
                            </div>

                            {/* nav links */}
                            <nav className="flex-1 py-4 overflow-y-auto">
                                {menuItems.map((item, i) => {
                                    const Icon = item.icon;
                                    const isActive = isActiveRoute(item.href);
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05, duration: 0.2, ease: "easeOut" }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={`relative flex items-center gap-4 px-5 py-3.5 transition-colors ${
                                                    isActive
                                                        ? "text-theme-fg bg-theme-elevated"
                                                        : "text-theme-muted hover:text-theme-fg hover:bg-theme-surface"
                                                }`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeSidebarTab"
                                                        className="absolute right-0 top-2 bottom-2 w-0.5 bg-theme-fg rounded-full"
                                                        transition={{ type: "spring", stiffness: 340, damping: 30 }}
                                                    />
                                                )}
                                                <Icon size={20} />
                                                <span className="text-sm font-medium">{item.name}</span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* bottom controls */}
                            <div className="shrink-0 border-t border-theme-border px-5 py-5 space-y-4">

                                {/* language */}
                                <div>
                                    <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                        <PiGlobeBold size={13} />
                                        Language
                                    </p>
                                    <div className="flex flex-col gap-1.5">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => switchLocale(lang.code)}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                                    locale === lang.code
                                                        ? "bg-theme-accent text-theme-accent-fg"
                                                        : "bg-theme-surface text-theme-muted hover:bg-theme-elevated hover:text-theme-fg"
                                                }`}
                                            >
                                                <span className="text-lg leading-none">{lang.flag}</span>
                                                <span>{lang.label}</span>
                                                {locale === lang.code && (
                                                    <span className="ml-auto text-xs font-bold uppercase tracking-wide opacity-70">{lang.code}</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default NavBar;
