import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** Home block: who gives the mentoring. Little on purpose; the rest lives in /about. */
export function WhoGuides() {
  const { t } = useLanguage();
  const points = [t("who1"), t("who2"), t("who3")];

  return (
    <section id="who" className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
        <div className="bg-anthracite/80 relative aspect-square w-48 shrink-0 overflow-hidden rounded-3xl md:w-64">
          <Image
            src="/images/profilePicture.jpg"
            alt={t("whoImgAlt") as string}
            fill
            sizes="(min-width: 768px) 16rem, 12rem"
            className="object-cover object-top"
          />
          <div className="from-primary/20 absolute inset-0 bg-linear-to-tr to-transparent mix-blend-overlay" />
        </div>

        <div className="text-center md:text-left">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t("whoEyebrow")}
          </p>
          <h2 className="font-outfit mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t("whoTitle")}
          </h2>
          <p className="text-foreground/75 mt-4 text-lg leading-relaxed">{t("whoText")}</p>
          <ul className="mt-6 flex flex-col items-center gap-2 md:items-start">
            {points.map((point) => (
              <li key={point as string} className="text-foreground/85 flex items-center gap-2">
                <Check size={18} aria-hidden="true" className="text-primary shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="border-foreground/20 hover:border-primary/60 hover:text-primary focus-visible:ring-primary mt-8 inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            {t("whoLink")}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
