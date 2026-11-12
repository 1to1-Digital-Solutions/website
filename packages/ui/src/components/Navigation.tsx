import { useId, useState, type ButtonHTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { cx } from "./utils";

export type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Icono de Lucide a 14px. Si no hay texto, el botón es cuadrado (30×30) y necesita aria-label. */
  icon?: ReactNode;
  children?: ReactNode;
};

/** Botón pequeño con borde para tema o idioma. */
export function Toggle({ icon, children, className, ...rest }: ToggleProps) {
  return (
    <button type="button" className={cx("oto-toggle", !children && "oto-toggle--icon", className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}

export type NavLink = { href: string; label: string; current?: boolean };

export type NavbarProps = {
  /** El logo (normalmente un <a> a la portada con logo-negative / logo-positive). */
  logo: ReactNode;
  links: NavLink[];
  /** Toggles de tema e idioma. */
  toggles?: ReactNode;
  /** El único CTA del navbar, siempre neón. */
  cta: { href: string; label: string };
};

/** Barra flotante con esquinas de 10px. El neón del CTA es el único color de la barra. */
export function Navbar({ logo, links, toggles, cta }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const list = (
    <ul className="oto-nav__links">
      {links.map((l) => (
        <li key={l.href}>
          <a className="oto-nav__link" href={l.href} aria-current={l.current ? "page" : undefined}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
  return (
    <nav className="oto-nav" aria-label="Principal">
      <div className="oto-nav__inner">
        {logo}
        <div className="oto-nav__right">
          {list}
          {toggles}
          <a className="oto-btn oto-btn--neon oto-btn--sm" href={cta.href}>
            {cta.label}
          </a>
        </div>
        <div className="oto-nav__mobile">
          {toggles}
          <button
            className="oto-nav__menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className="oto-nav__panel" id={panelId} hidden={!open}>
        {list}
        <a className="oto-btn oto-btn--neon" href={cta.href}>
          {cta.label}
        </a>
      </div>
    </nav>
  );
}

export type TabsProps = {
  tabs: Array<{ id: string; label: string }>;
  value: string;
  onChange: (id: string) => void;
  label: string;
};

/** Pestañas subrayadas con navegación por flechas. Cada panel lleva role="tabpanel" e id `${id}-panel`. */
export function Tabs({ tabs, value, onChange, label }: TabsProps) {
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = tabs[(i + d + tabs.length) % tabs.length];
    onChange(next.id);
    (e.currentTarget.parentElement?.querySelector(`[data-tab="${next.id}"]`) as HTMLElement | null)?.focus();
  };
  return (
    <div className="oto-tabs" role="tablist" aria-label={label}>
      {tabs.map((t, i) => (
        <button
          key={t.id}
          data-tab={t.id}
          className="oto-tab"
          role="tab"
          type="button"
          id={`${t.id}-tab`}
          aria-controls={`${t.id}-panel`}
          aria-selected={t.id === value}
          tabIndex={t.id === value ? 0 : -1}
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
