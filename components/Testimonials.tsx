import { Quote } from "lucide-react";
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
      <div className="mb-16 text-center">
        <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
          {t("testTitle1")} <span className="text-primary">{t("testTitle2")}</span>
        </h2>
        <p className="text-foreground/70 mt-4 text-lg">{t("testSub")}</p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {testimonials.map((test, idx) => (
          <div
            key={idx}
            className="bg-anthracite/50 border-foreground/5 relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 shadow-sm"
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
              <p className="font-outfit text-foreground font-bold">{test.author as string}</p>
              <p className="text-primary text-sm">{test.role as string}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
