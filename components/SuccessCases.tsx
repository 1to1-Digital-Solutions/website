import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@1to1/ui";
import { useLanguage } from "@/context/LanguageContext";

export function SuccessCases() {
  const { t, lang } = useLanguage();
  const es = lang === "es";

  const cases = [
    {
      title: t("case1Title"),
      category: t("case1Cat"),
      description: t("case1Desc"),
      tags: ["Blockchain", "Wallet", es ? "Seguridad" : "Security"],
      url: "https://www.iota.org/",
      logo: "/images/cases/IOTA.png",
      logoAlt: "IOTA",
      logoSize: "h-4/5 w-11/12",
    },
    {
      title: t("case2Title"),
      category: t("case2Cat"),
      description: t("case2Desc"),
      tags: [
        es ? "Realidad Virtual" : "Virtual Reality",
        es ? "Plataforma" : "Platform",
        es ? "IA" : "AI",
      ],
      url: "https://numen.games/en",
      logo: "/images/cases/NumenGames.png",
      logoAlt: "Numen Games",
      logoSize: "h-4/5 w-11/12",
    },
    {
      title: t("case3Title"),
      category: t("case3Cat"),
      description: t("case3Desc"),
      tags: [es ? "App móvil" : "Mobile app", "iOS", "Android"],
      url: "https://www.moovle.app/app.html",
      logo: "/images/cases/Moovle.png",
      logoAlt: "Moovle",
      logoSize: "h-1/2 w-3/4",
    },
  ];

  return (
    <section id="work" className="w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <SectionHeading
            title={t("casesTitle1") as string}
            accent={t("casesTitle2") as string}
            lead={t("casesSub")}
          />
        </div>

        <div data-bolt-trigger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((project, idx) => (
            <a
              key={idx}
              data-bolt-card
              data-bolt-entry={idx === 1 ? "" : undefined}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background border-border-default hover:border-primary/50 focus-visible:ring-primary flex flex-col overflow-hidden rounded-2xl border transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <div className="bg-anthracite relative aspect-video w-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div
                    className={`relative ${project.logoSize} brightness-0 transition-transform duration-500 group-hover:scale-105 dark:invert`}
                  >
                    <Image
                      src={project.logo}
                      alt={project.logoAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 80vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-primary text-sm font-semibold">
                    {project.category as string}
                  </span>
                  <ExternalLink
                    size={16}
                    aria-hidden="true"
                    className="text-text-subtle group-hover:text-primary transition-colors"
                  />
                </div>
                <h3 className="font-display group-hover:text-primary mb-3 text-xl font-bold transition-colors">
                  {project.title as string}
                  <span className="sr-only"> {t("srOpensInNewTab") as string}</span>
                </h3>
                <p className="text-text-muted mb-6 flex-1 text-sm">
                  {project.description as string}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="border-border-default text-text-muted rounded-full border px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
