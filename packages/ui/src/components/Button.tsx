import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "./utils";

type Common = {
  /** primary: acción principal (una por bloque). secondary: alternativa. neon: solo el «Hablemos» del navbar. danger: acción destructiva. */
  variant?: "primary" | "secondary" | "neon" | "danger";
  size?: "sm" | "md" | "lg";
  /** Icono de Lucide a la izquierda (canal: LinkedIn, correo…). */
  icon?: ReactNode;
  /** Muestra el «>» de «seguir», que se desplaza al pasar el ratón. */
  arrow?: boolean;
  /** Estado de carga: spinner, aria-busy y sin más clics. Pasa el texto en gerundio («Enviando…»). */
  loading?: boolean;
  children: ReactNode;
};

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
export type ButtonProps = AsButton | AsLink;

export function Button({
  variant = "primary",
  size = "md",
  icon,
  arrow,
  loading,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cx(
    "oto-btn",
    `oto-btn--${variant}`,
    size !== "md" && `oto-btn--${size}`,
    className,
  );
  const content = (
    <>
      {loading ? <span className="oto-spinner" aria-hidden="true" /> : icon}
      {children}
      {arrow && !loading && (
        <span className="oto-btn__arrow" aria-hidden="true">
          <ChevronRight />
        </span>
      )}
    </>
  );
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...a } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} href={href} aria-busy={loading || undefined} {...a}>
        {content}
      </a>
    );
  }
  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} aria-busy={loading || undefined} {...b}>
      {content}
    </button>
  );
}
