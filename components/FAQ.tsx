"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("faq1Q"),
      answer: t("faq1A"),
    },
    {
      question: t("faq2Q"),
      answer: t("faq2A"),
    },
    {
      question: t("faq3Q"),
      answer: t("faq3A"),
    },
    {
      question: t("faq4Q"),
      answer: t("faq4A"),
    },
  ];

  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-3xl px-6 py-24"
    >
      <div className="mb-12 text-center">
        <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
          {t("faqTitle1")} <span className="text-primary">{t("faqTitle2")}</span>
        </h2>
        <p className="text-foreground/70 mt-4 text-lg">{t("faqSub")}</p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isOpen
                  ? "border-primary/50 bg-anthracite/50"
                  : "border-foreground/10 bg-background hover:bg-anthracite/30"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-outfit text-lg font-semibold md:text-xl">
                  {faq.question as string}
                </span>
                <ChevronDown
                  className={`text-primary transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={24}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-foreground/70 px-6 pb-6">{faq.answer as string}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
