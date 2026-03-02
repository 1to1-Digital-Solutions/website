"use client";

import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call for now
    setTimeout(() => {
      setStatus("success");
      // Reset after 3 seconds
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

        <form
          suppressHydrationWarning
          onSubmit={handleSubmit}
          className="border-foreground/10 bg-background/50 mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl border p-8 shadow-xl backdrop-blur-md md:p-12"
        >
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
                defaultValue=""
                className="border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary rounded-xl border p-3 focus:ring-1 focus:outline-none"
                placeholder="john@startup.com"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-foreground/80 text-sm font-medium">
                {t("contCompany")}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                defaultValue=""
                className="border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary rounded-xl border p-3 focus:ring-1 focus:outline-none"
                placeholder="Startup Inc."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-foreground/80 text-sm font-medium">
                {t("contBudget")}
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                defaultValue=""
                className="border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary rounded-xl border p-3 focus:ring-1 focus:outline-none"
                placeholder="$10k - $20k"
              />
            </div>
          </div>

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
                <option value="blockchain">{t("contOpt2")}</option>
                <option value="mixed-reality">{t("contOpt3")}</option>
                <option value="rescue">{t("contOpt4")}</option>
                <option value="other">{t("contOpt5")}</option>
              </select>
              <ChevronDown
                className="text-foreground/50 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                size={20}
              />
            </div>
          </div>

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
              placeholder="..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="group bg-primary text-background hover:bg-primary/90 mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "idle" && (
              <>
                {t("contBtnIdle")}{" "}
                <Send size={18} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
            {status === "loading" && t("contBtnLoading")}
            {status === "success" && t("contBtnSuccess")}
          </button>
        </form>
      </div>
    </section>
  );
}
