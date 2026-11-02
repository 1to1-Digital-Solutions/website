"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";
import { PageCta } from "@/components/PageCta";

export function ServicesPage() {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];

  return (
    <div className="bg-background w-full pt-32">
      {/* Header */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-16 text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">{c.eyebrow}</p>
        <h1 className="font-outfit mt-3 text-5xl font-bold tracking-tight md:text-6xl">
          {c.title1}
          <span className="text-primary">{c.title2}</span>
        </h1>
        <p className="text-foreground/75 mx-auto mt-6 max-w-3xl text-lg leading-relaxed md:text-xl">
          {c.intro}
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {c.facts.map((fact) => (
            <li
              key={fact}
              className="border-primary/30 text-primary rounded-full border px-4 py-1.5 text-sm font-semibold"
            >
              {fact}
            </li>
          ))}
        </ul>
      </section>

      {/* Who it is for */}
      <section id="for-who" className="mx-auto w-full max-w-4xl scroll-mt-32 px-6 pb-20">
        <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
          {c.forWhoTitle}
        </h2>
        <div className="text-foreground/80 mt-6 flex flex-col gap-4 text-lg leading-relaxed">
          {c.forWho.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      {/* The 4 steps */}
      <section id="steps" className="bg-anthracite w-full scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
            {c.stepsTitle}
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.map((step, i) => (
              <li
                key={step.title}
                className="border-foreground/10 bg-background/50 rounded-2xl border p-6"
              >
                <span className="font-outfit text-primary text-2xl font-black">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-outfit mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="text-foreground/70 mt-2 text-sm leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you take away */}
      <section id="outcomes" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
        <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
          {c.outcomesTitle}
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {c.outcomes.map((o) => (
            <li
              key={o.title}
              className="border-foreground/10 bg-anthracite/50 flex items-start gap-4 rounded-2xl border p-6"
            >
              <Check size={22} aria-hidden="true" className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-outfit text-lg font-semibold">{o.title}</h3>
                <p className="text-foreground/75 mt-1 leading-relaxed">{o.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Proof: processes turned into tools */}
      <section className="bg-anthracite w-full py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
            {c.proofTitle}
          </h2>
          <p className="text-foreground/70 mt-3 text-lg">{c.proofIntro}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.proofs.map((p) => (
              <div
                key={p.title}
                className="bg-background/60 border-primary/40 rounded-2xl border-l-4 p-5"
              >
                <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                  {p.title}
                </p>
                <p className="text-foreground/80 mt-2 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">{c.waveTitle}</h2>
        <p className="text-foreground/80 mt-6 text-lg leading-relaxed">{c.wave}</p>
      </section>

      <PageCta
        title={c.ctaTitle}
        text={c.ctaText}
        primary={{ label: c.ctaButton, href: "/#contact" }}
        secondary={{ label: c.ctaAbout, href: "/about" }}
      />
    </div>
  );
}
