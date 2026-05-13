"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: t("navServices"), href: "#services" },
    { name: t("navWork"), href: "#work" },
    { name: t("navTestimonials"), href: "#testimonials" },
    { name: t("navAbout"), href: "#about" },
    { name: t("navFAQ"), href: "#faq" },
  ];

  const toggleLanguage = () => setLang(lang === "es" ? "en" : "es");

  const logoSrc = !mounted || theme === "dark" ? "/logo-negative.svg" : "/logo-positive.svg";

  return (
    <nav className="bg-background/80 border-foreground/10 md:bg-background/40 fixed top-4 left-1/2 z-[90] w-[95%] max-w-7xl -translate-x-1/2 rounded-full border p-1 shadow-lg backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-3 md:py-2">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name as string}>
                <Link
                  href={link.href}
                  className="text-foreground/80 hover:text-primary focus-visible:ring-primary rounded text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="border-foreground/20 hover:bg-foreground/10 focus-visible:ring-primary flex cursor-pointer items-center justify-center rounded-lg border p-1.5 opacity-80 transition-all hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted && theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="border-foreground/20 hover:bg-foreground/10 focus-visible:ring-primary flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase opacity-80 transition-all hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
            aria-label={t(lang === "es" ? "ariaToggleLangToEn" : "ariaToggleLangToEs") as string}
          >
            <Globe size={14} /> {lang}
          </button>

          <Link
            href="#contact"
            className="bg-primary focus-visible:ring-primary focus-visible:ring-offset-background rounded-full px-5 py-2 text-sm font-semibold text-[var(--on-primary)] transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t("navCTA")}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="border-foreground/20 hover:bg-foreground/10 focus-visible:ring-primary flex cursor-pointer items-center justify-center rounded-lg border p-1.5 opacity-80 transition-all focus-visible:ring-2 focus-visible:outline-none"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted && theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="border-foreground/20 hover:bg-foreground/10 focus-visible:ring-primary flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1 text-xs font-bold uppercase opacity-80 transition-all focus-visible:ring-2 focus-visible:outline-none"
            aria-label={t(lang === "es" ? "ariaToggleLangToEn" : "ariaToggleLangToEs") as string}
          >
            <Globe size={14} /> {lang}
          </button>

          {/* Hamburger */}
          <button
            className="text-foreground focus-visible:ring-primary cursor-pointer rounded-md focus-visible:ring-2 focus-visible:outline-none"
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
        <div
          id="mobile-menu"
          className="bg-background/95 border-foreground/10 absolute top-[calc(100%+10px)] left-0 w-full rounded-2xl border pt-4 pb-6 shadow-lg backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name as string}>
                <Link
                  href={link.href}
                  className="text-foreground/90 hover:text-primary focus-visible:ring-primary rounded text-lg font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                className="bg-primary focus-visible:ring-primary focus-visible:ring-offset-background mt-4 block rounded-full px-8 py-3 text-base font-semibold text-[var(--on-primary)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
