"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { Loader } from "@react-three/drei";
import { useLanguage } from "@/context/LanguageContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { HeroMobileBackground } from "@/components/HeroMobileBackground";

const HeroCanvas = dynamic(
  () => import("./canvas/HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false }
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
      {/* Subtle primary background blob */}
      <div className="bg-primary/20 pointer-events-none absolute top-1/2 left-1/2 z-0 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] md:h-[40vw] md:w-[40vw]" />

      {/* Background: CSS on mobile (no Three.js loaded), canvas on desktop */}
      <div className="absolute inset-0 z-0">
        {isDesktop ? <HeroCanvas /> : <HeroMobileBackground />}
      </div>

      {/* Foreground Content */}
      <div
        ref={textRef}
        className="pointer-events-none z-10 flex h-full w-full flex-col justify-center px-6 text-center"
      >
        {/* Massive HTML Title (Replacing 3D Text) */}
        <div className="pointer-events-none select-none">
          <h1 className="hero-text-line font-outfit text-foreground mx-auto max-w-5xl text-4xl font-black tracking-tighter drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)] sm:text-5xl md:text-7xl dark:drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
            {t("heroTitle1")} <br />
            <span className="from-primary to-primary/50 bg-gradient-to-r bg-clip-text text-transparent">
              {t("heroTitle2")}
            </span>
          </h1>
          <p className="hero-text-line text-foreground/80 pointer-events-none mx-auto mt-6 max-w-2xl text-base font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.08)] md:text-lg dark:drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
            {t("heroSub")}
          </p>
        </div>

        {/* Buttons raised up to be close to text */}
        <div className="hero-btn pointer-events-none mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="bg-primary/90 text-background hover:bg-primary focus-visible:ring-primary focus-visible:ring-offset-background pointer-events-auto rounded-full px-8 py-4 text-lg font-bold backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(64,224,208,0.4)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t("heroBtnStart")}
          </a>
          <a
            href="#work"
            className="border-foreground/20 bg-background/50 hover:bg-foreground/5 hover:text-primary hover:border-primary/50 focus-visible:ring-primary focus-visible:ring-offset-background pointer-events-auto rounded-full border px-8 py-4 text-lg font-bold backdrop-blur-md transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t("heroBtnWork")}
          </a>
        </div>
      </div>
      {isDesktop && (
        <Loader
          containerStyles={{ background: "#27272a", zIndex: 50 }}
          innerStyles={{ width: "300px" }}
          barStyles={{ background: "#1f957a", height: "4px" }}
          dataStyles={{ color: "#ededed", fontFamily: "Outfit", fontSize: "14px" }}
        />
      )}
    </section>
  );
}
