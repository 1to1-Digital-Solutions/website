import { Check, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MENTORSHIP } from "@/content/services";

/** Home block: who the mentoring is for and who it is not for. Detail on /services. */
export function ForWho({ className = "py-24" }: { className?: string }) {
  const { lang } = useLanguage();
  const c = MENTORSHIP[lang];

  return (
    <section id="for-who" className={`mx-auto w-full max-w-6xl px-6 ${className}`}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border-primary/30 bg-anthracite/50 rounded-3xl border p-8">
          <h2 className="font-outfit text-3xl font-bold tracking-tight">{c.forWhoTitle}</h2>
          <p className="text-foreground/80 mt-6 flex items-start gap-3 text-lg leading-relaxed">
            <Check size={22} aria-hidden="true" className="text-primary mt-1 shrink-0" />
            <span>{c.forWho[0]}</span>
          </p>
        </div>
        <div className="border-foreground/10 bg-anthracite/50 rounded-3xl border p-8">
          <h2 className="font-outfit text-3xl font-bold tracking-tight">{c.notForTitle}</h2>
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
