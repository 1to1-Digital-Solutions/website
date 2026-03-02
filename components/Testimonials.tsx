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
    {
      quote: t("test3Quote"),
      author: t("test3Author"),
      role: t("test3Role"),
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

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((test, idx) => (
          <div
            key={idx}
            className="bg-anthracite/50 border-foreground/5 relative rounded-2xl border p-8 shadow-sm"
          >
            <Quote className="text-foreground/10 absolute top-6 right-6" size={48} />
            <p className="text-foreground/80 relative z-10 mb-8 text-lg font-medium italic">
              {test.quote as string}
            </p>
            <div className="relative z-10">
              <p className="font-outfit text-foreground font-bold">{test.author as string}</p>
              <p className="text-primary text-sm">{test.role as string}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
