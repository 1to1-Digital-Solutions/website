"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ABOUT } from "@/content/about";
import { Contact } from "@/components/Contact";
import { Eyebrow } from "@1to1/ui";

export function AboutPage() {
  const { lang, t } = useLanguage();
  const c = ABOUT[lang];

  return (
    <div className="bg-background w-full pt-32">
      {/* Introduction */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="relative w-full flex-1">
            <div className="bg-anthracite relative aspect-square w-full max-w-md overflow-hidden rounded-3xl">
              <Image
                src="/images/profilePicture.jpg"
                alt={c.imgAlt}
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <div className="flex-1">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="font-display mt-3 text-5xl leading-none font-bold tracking-[-0.025em] md:text-6xl">
              {c.title1}
              <span className="oto-accent">{c.title2}</span>
            </h1>
            <div className="text-foreground/80 mt-6 flex flex-col gap-4 text-lg leading-relaxed md:text-xl">
              {c.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {c.stats.map((stat) => (
                <div
                  key={stat.value}
                  className="border-border-default bg-anthracite/50 flex flex-col rounded-2xl border p-5"
                >
                  <dt className="text-text-muted order-2 mt-1 text-sm leading-snug">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-primary order-1 text-2xl font-bold">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Trayectoria */}
      <section className="bg-anthracite w-full py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-[-0.025em] md:text-4xl">
            {c.pathTitle}
          </h2>
          <ol className="border-border-primary mt-10 flex flex-col gap-10 border-l pl-8">
            {c.path.map((step) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="bg-primary ring-anthracite absolute top-1.5 -left-[2.4rem] h-3 w-3 rounded-full ring-4"
                />
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="text-text-muted mt-2 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why I do it */}
      <div className="relative w-full overflow-hidden">
        <section className="relative mx-auto w-full max-w-4xl px-6 py-28">
          <h2 className="font-display text-3xl font-bold tracking-[-0.025em] md:text-4xl">
            {c.whyTitle}
          </h2>
          <div className="text-foreground/85 mt-6 flex flex-col gap-4 text-lg leading-relaxed">
            {c.why.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      </div>

      {/* Own developments */}
      <section className="bg-anthracite w-full py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-[-0.025em] md:text-4xl">
            {c.productsTitle}
          </h2>
          <p className="text-text-muted mt-3 text-lg">{c.productsSub}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {c.products.map((product) => (
              <a
                key={product.url}
                href={product.url}
                target="_blank"
                rel="noopener"
                className="group bg-background border-border-default hover:border-primary/50 focus-visible:ring-primary flex flex-col rounded-2xl border p-6 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-primary text-sm font-semibold">{product.category}</span>
                  <ExternalLink
                    size={16}
                    aria-hidden="true"
                    className="text-text-subtle group-hover:text-primary transition-colors"
                  />
                </div>
                <h3 className="font-display group-hover:text-primary mb-2 text-xl font-bold transition-colors">
                  {product.title}
                  <span className="sr-only"> {t("srOpensInNewTab") as string}</span>
                </h3>
                <p className="text-text-muted text-sm">{product.text}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-text-muted text-lg">{c.githubText}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: c.githubPersonal, href: "https://github.com/cpl121" },
                { label: c.githubCompany, href: "https://github.com/1to1-Digital-Solutions" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="oto-btn oto-btn--secondary"
                >
                  <Github size={18} aria-hidden="true" />
                  {link.label}
                  <span className="sr-only"> {t("srOpensInNewTab") as string}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-24" aria-hidden="true" />

      <Contact />
    </div>
  );
}
