"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/Hero";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { AboutMe } from "@/components/AboutMe";
import { SuccessCases } from "@/components/SuccessCases";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import dynamic from "next/dynamic";

// Force client-side only rendering to bypass hydration mismatch from browser extensions
const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((mod) => ({ default: mod.ContactForm })),
  { ssr: false }
);

export default function Home() {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance animations for children
      const sections = gsap.utils.toArray<HTMLElement>("section:not(#home)");

      sections.forEach((section) => {
        gsap.fromTo(
          section.children,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Card Stacking Effect
      // We wrap the components in a .card-section class to easily target them
      const cards = gsap.utils.toArray<HTMLElement>(".card-section");

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Don't scale down the last card

        gsap.to(card, {
          scale: 0.85,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: () => (window.innerHeight < card.offsetHeight ? "bottom bottom" : "top top"), // Scroll fully before pin if tall
            endTrigger: cards[index + 1],
            end: "top top", // Until the next card reaches the top
            scrub: true,
            pin: true,
            pinSpacing: false, // Allows the next card to overlap
            invalidateOnRefresh: true, // Recalculate on resize
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // We wrap layout sections in .card-section. They need a solid background and height.
  // Using min-h-screen guarantees it looks like a full card stacking up.
  // We leave Hero out of the stacking wrapper if we want it to just scroll away naturally,
  // or we can include it. Let's include everything after Hero in stacking cards.

  return (
    <div className="bg-background flex flex-col overflow-hidden">
      <Hero />
      <TechStackMarquee />

      <div className="card-section bg-background relative z-10 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Process />
      </div>

      <div className="card-section bg-anthracite relative z-20 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Services />
      </div>

      <div className="card-section bg-background relative z-30 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <SuccessCases />
      </div>

      <div className="card-section bg-anthracite relative z-40 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <AboutMe />
      </div>

      <div className="card-section bg-background relative z-50 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Testimonials />
      </div>

      <div className="card-section bg-anthracite relative z-[60] w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <FAQ />
      </div>

      <div className="card-section bg-background relative z-[70] w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <ContactForm />
      </div>
    </div>
  );
}
