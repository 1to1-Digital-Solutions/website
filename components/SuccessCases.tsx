import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function SuccessCases() {
  const { t } = useLanguage();

  const cases = [
    {
      title: t("case1Title"),
      category: t("case1Cat"),
      description: t("case1Desc"),
      tags: ["Web3", "DeFi", "Svelte", "TypeScript", "Wallet"],
      url: "https://www.iota.org/",
      logo: "/images/cases/IOTA.png",
      logoAlt: "IOTA",
      logoSize: "h-4/5 w-11/12",
    },
    {
      title: t("case2Title"),
      category: t("case2Cat"),
      description: t("case2Desc"),
      tags: ["VR", "Next.js", "Three.js", "Hyperfy", "AI", "AWS", "Database"],
      url: "https://numen.games/en",
      logo: "/images/cases/NumenGames.png",
      logoAlt: "Numen Games",
      logoSize: "h-4/5 w-11/12",
    },
    {
      title: t("case3Title"),
      category: t("case3Cat"),
      description: t("case3Desc"),
      tags: ["Svelte", "Supabase", "Capacitor", "iOS", "Android"],
      url: "https://www.moovle.app/app.html",
      logo: "/images/cases/Moovle.png",
      logoAlt: "Moovle",
      logoSize: "h-1/2 w-3/4",
    },
  ];

  return (
    <section id="work" className="bg-anthracite/30 w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
            {t("casesTitle1")} <span className="text-primary">{t("casesTitle2")}</span>
          </h2>
          <p className="text-foreground/70 mx-auto mt-4 max-w-2xl text-lg">{t("casesSub")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((project, idx) => (
            <a
              key={idx}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background hover:shadow-primary/10 focus-visible:ring-primary flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-2 hover:shadow-2xl focus-visible:ring-2 focus-visible:outline-none"
            >
              <div className="bg-anthracite relative aspect-video w-full overflow-hidden">
                <div className="from-primary/20 absolute inset-0 bg-gradient-to-br to-transparent mix-blend-overlay" />
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
                  <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {project.category as string}
                  </span>
                  <ExternalLink
                    size={16}
                    aria-hidden="true"
                    className="text-foreground/40 group-hover:text-primary transition-colors"
                  />
                </div>
                <h3 className="font-outfit group-hover:text-primary mb-3 text-xl font-bold transition-colors">
                  {project.title as string}
                  <span className="sr-only"> {t("srOpensInNewTab") as string}</span>
                </h3>
                <p className="text-foreground/70 mb-6 flex-1 text-sm">
                  {project.description as string}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-foreground/5 text-foreground/70 rounded-full px-3 py-1 text-xs font-medium"
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
