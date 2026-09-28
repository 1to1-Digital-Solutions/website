"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SERVICES_PAGE, servicesByGroup, type Service } from "@/content/services";
import { PageCta } from "@/components/PageCta";

function ServiceDetail({ service, lang }: { service: Service; lang: "es" | "en" }) {
  const c = service[lang];
  const ui = SERVICES_PAGE[lang];
  const Icon = service.icon;

  return (
    <article
      id={service.slug}
      className="border-foreground/10 bg-anthracite/50 scroll-mt-32 rounded-3xl border p-8 md:p-12"
    >
      <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-5">
          <div className="bg-primary/10 ring-primary/20 inline-flex shrink-0 rounded-xl p-3 ring-1">
            <Icon size={32} aria-hidden="true" className="text-primary" />
          </div>
          <div>
            <h3 className="font-outfit text-3xl font-bold tracking-tight">{c.title}</h3>
            <p className="text-foreground/75 mt-2 max-w-2xl text-lg leading-relaxed">{c.summary}</p>
          </div>
        </div>
        {c.fact && (
          <span className="border-primary/30 text-primary shrink-0 self-start rounded-full border px-4 py-1.5 text-sm font-semibold">
            {c.fact}
          </span>
        )}
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <h4 className="text-foreground text-sm font-semibold tracking-widest uppercase">
              {ui.situationLabel}
            </h4>
            <p className="text-foreground/75 mt-3 leading-relaxed">{c.situation}</p>
          </div>
          <div>
            <h4 className="text-foreground text-sm font-semibold tracking-widest uppercase">
              {ui.approachLabel}
            </h4>
            <p className="text-foreground/75 mt-3 leading-relaxed">{c.approach}</p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h4 className="text-foreground text-sm font-semibold tracking-widest uppercase">
              {ui.deliverablesLabel}
            </h4>
            <ul className="mt-3 flex flex-col gap-2">
              {c.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} aria-hidden="true" className="text-primary mt-1 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {c.proof && (
            <div className="bg-background/60 border-primary/40 rounded-2xl border-l-4 p-5">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                {ui.proofLabel}
              </p>
              <p className="text-foreground/80 mt-2 leading-relaxed">{c.proof}</p>
            </div>
          )}

          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {service.stack.map((tech) => (
              <li
                key={tech}
                className="bg-foreground/5 text-foreground/70 rounded-full px-3 py-1 text-xs font-medium"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href="/#contact"
        className="group text-primary hover:text-primary/80 focus-visible:ring-primary mt-10 inline-flex items-center gap-2 rounded font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        {ui.serviceCta}
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}

export function ServicesPage() {
  const { lang } = useLanguage();
  const ui = SERVICES_PAGE[lang];
  const scope = servicesByGroup("scope");
  const tech = servicesByGroup("tech");

  return (
    <div className="bg-background w-full pt-32">
      {/* Cabecera con índice */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-16 text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">{ui.eyebrow}</p>
        <h1 className="font-outfit mt-3 text-5xl font-bold tracking-tight md:text-6xl">
          {ui.title1}
          <span className="text-primary">{ui.title2}</span>
        </h1>
        <p className="text-foreground/75 mx-auto mt-6 max-w-3xl text-lg leading-relaxed md:text-xl">
          {ui.intro}
        </p>
        <nav aria-label={ui.eyebrow} className="mt-10">
          <ul className="flex flex-wrap justify-center gap-3">
            {[...scope, ...tech].map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="border-foreground/15 hover:border-primary/60 hover:text-primary focus-visible:ring-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  <s.icon size={16} aria-hidden="true" />
                  {s[lang].title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Ámbitos */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="mb-10">
          <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
            {ui.scopeTitle}
          </h2>
          <p className="text-foreground/70 mt-3 text-lg">{ui.scopeSub}</p>
        </div>
        <div className="flex flex-col gap-8">
          {scope.map((s) => (
            <ServiceDetail key={s.slug} service={s} lang={lang} />
          ))}
        </div>
      </section>

      {/* Tecnologías */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="mb-10">
          <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
            {ui.techTitle}
          </h2>
          <p className="text-foreground/70 mt-3 text-lg">{ui.techSub}</p>
        </div>
        <div className="flex flex-col gap-8">
          {tech.map((s) => (
            <ServiceDetail key={s.slug} service={s} lang={lang} />
          ))}
        </div>
      </section>

      {/* Modelo de trabajo */}
      <section className="bg-anthracite w-full py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
            {ui.modelTitle}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ui.model.map((m) => (
              <div
                key={m.title}
                className="border-foreground/10 bg-background/50 rounded-2xl border p-6"
              >
                <h3 className="font-outfit text-lg font-semibold">{m.title}</h3>
                <p className="text-foreground/70 mt-2 text-sm leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-24">
        <PageCta
          title={ui.ctaTitle}
          text={ui.ctaText}
          primary={{ label: ui.ctaButton, href: "/#contact" }}
          secondary={{ label: ui.ctaAbout, href: "/about" }}
        />
      </div>
    </div>
  );
}
