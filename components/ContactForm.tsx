"use client";

import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/components/GoogleAnalytics";
import { LEAD_LABELS, LEAD_OPTIONS, type LeadField } from "@/content/lead-options";
import { storedAttribution } from "@/lib/attribution";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
  privacy?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SELECT_CLASS =
  "border-foreground/10 bg-anthracite text-foreground focus:border-primary focus:ring-primary w-full cursor-pointer appearance-none rounded-xl border p-3 pr-10 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

/** Un desplegable opcional, sin nada elegido de entrada: no se ancla ninguna respuesta. */
function ChoiceSelect({
  field,
  label,
  optional,
  disabled,
}: {
  field: LeadField;
  label: string;
  optional?: string;
  disabled: boolean;
}) {
  const { t, lang } = useLanguage();
  const labels = LEAD_LABELS[lang][field] as Record<string, string>;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field} className="text-foreground/80 text-sm font-medium">
        {label}
        {optional && <span className="text-foreground/50 font-normal"> ({optional})</span>}
      </label>
      <div className="relative">
        <select
          id={field}
          name={field}
          defaultValue=""
          disabled={disabled}
          className={SELECT_CLASS}
        >
          <option value="">{t("contSelectPlaceholder") as string}</option>
          {LEAD_OPTIONS[field].map((value) => (
            <option key={value} value={value}>
              {labels[value]}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="text-foreground/70 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
          size={20}
        />
      </div>
    </div>
  );
}

export function ContactForm() {
  const { t, lang } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      projectType: String(data.get("projectType") || ""),
      tech: String(data.get("tech") || ""),
      timeline: String(data.get("timeline") || ""),
      source: String(data.get("source") || ""),
      message: String(data.get("message") || "").trim(),
      privacy: privacyAccepted,
      lang,
      attribution: storedAttribution(),
      website: String(data.get("website") || ""), // honeypot
    };

    // Client-side validation — mirrors server checks, with localized messages.
    const nextErrors: FieldErrors = {};
    if (!payload.name) nextErrors.name = t("contErrName") as string;
    if (!payload.email || !EMAIL_RE.test(payload.email)) {
      nextErrors.email = t("contErrEmail") as string;
    }
    if (!payload.message) nextErrors.message = t("contErrMessage") as string;
    if (!payload.privacy) nextErrors.privacy = t("contErrPrivacy") as string;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Move focus to the first invalid field for keyboard / SR users.
      const firstInvalid = (["name", "email", "message"] as const).find((k) => nextErrors[k]);
      if (firstInvalid) {
        const el = form.elements.namedItem(firstInvalid);
        if (el instanceof HTMLElement) el.focus();
      }
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        setPrivacyAccepted(false);
        trackEvent("form_submit", {
          form_id: "contact",
          project_type: payload.projectType,
          timeline: payload.timeline,
          source: payload.source,
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isBusy = status === "loading";
  const isDone = status === "success";
  const clearError = (field: keyof FieldErrors) => () =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  return (
    <section className="bg-anthracite/30 w-full py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl">
            {t("contactTitle1")} <span className="text-primary">{t("contactTitle2")}</span>
          </h2>
          <p className="text-foreground/70 mt-4 text-lg">{t("contactSub")}</p>
        </div>

        {/* Global status announcer for screen readers (success / submit error) */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {status === "success" && `${t("contBtnSuccess")} ${t("contSuccessNote")}`}
          {status === "error" && t("contErrorMsg")}
        </div>

        <form
          suppressHydrationWarning
          onSubmit={handleSubmit}
          noValidate
          className="border-foreground/10 bg-background/50 mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl border p-8 shadow-xl backdrop-blur-md md:p-12"
        >
          {/* Honeypot: invisible to humans, frequently filled by bots */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
            style={{ position: "absolute", left: "-9999px" }}
          >
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          {/* Row 1: Name + Email */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-foreground/80 text-sm font-medium">
                {t("contName")}{" "}
                <span className="text-primary" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                disabled={isBusy || isDone}
                defaultValue=""
                onChange={clearError("name")}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`bg-anthracite text-foreground focus:ring-primary rounded-xl border p-3 focus:ring-1 focus:outline-none disabled:opacity-60 ${
                  errors.name
                    ? "border-red-400 focus:border-red-400"
                    : "border-foreground/10 focus:border-primary"
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p id="name-error" role="alert" className="text-xs text-red-400">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-foreground/80 text-sm font-medium">
                {t("contEmail")}{" "}
                <span className="text-primary" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                spellCheck="false"
                disabled={isBusy || isDone}
                defaultValue=""
                onChange={clearError("email")}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`bg-anthracite text-foreground focus:ring-primary rounded-xl border p-3 focus:ring-1 focus:outline-none disabled:opacity-60 ${
                  errors.email
                    ? "border-red-400 focus:border-red-400"
                    : "border-foreground/10 focus:border-primary"
                }`}
                placeholder="john@startup.com"
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs text-red-400">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Rows 2-3: what, which tech, when, how they found us — all optional */}
          <div className="grid gap-6 md:grid-cols-2">
            <ChoiceSelect
              field="projectType"
              label={t("contType") as string}
              disabled={isBusy || isDone}
            />
            <ChoiceSelect
              field="tech"
              label={t("contTech") as string}
              disabled={isBusy || isDone}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ChoiceSelect
              field="timeline"
              label={t("contTimeline") as string}
              disabled={isBusy || isDone}
            />
            <ChoiceSelect
              field="source"
              label={t("contSource") as string}
              optional={t("contOptional") as string}
              disabled={isBusy || isDone}
            />
          </div>
          <p className="text-foreground/60 -mt-2 text-sm leading-relaxed">
            {t("contBudgetNote") as string}
          </p>

          {/* Row 3: Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-foreground/80 text-sm font-medium">
              {t("contMessage")}{" "}
              <span className="text-primary" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              disabled={isBusy || isDone}
              defaultValue=""
              onChange={clearError("message")}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`bg-anthracite text-foreground focus:ring-primary resize-none rounded-xl border p-3 focus:ring-1 focus:outline-none disabled:opacity-60 ${
                errors.message
                  ? "border-red-400 focus:border-red-400"
                  : "border-foreground/10 focus:border-primary"
              }`}
              placeholder={t("contMessagePlaceholder") as string}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="text-xs text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          {/* Privacy policy checkbox */}
          <div className="flex flex-col gap-1">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="privacy"
                required
                aria-required="true"
                aria-invalid={errors.privacy ? true : undefined}
                aria-describedby={errors.privacy ? "privacy-error" : undefined}
                checked={privacyAccepted}
                onChange={(e) => {
                  setPrivacyAccepted(e.target.checked);
                  if (e.target.checked) clearError("privacy")();
                }}
                disabled={isBusy || isDone}
                className="accent-primary mt-0.5 h-4 w-4 shrink-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <span className="text-foreground/80 text-sm">
                {t("contPrivacy")}{" "}
                <span className="text-primary" aria-hidden="true">
                  *
                </span>{" "}
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary underline-offset-2 transition-colors hover:underline"
                >
                  {t("footPrivacy")}
                </Link>
              </span>
            </label>
            {errors.privacy && (
              <p id="privacy-error" role="alert" className="text-xs text-red-400">
                {errors.privacy}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isBusy || isDone || !privacyAccepted}
            className="group bg-primary hover:bg-primary/90 focus-visible:ring-primary mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4 font-bold text-[var(--on-primary)] transition-all focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
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
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {t("contBtnLoading")}
              </span>
            )}
            {status === "success" && t("contBtnSuccess")}
            {status === "error" && t("contBtnError")}
          </button>

          {status === "success" && (
            <p className="text-foreground/80 border-primary/30 bg-primary/5 rounded-xl border p-4 text-center text-sm leading-relaxed">
              {t("contSuccessNote") as string}
            </p>
          )}

          {status === "error" && (
            <p role="alert" className="mt-3 text-center text-sm text-red-400">
              {t("contErrorMsg") as string}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
