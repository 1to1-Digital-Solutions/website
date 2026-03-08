import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function AboutMe() {
  const { t } = useLanguage();

  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
        {/* Left column: Image / Visual */}
        <div className="relative w-full flex-1">
          <div className="bg-anthracite/80 relative aspect-square w-full max-w-md overflow-hidden rounded-3xl">
            <Image
              src="/images/profilePicture.jpg"
              alt="Foto de perfil del fundador de 1to1 Studio"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="from-primary/20 absolute inset-0 bg-linear-to-tr to-transparent mix-blend-overlay"></div>
          </div>

          {/* Decorative element */}
          <div className="bg-primary/20 absolute -right-6 -bottom-6 -z-10 h-64 w-64 rounded-full blur-3xl"></div>
        </div>

        {/* Right column: Content */}
        <div className="flex-1">
          <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
            {t("aboutTitle1")} <span className="text-primary">{t("aboutTitle2")}</span>
          </h2>
          <div className="text-foreground/80 mt-6 flex flex-col gap-4 text-lg">
            <p>
              {t("aboutP1")} <strong>{t("aboutP1Span")}</strong>
            </p>
            <p>{t("aboutP2")}</p>
            <ul className="text-primary ml-6 list-disc">
              <li>
                <span className="text-foreground/80">{t("aboutList1")}</span>
              </li>
              <li>
                <span className="text-foreground/80">{t("aboutList2")}</span>
              </li>
              <li>
                <span className="text-foreground/80">{t("aboutList3")}</span>
              </li>
            </ul>
            <p>{t("aboutP3")}</p>
          </div>

          <a
            href="#contact"
            className="group text-primary hover:text-primary/80 focus-visible:ring-primary mt-10 inline-flex items-center gap-2 rounded font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            {t("aboutBtn")}{" "}
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
