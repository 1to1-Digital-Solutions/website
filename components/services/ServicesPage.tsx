"use client";

import { ShieldCheck, X } from "lucide-react";
import { Eyebrow, ProcessSteps } from "@1to1/ui";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";
import { Contact } from "@/components/Contact";
import { PriceCard } from "@/components/PriceCard";

export function ServicesPage() {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];

  return (
    <div className="bg-background w-full pt-32">
      {/* Header */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-16 text-center">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1 className="font-display mt-3 text-5xl leading-none font-bold tracking-[-0.025em] md:text-6xl">
          {c.title1}
          <span className="oto-accent">{c.title2}</span>
        </h1>
        <p className="text-text-muted mx-auto mt-6 max-w-3xl text-lg leading-relaxed md:text-xl">
          {c.intro}
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {c.facts.map((fact) => (
            <li
              key={fact}
              className="border-border-strong text-foreground rounded-full border px-4 py-1.5 text-sm font-semibold"
            >
              {fact}
            </li>
          ))}
        </ul>
      </section>

      {/* Who it is for */}
      <section id="for-who" className="mx-auto w-full max-w-4xl scroll-mt-32 px-6 pb-20">
        <h2 className="font-display text-3xl font-bold tracking-[-0.025em] md:text-4xl">
          {c.forWhoTitle}
        </h2>
        <div className="text-foreground/80 mt-6 flex flex-col gap-4 text-lg leading-relaxed">
          {c.forWho.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <h2
          id="not-for"
          className="font-display mt-14 text-3xl font-bold tracking-tight md:text-4xl"
        >
          {c.notForTitle}
        </h2>
        <ul className="mt-6 flex flex-col gap-4">
          {c.notFor.map((item) => (
            <li
              key={item}
              className="text-foreground/80 flex items-start gap-3 text-lg leading-relaxed"
            >
              <span className="oto-check oto-check--no mt-1" aria-hidden="true">
                <X />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* The 4 steps */}
      <section id="steps" className="bg-anthracite w-full scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-[-0.025em] md:text-4xl">
            {c.stepsTitle}
          </h2>
          <div className="mt-12">
            <ProcessSteps steps={c.steps} />
          </div>
        </div>
      </section>

      {/* What you take away. A numbered list next to a sticky title, so it doesn't look like
          the cards of the home page summary. */}
      <section id="outcomes" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-display text-3xl font-bold tracking-[-0.025em] md:text-4xl">
              {c.outcomesTitle}
            </h2>
          </div>
          <ol className="divide-foreground/10 border-border-default divide-y border-y">
            {c.outcomes.map((o, i) => (
              <li key={o.title} className="flex gap-6 py-6">
                <span className="font-display text-primary w-10 shrink-0 text-3xl font-black">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{o.title}</h3>
                  <p className="text-text-muted mt-2 leading-relaxed">{o.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <PriceCard className="mt-12" />
      </section>

      {/* Security and regulation */}
      <section id="safety" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 pb-20">
        <h2 className="font-display text-3xl font-bold tracking-[-0.025em] md:text-4xl">
          {c.safetyTitle}
        </h2>
        <p className="text-text-muted mt-3 max-w-3xl text-lg leading-relaxed">{c.safetyIntro}</p>
        <ul className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {c.safety.map((item) => (
            <li key={item.title} className="oto-card">
              <span className="oto-icon-chip" aria-hidden="true">
                <ShieldCheck />
              </span>
              <div>
                <h3 className="oto-card__title">{item.title}</h3>
                <p className="oto-card__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-text-subtle mt-6 text-sm">{c.safetyNote}</p>
      </section>

      {/* Proof: processes turned into tools */}
      <section className="bg-anthracite w-full py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-[-0.025em] md:text-4xl">
            {c.proofTitle}
          </h2>
          <p className="text-text-muted mt-3 text-lg">{c.proofIntro}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {c.proofs.map((p) => (
              <div
                key={p.title}
                className="bg-background border-border-default rounded-2xl border p-6"
              >
                <p className="font-display text-primary text-lg font-semibold">{p.title}</p>
                <p className="text-foreground/80 mt-2 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why now */}
      <div className="relative mb-24 w-full overflow-hidden">
        <section className="relative mx-auto w-full max-w-4xl px-6 py-28">
          <h2 className="font-display text-3xl font-bold tracking-[-0.025em] md:text-4xl">
            {c.waveTitle}
          </h2>
          <div className="text-foreground/85 mt-6 flex flex-col gap-4 text-lg leading-relaxed">
            {c.wave.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      </div>

      <Contact />
    </div>
  );
}
