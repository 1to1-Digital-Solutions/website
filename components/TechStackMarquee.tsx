"use client";

import { Code2, Cpu, Database, Layout, Smartphone, Blocks, MonitorPlay, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function TechStackMarquee() {
  const { t } = useLanguage();

  const technologies = [
    { name: "React", icon: Layout },
    { name: "Next.js", icon: Zap },
    { name: "Typescript", icon: Code2 },
    { name: "Three.js", icon: MonitorPlay },
    { name: "Ethereum", icon: Blocks },
    { name: "Solidity", icon: Database },
    { name: "Node.js", icon: Cpu },
    { name: "WebXR", icon: Smartphone },
  ];

  // Two copies for seamless infinite loop (-50% is exact)
  const scrollItems = [...technologies, ...technologies];

  return (
    <div className="border-foreground/5 bg-anthracite/20 relative w-full overflow-hidden border-y py-10">
      <div className="from-background absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent md:w-48" />
      <div className="from-background absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent md:w-48" />

      <p className="text-foreground/50 mb-6 text-center text-sm font-bold tracking-widest uppercase">
        {t("techStackTitle")}
      </p>

      <div className="animate-marquee flex w-fit items-center gap-12 sm:gap-24">
        {scrollItems.map((tech, idx) => (
          <div
            key={idx}
            className="flex min-w-max items-center gap-3 opacity-60 transition-opacity hover:opacity-100"
          >
            <tech.icon size={28} aria-hidden="true" className="text-primary" />
            <span className="font-outfit text-xl font-medium tracking-wide">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
