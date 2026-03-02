import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function SuccessCases() {
  const { t } = useLanguage();

  const cases = [
    {
      title: t("case1Title"),
      category: t("case1Cat"),
      description: t("case1Desc"),
      tags: ["React", "Ethers.js", "Tailwind CSS"],
    },
    {
      title: t("case2Title"),
      category: t("case2Cat"),
      description: t("case2Desc"),
      tags: ["Three.js", "React Three Fiber", "GSAP"],
    },
    {
      title: t("case3Title"),
      category: t("case3Cat"),
      description: t("case3Desc"),
      tags: ["Next.js", "Supabase", "Stripe"],
    },
  ];

  return (
    <section id="work" className="bg-anthracite/30 w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
            {t("casesTitle1")} <span className="text-primary">{t("casesTitle2")}</span>
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl text-lg">{t("casesSub")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((project, idx) => (
            <div
              key={idx}
              className="group bg-background hover:shadow-primary/10 flex cursor-pointer flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="bg-anthracite relative aspect-video w-full overflow-hidden">
                <div className="from-primary/20 absolute inset-0 bg-gradient-to-br to-transparent mix-blend-overlay"></div>
                {/* Placeholder Image container */}
                <div className="font-outfit text-foreground/20 flex h-full w-full items-center justify-center text-2xl font-bold">
                  {project.category as string}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {project.category as string}
                  </span>
                  <ExternalLink
                    size={16}
                    className="text-foreground/40 group-hover:text-primary transition-colors"
                  />
                </div>
                <h3 className="font-outfit group-hover:text-primary mb-3 text-xl font-bold transition-colors">
                  {project.title as string}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
