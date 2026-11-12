"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import { Bracketed } from "@1to1/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

// three.js stays out of the initial bundle: the cloud fades in once its chunk arrives.
const HeroParticles = dynamic(
  () => import("./canvas/HeroParticles").then((m) => ({ default: m.HeroParticles })),
  { ssr: false }
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { theme } = useTheme();

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Reduced motion: simple fade-in, no movement
        gsap.set([".hero-text-line", ".hero-btn"], { opacity: 0 });
        gsap.to([".hero-text-line", ".hero-btn"], {
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.1,
        });
        return;
      }

      // Full animation: slide up + scale in
      gsap.set(".hero-text-line", { y: 50, opacity: 0 });
      gsap.set(".hero-btn", { scale: 0.8, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-text-line", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        delay: 0.2,
      }).to(
        ".hero-btn",
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-background relative flex h-[100dvh] w-full items-center justify-center overflow-hidden"
    >
      {/* The brand glow (primary-300 at 15%) behind the cloud: the only gradient of the brand. */}
      <div className="bg-primary-300/15 pointer-events-none absolute top-1/2 left-1/2 z-0 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] lg:left-[72%] lg:h-[38vw] lg:w-[38vw]" />

      {/* Point cloud that reacts to the cursor. Decorative: hidden from the a11y tree. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroParticles theme={theme} />
      </div>

      {/* Foreground: centred on small screens, on the left next to the cloud on wide ones */}
      <div
        ref={textRef}
        className="pointer-events-none z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 text-center lg:items-start lg:text-left"
      >
        <div className="pointer-events-none select-none lg:max-w-[56%]">
          {/* The keyword sits between the brackets of the logo: the only heading that has them. */}
          <h1 className="hero-text-line font-display text-foreground mx-auto max-w-5xl text-4xl leading-none font-black tracking-[-0.04em] [word-spacing:0.08em] sm:text-5xl md:text-7xl lg:mx-0 lg:text-6xl xl:text-7xl">
            <Bracketed>{t("heroKeyword") as string}</Bracketed> {t("heroTitleRest")}
          </h1>
          <p className="hero-text-line text-text-muted pointer-events-none mx-auto mt-6 max-w-2xl text-base md:text-lg lg:mx-0">
            {t("heroSub")}
          </p>
        </div>

        <div className="hero-btn pointer-events-none mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
          <a href="#contact" className="oto-btn oto-btn--primary oto-btn--lg pointer-events-auto">
            {t("heroBtnStart")}
            <span className="oto-btn__arrow" aria-hidden="true">
              <ChevronRight />
            </span>
          </a>
          <a href="#process" className="oto-btn oto-btn--secondary oto-btn--lg pointer-events-auto">
            {t("heroBtnWork")}
          </a>
        </div>
      </div>
    </section>
  );
}
