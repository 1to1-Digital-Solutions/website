import { Check, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";
import { HOME } from "@/content/home";

/** Home block: who the mentoring is for and who it is not for. Detail on /services. */
export function ForWho({
  className = "py-24",
  heading = true,
}: {
  className?: string;
  heading?: boolean;
}) {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];

  return (
    <section id="for-who" className={`mx-auto w-full max-w-6xl px-6 ${className}`}>
      {heading && (
        <div className="mb-14 text-center">
          <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
            {HOME[lang].forWhoTitle1}
            <span className="text-primary">{HOME[lang].forWhoTitle2}</span>
          </h2>
          <p className="text-foreground/70 mx-auto mt-4 max-w-2xl text-lg">
            {HOME[lang].forWhoSub}
          </p>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border-primary/30 bg-anthracite/50 rounded-3xl border p-8">
          <h3 className="font-outfit text-2xl font-bold tracking-tight">{c.forWhoTitle}</h3>
          <p className="text-foreground/80 mt-6 flex items-start gap-3 text-lg leading-relaxed">
            <Check size={22} aria-hidden="true" className="text-primary mt-1 shrink-0" />
            <span>{c.forWho[0]}</span>
          </p>
        </div>
        <div className="border-foreground/10 bg-anthracite/50 rounded-3xl border p-8">
          <h3 className="font-outfit text-2xl font-bold tracking-tight">{c.notForTitle}</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {c.notFor.map((item) => (
              <li key={item} className="text-foreground/80 flex items-start gap-3 leading-relaxed">
                <X size={20} aria-hidden="true" className="text-foreground/50 mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
