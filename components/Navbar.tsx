"use client";

import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { name: t("navServices"), href: "#services" },
    { name: t("navAbout"), href: "#about" },
    { name: t("navWork"), href: "#work" },
    { name: t("navTestimonials"), href: "#testimonials" },
    { name: t("navFAQ"), href: "#faq" },
  ];

  const toggleLanguage = () => {
    setLang(lang === "es" ? "en" : "es");
  };

  return (
    <nav className="bg-background/40 fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-full border border-white/10 p-1 shadow-lg backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground hover:text-primary text-2xl font-bold tracking-tighter transition-colors"
        >
          1to1 Studio<span className="text-primary">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name as string}>
                <Link
                  href={link.href}
                  className="text-foreground/80 hover:text-primary focus-visible:ring-primary rounded focus-visible:ring-2 focus-visible:outline-none text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleLanguage}
            className="border-foreground/20 hover:bg-foreground/10 focus-visible:ring-primary flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase opacity-80 transition-all hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
            aria-label={t(lang === "es" ? "ariaToggleLangToEn" : "ariaToggleLangToEs") as string}
          >
            <Globe size={14} /> {lang}
          </button>

          <Link
            href="#contact"
            className="bg-primary text-background focus-visible:ring-primary rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("navCTA")}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLanguage}
            className="border-foreground/20 hover:bg-foreground/10 focus-visible:ring-primary flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1 text-xs font-bold uppercase opacity-80 transition-all focus-visible:ring-2 focus-visible:outline-none"
            aria-label={t(lang === "es" ? "ariaToggleLangToEn" : "ariaToggleLangToEs") as string}
          >
            <Globe size={14} /> {lang}
          </button>

          <button
            className="text-foreground cursor-pointer focus-visible:ring-primary rounded-md focus-visible:ring-2 focus-visible:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t(isOpen ? "ariaCloseMenu" : "ariaOpenMenu") as string}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div id="mobile-menu" className="bg-background/80 absolute top-[calc(100%+10px)] left-0 w-full rounded-2xl border border-white/10 pt-4 pb-6 shadow-lg backdrop-blur-xl md:hidden">
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name as string}>
                <Link
                  href={link.href}
                  className="text-foreground/90 hover:text-primary focus-visible:ring-primary rounded focus-visible:ring-2 focus-visible:outline-none text-lg font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                className="bg-primary text-background focus-visible:ring-primary mt-4 block rounded-full px-8 py-3 text-base font-semibold focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onClick={() => setIsOpen(false)}
              >
                {t("navCTA")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
