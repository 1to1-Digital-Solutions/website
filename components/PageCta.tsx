import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaCard } from "@/components/CtaCard";

type Props = {
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing block of the inner pages: a question, one line and the way to the form. */
export function PageCta({ title, text, primary, secondary }: Props) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-24">
      <CtaCard>
        <h2 className="font-outfit relative text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="text-foreground/70 relative mx-auto mt-4 max-w-2xl text-lg">{text}</p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={primary.href}
            className="group bg-primary focus-visible:ring-primary focus-visible:ring-offset-background inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-[var(--on-primary)] transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {primary.label}
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="border-foreground/20 hover:bg-foreground/5 focus-visible:ring-primary rounded-full border px-7 py-3 font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </CtaCard>
    </section>
  );
}
