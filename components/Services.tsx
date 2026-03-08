import { Code2, Glasses, Rocket, Server } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t("serv1Title"),
      description: t("serv1Desc"),
      icon: Rocket,
      hoverClass: "text-primary group-hover:text-orange-400",
      cardHoverClass:
        "group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-15px_rgba(251,146,60,0.4)] group-hover:animate-rocket-vibrate",
      bgAction: "rocket",
    },
    {
      title: t("serv2Title"),
      description: t("serv2Desc"),
      icon: Code2,
      hoverClass:
        "transition-transform duration-300 group-hover:scale-110 text-primary group-hover:text-blue-400",
      cardHoverClass: "transition-all duration-300",
      bgAction: "code",
    },
    {
      title: t("serv3Title"),
      description: t("serv3Desc"),
      icon: Glasses,
      hoverClass:
        "transition-transform duration-300 group-hover:scale-110 text-primary group-hover:text-purple-400",
      cardHoverClass: "transition-all duration-300 group-hover:border-purple-500/50",
      bgAction: "3d",
    },
    {
      title: t("serv4Title"),
      description: t("serv4Desc"),
      icon: Server,
      hoverClass: "group-hover:animate-pulse text-primary group-hover:text-green-400",
      cardHoverClass: "transition-all duration-300 group-hover:border-green-500/50",
      bgAction: "server",
    },
  ];

  return (
    <section
      id="services"
      className="relative mx-auto w-full max-w-7xl overflow-visible px-6 py-24"
    >
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
          {t("servicesTitle1")}
          <span className="text-primary">{t("servicesTitle2")}</span>
        </h2>
        <p className="text-foreground/70 mt-4 max-w-2xl text-lg">{t("servicesSub")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`group border-foreground/10 bg-anthracite/50 hover:bg-anthracite relative overflow-hidden rounded-2xl border p-8 ${service.cardHoverClass}`}
          >
            {/* Subtle glow effect on hover */}
            <div className="from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/20 absolute -inset-px rounded-2xl bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Custom Background Actions */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {service.bgAction === "rocket" && (
                <div className="absolute inset-x-0 bottom-0 h-48 translate-y-full bg-gradient-to-t from-orange-500/30 via-orange-500/10 to-transparent blur-xl transition-transform duration-700 ease-out group-hover:translate-y-0" />
              )}
              {service.bgAction === "code" && (
                <div className="text-primary animate-[code-bg_10s_linear_infinite] font-mono text-[10px] leading-tight whitespace-pre opacity-10 sm:text-xs">
                  {`01001100 01101111 01100111 01101001 01100011 00100000 01001001 01110011 00100000 01000101 01110110 01100101 01110010 01111001 01110100 01101000 01101001 01101110 01100111\n`.repeat(
                    20
                  )}
                </div>
              )}
              {service.bgAction === "3d" && (
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="h-56 w-56 animate-[spin_10s_linear_infinite] border border-purple-500/50 [transform-style:preserve-3d]">
                    <div className="absolute inset-0 [transform:rotateX(60deg)_rotateY(45deg)] border border-purple-500/50" />
                    <div className="absolute inset-0 [transform:rotateX(-60deg)_rotateY(-45deg)] border border-purple-500/50" />
                    <div className="absolute inset-0 [transform:rotateX(45deg)_rotateZ(45deg)] border border-purple-500/50" />
                  </div>
                </div>
              )}
              {service.bgAction === "server" && (
                <div className="absolute top-0 right-0 flex h-full w-1/2 flex-col justify-around px-4 py-8 opacity-10">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-4 w-full animate-pulse rounded border border-green-500/30 bg-green-500/10"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="relative z-10">
              <div className="bg-primary/10 ring-primary/20 group-hover:bg-background/50 mb-6 inline-flex rounded-xl p-3 ring-1 transition-colors">
                <service.icon
                  size={32}
                  aria-hidden="true"
                  className={`transition-all duration-300 ${service.hoverClass}`}
                />
              </div>
              <h3 className="font-outfit mb-3 text-2xl font-semibold">{service.title as string}</h3>
              <p className="text-foreground/70 leading-relaxed">{service.description as string}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
