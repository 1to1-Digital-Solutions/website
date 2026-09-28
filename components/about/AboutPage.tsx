"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ABOUT } from "@/content/about";
import { PageCta } from "@/components/PageCta";

export function AboutPage() {
  const { lang } = useLanguage();
  const c = ABOUT[lang];

  return (
    <div className="bg-background w-full pt-32">
      {/* Presentación */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="relative w-full flex-1">
            <div className="bg-anthracite/80 relative aspect-square w-full max-w-md overflow-hidden rounded-3xl">
              <Image
                src="/images/profilePicture.jpg"
                alt={c.imgAlt}
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover object-top"
                priority
              />
              <div className="from-primary/20 absolute inset-0 bg-linear-to-tr to-transparent mix-blend-overlay" />
            </div>
            <div className="bg-primary/20 absolute -right-6 -bottom-6 -z-10 h-64 w-64 rounded-full blur-3xl" />
          </div>

          <div className="flex-1">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">
              {c.eyebrow}
            </p>
            <h1 className="font-outfit mt-3 text-5xl font-bold tracking-tight md:text-6xl">
              {c.title1}
              <span className="text-primary">{c.title2}</span>
            </h1>
            <p className="text-foreground/80 mt-6 text-lg leading-relaxed md:text-xl">{c.intro}</p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {c.stats.map((stat) => (
                <div
                  key={stat.value}
                  className="border-foreground/10 bg-anthracite/50 flex flex-col rounded-2xl border p-5"
                >
                  <dt className="text-foreground/70 order-2 mt-1 text-sm leading-snug">
                    {stat.label}
                  </dt>
                  <dd className="font-outfit text-primary order-1 text-2xl font-bold">
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
          <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
            {c.pathTitle}
          </h2>
          <ol className="border-primary/30 mt-10 flex flex-col gap-10 border-l pl-8">
            {c.path.map((step) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="bg-primary ring-anthracite absolute top-1.5 -left-[2.4rem] h-3 w-3 rounded-full ring-4"
                />
                <h3 className="font-outfit text-xl font-semibold">{step.title}</h3>
                <p className="text-foreground/75 mt-2 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cómo trabajo y por qué */}
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
            {c.howTitle}
          </h2>
          <div className="text-foreground/80 mt-6 flex flex-col gap-4 text-lg leading-relaxed">
            {c.how.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-outfit text-3xl font-bold tracking-tight md:text-4xl">
            {c.whyTitle}
          </h2>
          <div className="text-foreground/80 mt-6 flex flex-col gap-4 text-lg leading-relaxed">
            {c.why.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title={c.ctaTitle}
        text={c.ctaText}
        primary={{ label: c.ctaButton, href: "/#contact" }}
        secondary={{ label: c.ctaServices, href: "/services" }}
      />
    </div>
  );
}
