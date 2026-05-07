"use client";

import { Send, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export function ContactForm() {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="bg-anthracite/30 w-full py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
            {t("contactTitle1")} <span className="text-primary">{t("contactTitle2")}</span>
          </h2>
          <p className="text-foreground/70 mt-4 text-lg">{t("contactSub")}</p>
        </div>

        <form
          suppressHydrationWarning
          onSubmit={handleSubmit}
          className="border-foreground/10 bg-background/50 mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl border p-8 shadow-xl backdrop-blur-md md:p-12"
        >
          {/* Row 1: Name + Email */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-foreground/80 text-sm font-medium">
                {t("contName")} <span className="text-primary" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                defaultValue=""
                className="border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary rounded-xl border p-3 focus:ring-1 focus:outline-none"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-foreground/80 text-sm font-medium">
                {t("contEmail")} <span className="text-primary" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                spellCheck="false"
                defaultValue=""
                className="border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary rounded-xl border p-3 focus:ring-1 focus:outline-none"
                placeholder="john@startup.com"
              />
            </div>
          </div>

          {/* Row 2: Project Type + Budget */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="project" className="text-foreground/80 text-sm font-medium">
                {t("contType")}
              </label>
              <div className="relative">
                <select
                  id="project"
                  name="project"
                  defaultValue="mvp"
                  className="border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary w-full cursor-pointer appearance-none rounded-xl border p-3 pr-10 focus:ring-1 focus:outline-none"
                >
                  <option value="mvp">{t("contOpt1")}</option>
                  <option value="rescue">{t("contOpt2")}</option>
                  <option value="blockchain">{t("contOpt3")}</option>
                  <option value="xr">{t("contOpt4")}</option>
                </select>
                <ChevronDown
                  className="text-foreground/50 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                  size={20}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-foreground/80 text-sm font-medium">
                {t("contBudget")}
              </label>
              <div className="relative">
                <select
                  id="budget"
                  name="budget"
                  defaultValue="<5"
                  className="border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary w-full cursor-pointer appearance-none rounded-xl border p-3 pr-10 focus:ring-1 focus:outline-none"
                >
                  <option value="<5">{t("contBudOptUnder5")}</option>
                  <option value="5-10">{t("contBudOpt5to10")}</option>
                  <option value="10-15">{t("contBudOpt1")}</option>
                  <option value="15-20">{t("contBudOpt2")}</option>
                  <option value="20-30">{t("contBudOpt3")}</option>
                  <option value=">30">{t("contBudOpt4")}</option>
                </select>
                <ChevronDown
                  className="text-foreground/50 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-foreground/80 text-sm font-medium">
              {t("contMessage")} <span className="text-primary" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              defaultValue=""
              className="border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary resize-none rounded-xl border p-3 focus:ring-1 focus:outline-none"
              placeholder={t("contMessagePlaceholder") as string}
            />
          </div>

          {/* Privacy policy checkbox */}
          <label className="flex cursor-pointer items-start gap-3" aria-required="true">
            <input
              type="checkbox"
              name="privacy"
              required
              className="accent-primary mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
            />
            <span className="text-foreground/60 text-sm">
              {t("contPrivacy")}{" "}
              <span className="text-primary" aria-hidden="true">*</span>{" "}
              <Link
                href="/privacy-policy"
                className="hover:text-primary underline-offset-2 transition-colors hover:underline"
              >
                {t("footPrivacy")}
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled
            aria-disabled="true"
            className="group bg-primary text-background mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t("contBtnIdle")}{" "}
            <Send size={18} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
