import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Eyebrow } from "@1to1/ui";
import { useLanguage } from "@/context/LanguageContext";

/**
 * StoryBrand guide: a short personal story (empathy), then the competence. Little on purpose; the rest lives in
 * /about, and the projects and testimonials right after back it up.
 */
export function WhoGuides() {
  const { t } = useLanguage();
  const points = [t("who1"), t("who2"), t("who3")];

  return (
    <section id="who" className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
        <div
          data-bolt-card
          data-bolt-trigger
          className="bg-anthracite relative aspect-square w-48 shrink-0 overflow-hidden rounded-3xl md:w-64"
        >
          <Image
            src="/images/profilePicture.jpg"
            alt={t("whoImgAlt") as string}
            fill
            sizes="(min-width: 768px) 16rem, 12rem"
            className="object-cover object-top"
          />
        </div>

        <div className="text-center md:text-left">
          <Eyebrow>{t("whoEyebrow") as string}</Eyebrow>
          <h2 className="oto-h2">{t("whoTitle")}</h2>
          <p className="oto-lead">{t("whoText")}</p>
          {/* oto- classes set their own margins, so the list is centred on mobile by its wrapper. */}
          <div className="flex justify-center md:justify-start">
            <ul className="oto-checklist text-left">
              {points.map((point) => (
                <li key={point as string}>
                  <span className="oto-check" aria-hidden="true">
                    <Check strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/about" className="oto-btn oto-btn--secondary mt-8">
            {t("whoLink")}
            <span className="oto-btn__arrow" aria-hidden="true">
              <ChevronRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
