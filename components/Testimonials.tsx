import { Quote } from "lucide-react";
import { SectionHeading } from "@1to1/ui";
import { useLanguage } from "@/context/LanguageContext";

export function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t("test1Quote"),
      author: t("test1Author"),
      role: t("test1Role"),
    },
    {
      quote: t("test2Quote"),
      author: t("test2Author"),
      role: t("test2Role"),
    },
  ];

  return (
    <section id="testimonials" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-14">
        <SectionHeading
          title={t("testTitle1") as string}
          accent={t("testTitle2") as string}
          lead={t("testSub")}
        />
      </div>

      <div data-bolt-trigger className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {testimonials.map((test, idx) => (
          <div
            key={idx}
            data-bolt-card
            className="bg-anthracite border-border-default relative flex h-full flex-col overflow-hidden rounded-2xl border p-8"
          >
            {/* Decorative quote — primary-tinted, clipped to the bottom-right so it never sits under the text. */}
            <Quote
              aria-hidden="true"
              className="text-primary/15 pointer-events-none absolute -right-4 -bottom-4"
              size={120}
            />
            <p className="text-foreground/80 relative z-10 text-lg font-medium italic">
              {test.quote as string}
            </p>
            <div className="relative z-10 mt-auto pt-8">
              <p className="font-display text-foreground font-bold">{test.author as string}</p>
              <p className="text-primary text-sm">{test.role as string}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
