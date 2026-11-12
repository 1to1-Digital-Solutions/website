"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

/**
 * Floating navbar from the design system (oto-nav): 10px corners, links in foreground with the
 * current page underlined, and the neon "Hablemos" as the only colour in the bar.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const pathname = usePathname();

  // Only the inner pages: the home sections are reached by scrolling.
  const navLinks = [
    { name: t("navServices"), href: "/services" },
    { name: t("navAbout"), href: "/about" },
  ];
  const isCurrent = (href: string) => pathname === href;

  const toggleLanguage = () => setLang(lang === "es" ? "en" : "es");

  const logoSrc = !mounted || theme === "dark" ? "/logo-negative.svg" : "/logo-positive.svg";

  const links = (onClick?: () => void) => (
    <ul className="oto-nav__links">
      {navLinks.map((link) => (
        <li key={link.name as string}>
          <Link
            href={link.href}
            aria-current={isCurrent(link.href) ? "page" : undefined}
            className="oto-nav__link focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none"
            onClick={onClick}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  const toggles = (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        className="oto-toggle oto-toggle--icon"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {mounted && theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </button>
      <button
        type="button"
        onClick={toggleLanguage}
        className="oto-toggle"
        aria-label={t(lang === "es" ? "ariaToggleLangToEn" : "ariaToggleLangToEs") as string}
      >
        <Globe aria-hidden="true" /> {lang}
      </button>
    </>
  );

  return (
    <div className="fixed top-4 left-1/2 z-[200] w-[95%] max-w-7xl -translate-x-1/2">
      <nav className="oto-nav" aria-label={lang === "es" ? "Principal" : "Main"}>
        <div className="oto-nav__inner">
          <Link
            href="/"
            className="focus-visible:ring-primary rounded focus-visible:ring-2 focus-visible:outline-none"
          >
            <Image
              src={logoSrc}
              alt="1to1 Digital Solutions"
              width={246}
              height={133}
              className="h-9 w-auto md:h-8"
              priority
              suppressHydrationWarning
            />
          </Link>

          <div className="oto-nav__right">
            {links()}
            {toggles}
            <Link href="/#contact" className="oto-btn oto-btn--neon oto-btn--sm">
              {t("navCTA")}
            </Link>
          </div>

          <div className="oto-nav__mobile">
            {toggles}
            <button
              type="button"
              className="oto-nav__menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t(isOpen ? "ariaCloseMenu" : "ariaOpenMenu") as string}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div id="mobile-menu" className="oto-nav__panel" hidden={!isOpen}>
          {links(() => setIsOpen(false))}
          <Link
            href="/#contact"
            className="oto-btn oto-btn--neon w-full"
            onClick={() => setIsOpen(false)}
          >
            {t("navCTA")}
          </Link>
        </div>
      </nav>
    </div>
  );
}
