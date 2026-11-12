import { useRef, type ElementType, type MouseEvent, type ReactNode, type SyntheticEvent } from "react";
import { Check, ChevronDown, ShieldCheck, X } from "lucide-react";
import { cx } from "./utils";

/** Antetítulo en mono entre «<» y «>» (los signos los pone el CSS). Escríbelo en minúsculas. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("oto-eyebrow", className)}>{children}</p>;
}

/** Palabra clave entre los corchetes del logo. Solo en el H1. Cada corchete va pegado a su palabra. */
export function Bracketed({ children }: { children: string }) {
  const words = children.split(" ");
  const first = words[0];
  const last = words.length > 1 ? words[words.length - 1] : null;
  const middle = words.slice(1, -1).join(" ");
  return (
    <span className="oto-keyword">
      <span className="oto-nobr">
        <span className="oto-bracket" aria-hidden="true" />
        {first}
        {!last && <span className="oto-bracket oto-bracket--close" aria-hidden="true" />}
      </span>
      {last && (
        <>
          {middle ? ` ${middle} ` : " "}
          <span className="oto-nobr">
            {last}
            <span className="oto-bracket oto-bracket--close" aria-hidden="true" />
          </span>
        </>
      )}
    </span>
  );
}

export type HeroTitleProps = {
  /** La palabra clave entre corchetes, p. ej. «Entiende e integra». */
  keyword: string;
  /** El resto del titular. */
  rest: string;
  actions?: ReactNode;
  /** Brillo difuso de marca detrás (por defecto, sí). */
  glow?: boolean;
};

export function HeroTitle({ keyword, rest, actions, glow = true }: HeroTitleProps) {
  return (
    <section className="oto-hero" style={glow ? undefined : { ["--primary-300" as string]: "transparent" }}>
      <h1 className="oto-h1">
        <Bracketed>{keyword}</Bracketed> {rest}
      </h1>
      {actions && <div className="oto-hero__actions">{actions}</div>}
    </section>
  );
}

export type SectionHeadingProps = {
  eyebrow?: string;
  /** Primera parte del titular, en foreground. */
  title: string;
  /** Segunda parte, en primary. */
  accent?: string;
  lead?: ReactNode;
  as?: ElementType;
};

export function SectionHeading({ eyebrow, title, accent, lead, as: H = "h2" }: SectionHeadingProps) {
  return (
    <header className="oto-heading">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H className="oto-h2">
        {title} {accent && <span className="oto-accent">{accent}</span>}
      </H>
      {lead && <p className="oto-lead">{lead}</p>}
    </header>
  );
}

/** Bloque sin caja: chip de icono con trazo fino, título y una frase. Úsalo como <li> dentro de una rejilla. */
export function StakeCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <li className="oto-card">
      <span className="oto-icon-chip" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="oto-card__title">{title}</p>
        <p className="oto-card__text">{text}</p>
      </div>
    </li>
  );
}

export function ProcessSteps({ steps }: { steps: Array<{ title: string; text: string }> }) {
  return (
    <ol className="oto-steps">
      {steps.map((s, i) => (
        <li className="oto-step" key={s.title}>
          <span className="oto-step__num">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="oto-step__title">{s.title}</h3>
          <p className="oto-step__text">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export type ChecklistProps = {
  title: string;
  items: string[];
  /** yes: tarjeta positiva con borde verde. no: tarjeta neutra con X. */
  kind?: "yes" | "no";
};

export function Checklist({ title, items, kind = "yes" }: ChecklistProps) {
  return (
    <div className="oto-panel" style={kind === "no" ? { borderColor: "var(--border-default)", background: "transparent" } : undefined}>
      <h3 className="oto-panel__title">{title}</h3>
      <ul className="oto-checklist">
        {items.map((it) => (
          <li key={it}>
            <span className={cx("oto-check", kind === "no" && "oto-check--no")} aria-hidden="true">
              {kind === "no" ? <X /> : <Check strokeWidth={3} />}
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Accordion({ items }: { items: Array<{ question: string; answer: ReactNode }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const onToggle = (e: SyntheticEvent<HTMLDetailsElement>) => {
    if (!e.currentTarget.open) return;
    ref.current?.querySelectorAll("details").forEach((d) => {
      if (d !== e.currentTarget) d.open = false;
    });
  };
  return (
    <div className="oto-accordion" ref={ref}>
      {items.map((it, i) => (
        <details className="oto-accordion__item" key={it.question} open={i === 0} onToggle={onToggle}>
          <summary className="oto-accordion__q">
            {it.question}
            <ChevronDown aria-hidden="true" />
          </summary>
          <p className="oto-accordion__a">{it.answer}</p>
        </details>
      ))}
    </div>
  );
}

export type PriceCardProps = {
  eyebrow: string;
  amount: string;
  tax?: string;
  action: ReactNode;
  payment: ReactNode;
  includes?: ReactNode;
  guarantee?: ReactNode;
};

export function PriceCard({ eyebrow, amount, tax, action, payment, includes, guarantee }: PriceCardProps) {
  return (
    <div className="oto-price">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <p className="oto-price__amount">
          {amount} {tax && <span className="oto-price__tax">{tax}</span>}
        </p>
        <div style={{ marginTop: 24 }}>{action}</div>
      </div>
      <div className="oto-price__detail">
        <p className="oto-price__payment">{payment}</p>
        {includes && <p className="oto-price__includes">{includes}</p>}
        {guarantee && (
          <p className="oto-callout">
            <ShieldCheck aria-hidden="true" />
            <span>{guarantee}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export type CtaCardProps = {
  title: string;
  accent?: string;
  lead?: ReactNode;
  actions: ReactNode;
  note?: ReactNode;
};

/** Tarjeta de cierre con halo fijo y luz que sigue al cursor. */
export function CtaCard({ title, accent, lead, actions, note }: CtaCardProps) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className="oto-cta" onMouseMove={onMove}>
      <h2 className="oto-cta__title">
        {title} {accent && <span className="oto-accent">{accent}</span>}
      </h2>
      {lead && <p className="oto-lead">{lead}</p>}
      <div className="oto-cta__actions">{actions}</div>
      {note && <p className="oto-cta__note">{note}</p>}
    </div>
  );
}
