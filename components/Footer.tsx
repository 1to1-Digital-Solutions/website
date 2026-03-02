"use client";

import Link from "next/link";
import { Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-foreground/10 bg-anthracite text-foreground/80 border-t py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-foreground text-2xl font-bold tracking-tighter">
            1to1 Studio<span className="text-primary">.</span>
          </Link>
          <p className="mt-2 max-w-xs text-center text-sm md:text-left">{t("footDesc")}</p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>

      <div className="text-foreground/40 mx-auto mt-12 flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs md:flex-row">
        <p>
          &copy; {currentYear} 1to1 Studio. {t("footRights")}
        </p>
        <div className="flex gap-4">
          <Link
            href="/terms-conditions"
            className="hover:text-primary underline-offset-2 transition-colors hover:underline"
          >
            {t("footTerms")}
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-primary underline-offset-2 transition-colors hover:underline"
          >
            {t("footPrivacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
