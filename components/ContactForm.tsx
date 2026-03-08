"use client";

import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call for now
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
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

        {/* Status announcer for screen readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {status === "success" && t("contBtnSuccess")}
          {status === "error" && t("contErrorMsg")}
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
                {t("contName")}
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
                {t("contEmail")}
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
                  defaultValue="10-15"
                  className="border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary w-full cursor-pointer appearance-none rounded-xl border p-3 pr-10 focus:ring-1 focus:outline-none"
                >
                  <option value="<10">{t("contBudOpt1")}</option>
                  <option value="10-15">{t("contBudOpt2")}</option>
                  <option value="15-20">{t("contBudOpt3")}</option>
                  <option value=">20">{t("contBudOpt4")}</option>
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
              {t("contMessage")}
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
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="privacy"
              required
              className="accent-primary mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
            />
            <span className="text-foreground/60 text-sm">
              {t("contPrivacy")}{" "}
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
            disabled={status === "loading" || status === "success"}
            className="group bg-primary text-background hover:bg-primary/90 focus-visible:ring-primary mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4 font-bold transition-all focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "idle" && (
              <>
                {t("contBtnIdle")}{" "}
                <Send size={18} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
            {status === "loading" && (
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t("contBtnLoading")}
              </span>
            )}
            {status === "success" && t("contBtnSuccess")}
          {status === "error" && t("contBtnError")}
          </button>

          {status === "error" && (
            <p role="alert" className="text-red-400 mt-3 text-center text-sm">
              {t("contErrorMsg") as string}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
