"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-foreground/10 bg-anthracite text-foreground/80 border-t py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="focus-visible:ring-primary rounded focus-visible:ring-2 focus-visible:outline-none">
            <Image
              src="/logo.svg"
              alt="1to1 Studio"
              width={222}
              height={140}
              className="h-14 w-auto"
            />
          </Link>
          <p className="mt-2 max-w-xs text-center text-sm md:text-left">{t("footDesc")}</p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary focus-visible:ring-primary rounded focus-visible:ring-2 focus-visible:outline-none transition-colors"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary focus-visible:ring-primary rounded focus-visible:ring-2 focus-visible:outline-none transition-colors"
          >
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>

      <div className="text-foreground/50 mx-auto mt-12 flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs md:flex-row">
        <p>
          &copy; {CURRENT_YEAR} 1to1 Studio. {t("footRights")}
        </p>
        <div className="flex gap-4">
          <Link
            href="/terms-conditions"
            className="hover:text-primary focus-visible:ring-primary rounded underline-offset-2 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            {t("footTerms")}
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-primary focus-visible:ring-primary rounded underline-offset-2 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            {t("footPrivacy")}
          </Link>
          <Link
            href="/cookie-policy"
            className="hover:text-primary focus-visible:ring-primary rounded underline-offset-2 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            {t("cookiePolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
