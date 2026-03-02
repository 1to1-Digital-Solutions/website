"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Loader } from "@react-three/drei";
import { HeroCanvas } from "./canvas/HeroCanvas";
import { useLanguage } from "@/context/LanguageContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(".hero-text-line", { y: 50, opacity: 0 });
      gsap.set(".hero-btn", { scale: 0.8, opacity: 0 });

      // Create entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-text-line", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        delay: 0.2, // Small delay to let the page load
      }).to(
        ".hero-btn",
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.4" // Start before the text finishes
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-background relative flex h-[100dvh] w-full items-center justify-center overflow-hidden"
    >
      {/* Subtle primary background blob */}
      <div className="bg-primary/20 pointer-events-none absolute top-1/2 left-1/2 z-0 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] md:h-[40vw] md:w-[40vw]" />

      {/* 3D Canvas Background (Now interactive over the whole screen) */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Foreground Content */}
      <div
        ref={textRef}
        className="pointer-events-none z-10 flex h-full w-full flex-col justify-center px-6 text-center"
      >
        {/* Massive HTML Title (Replacing 3D Text) */}
        <div className="pointer-events-none select-none">
          <h1 className="hero-text-line font-outfit text-foreground mx-auto max-w-5xl text-4xl font-black tracking-tighter drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] sm:text-5xl md:text-7xl">
            {t("heroTitle1")} <br />
            <span className="from-primary to-primary/50 bg-gradient-to-r bg-clip-text text-transparent">
              {t("heroTitle2")}
            </span>
          </h1>
          <p className="hero-text-line text-foreground/80 pointer-events-none mx-auto mt-6 max-w-2xl text-base font-medium drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] md:text-lg">
            {t("heroSub")}
          </p>
        </div>

        {/* Buttons raised up to be close to text */}
        <div className="hero-btn pointer-events-none mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="bg-primary/90 text-background hover:bg-primary pointer-events-auto rounded-full px-8 py-4 text-lg font-bold backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(64,224,208,0.4)]"
          >
            {t("heroBtnStart")}
          </a>
          <a
            href="#work"
            className="border-foreground/20 bg-background/50 hover:bg-foreground/5 hover:text-primary hover:border-primary/50 pointer-events-auto rounded-full border px-8 py-4 text-lg font-bold backdrop-blur-md transition-all"
          >
            {t("heroBtnWork")}
          </a>
        </div>
      </div>
      <Loader
        containerStyles={{ background: "#0a0a0a", zIndex: 50 }}
        innerStyles={{ width: "300px" }}
        barStyles={{ background: "#40E0D0", height: "4px" }}
        dataStyles={{ color: "#ededed", fontFamily: "Outfit", fontSize: "14px" }}
      />
    </section>
  );
}
