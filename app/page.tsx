"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { Services } from "@/components/Services";
import { SuccessCases } from "@/components/SuccessCases";
import { Testimonials } from "@/components/Testimonials";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";

// Skeleton placeholder shown while the ContactForm chunk hydrates.
// Mirrors the form's outer dimensions to prevent layout shift on swap.
function ContactFormSkeleton() {
  return (
    <section className="bg-anthracite/30 w-full py-24" aria-busy="true">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <div className="bg-foreground/10 mx-auto h-10 w-72 max-w-full animate-pulse rounded-md" />
          <div className="bg-foreground/5 mx-auto mt-4 h-5 w-96 max-w-full animate-pulse rounded-md" />
        </div>
        <div className="border-foreground/10 bg-background/50 mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl border p-8 shadow-xl backdrop-blur-md md:p-12">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-foreground/5 h-14 animate-pulse rounded-xl" />
            <div className="bg-foreground/5 h-14 animate-pulse rounded-xl" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-foreground/5 h-14 animate-pulse rounded-xl" />
            <div className="bg-foreground/5 h-14 animate-pulse rounded-xl" />
          </div>
          <div className="bg-foreground/5 h-32 animate-pulse rounded-xl" />
          <div className="bg-foreground/5 h-5 w-3/4 animate-pulse rounded-md" />
          <div className="bg-primary/40 h-14 animate-pulse rounded-xl" />
        </div>
      </div>
    </section>
  );
}

const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((mod) => ({ default: mod.ContactForm })),
  {
    ssr: false,
    loading: () => <ContactFormSkeleton />,
  }
);

export default function Home() {
  // Initial-load #hash scroll: Next.js App Router + client-side dynamic content + the
  // CSS `scroll-behavior: smooth` rule combine into a race where a smooth scroll-to-anchor
  // is interrupted by mid-flight layout work (font swap, ContactForm chunk load, GSAP
  // ScrollTrigger init when card-sections cross the viewport during the smooth scroll).
  // Fix: do a few instant jumps over the first 400 ms to catch any layout settling.
  // Each jump only disables the CSS smooth-scroll for a single microtask, so navbar
  // anchor clicks (and any other in-page nav) keep their smooth behavior.
  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;
    const hash = window.location.hash;
    const html = document.documentElement;

    const jump = () => {
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, top);
      // Restore on the next microtask: this call is instant, anything after is smooth again.
      Promise.resolve().then(() => {
        html.style.scrollBehavior = prev;
      });
    };

    jump();
    const raf = window.requestAnimationFrame(jump);
    const t1 = window.setTimeout(jump, 100);
    const t2 = window.setTimeout(jump, 400);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let observer: IntersectionObserver | undefined;

    // Dynamic import of GSAP + ScrollTrigger keeps ~45 KB of animation code out of the
    // initial bundle. We don't even kick it off until the first card-section is approaching
    // the viewport, so Hero / TechStackMarquee paint without competing for JS parse time.
    const init = async () => {
      const [gsapModule, stModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>("section:not(#home)");

        sections.forEach((section) => {
          gsap.fromTo(
            section.children,
            {
              y: prefersReducedMotion ? 0 : 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: prefersReducedMotion ? 0.4 : 0.7,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // Card Stacking Effect — skip if reduced motion (continuous scroll movement).
        if (!prefersReducedMotion) {
          const cards = gsap.utils.toArray<HTMLElement>(".card-section");

          cards.forEach((card, index) => {
            if (index === cards.length - 1) return;

            gsap.to(card, {
              scale: 0.88,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: () => (window.innerHeight < card.offsetHeight ? "bottom bottom" : "top top"),
                endTrigger: cards[index + 1],
                end: "top top",
                scrub: 0.4,
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                fastScrollEnd: true,
                preventOverlaps: true,
              },
            });
          });
        }
      });

      cleanup = () => ctx.revert();
    };

    const firstCard = document.querySelector<HTMLElement>(".card-section");
    if (!firstCard) {
      init();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer?.disconnect();
            init();
          }
        },
        { rootMargin: "300px" }
      );
      observer.observe(firstCard);
    }

    return () => {
      observer?.disconnect();
      cleanup?.();
    };
  }, []);

  // Persuasion arc: Services → Work → Testimonials → Process → FAQ → Contact.
  // About and the service details live on their own pages (/about, /services).
  return (
    <div className="bg-background flex flex-col overflow-hidden">
      <Hero />
      <TechStackMarquee />

      <div className="card-section bg-background relative z-10 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Services />
      </div>

      <div className="card-section bg-anthracite relative z-20 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <SuccessCases />
      </div>

      <div className="card-section bg-background relative z-30 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Testimonials />
      </div>

      <div className="card-section bg-anthracite relative z-40 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Process />
      </div>

      <div className="card-section bg-background relative z-50 w-full rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <FAQ />
      </div>

      <div
        id="contact"
        className="card-section bg-anthracite relative z-[60] w-full scroll-mt-24 rounded-t-[3rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        <ContactForm />
      </div>
    </div>
  );
}
