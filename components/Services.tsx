import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SERVICES_PAGE, servicesByGroup, type ServiceSlug } from "@/content/services";

// Cada ámbito conserva su animación de fondo al pasar el ratón.
const SCOPE_STYLE: Record<string, { hoverClass: string; cardHoverClass: string; bg: string }> = {
  rescue: {
    hoverClass:
      "transition-transform duration-300 group-hover:scale-110 text-primary group-hover:text-blue-400",
    cardHoverClass: "transition-all duration-300 group-hover:border-blue-500/50",
    bg: "code",
  },
  launch: {
    hoverClass: "text-primary group-hover:text-orange-400",
    cardHoverClass:
      "group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-15px_rgba(251,146,60,0.4)] group-hover:animate-rocket-vibrate",
    bg: "rocket",
  },
  digitalize: {
    hoverClass: "group-hover:animate-pulse text-primary group-hover:text-green-400",
    cardHoverClass: "transition-all duration-300 group-hover:border-green-500/50",
    bg: "server",
  },
};

const serviceHref = (slug: ServiceSlug) => `/services#${slug}`;

export function Services() {
  const { lang } = useLanguage();
  const ui = SERVICES_PAGE[lang];
  const scope = servicesByGroup("scope");
  const tech = servicesByGroup("tech");

  return (
    <section
      id="services"
      className="relative mx-auto w-full max-w-7xl overflow-visible px-6 py-24"
    >
      <div className="mb-16 text-center">
        <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
          {ui.title1}
          <span className="text-primary">{ui.title2}</span>
        </h2>
        <p className="text-foreground/70 mx-auto mt-4 max-w-2xl text-lg">{ui.intro}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {scope.map((service) => {
          const style = SCOPE_STYLE[service.slug];
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={serviceHref(service.slug)}
              className={`group border-foreground/10 bg-anthracite/50 hover:bg-anthracite focus-visible:ring-primary relative flex flex-col overflow-hidden rounded-2xl border p-8 focus-visible:ring-2 focus-visible:outline-none ${style.cardHoverClass}`}
            >
              {/* Subtle glow effect on hover */}
              <div className="from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/20 absolute -inset-px rounded-2xl bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Custom Background Actions */}
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {style.bg === "rocket" && (
                  <div className="absolute inset-x-0 bottom-0 h-48 translate-y-full bg-gradient-to-t from-orange-500/30 via-orange-500/10 to-transparent blur-xl transition-transform duration-700 ease-out group-hover:translate-y-0" />
                )}
                {style.bg === "code" && (
                  <div className="text-primary animate-[code-bg_10s_linear_infinite] font-mono text-[10px] leading-tight whitespace-pre opacity-10 sm:text-xs">
                    {`01001100 01101111 01100111 01101001 01100011 00100000 01001001 01110011 00100000 01000101 01110110 01100101 01110010 01111001 01110100 01101000 01101001 01101110 01100111\n`.repeat(
                      20
                    )}
                  </div>
                )}
                {style.bg === "server" && (
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

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="bg-primary/10 ring-primary/20 group-hover:bg-background/50 mb-6 inline-flex self-start rounded-xl p-3 ring-1 transition-colors">
                  <Icon
                    size={32}
                    aria-hidden="true"
                    className={`transition-all duration-300 ${style.hoverClass}`}
                  />
                </div>
                <h3 className="font-outfit mb-3 text-2xl font-semibold">{service[lang].title}</h3>
                <p className="text-foreground/70 flex-1 leading-relaxed">{service[lang].summary}</p>
                <span className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  {ui.cardLink}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <h3 className="font-outfit text-foreground/80 mt-16 mb-6 text-center text-xl font-semibold">
        {ui.techRowTitle}
      </h3>
      <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {tech.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={serviceHref(service.slug)}
              className="group border-foreground/10 bg-anthracite/30 hover:border-primary/50 hover:bg-anthracite focus-visible:ring-primary flex items-start gap-4 rounded-2xl border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Icon size={24} aria-hidden="true" className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-outfit font-semibold">{service[lang].title}</p>
                <p className="text-foreground/65 mt-1 text-sm leading-snug">{service[lang].fact}</p>
              </div>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="text-primary ml-auto shrink-0 self-center transition-transform group-hover:translate-x-1"
              />
            </Link>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/services"
          className="border-foreground/20 hover:border-primary/60 hover:text-primary focus-visible:ring-primary inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          {ui.allServices}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
