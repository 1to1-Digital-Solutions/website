import type { ReactNode } from "react";
import { cx } from "../components/utils";

export type MaterialFormat = "carousel" | "square" | "post" | "slide";

export const MATERIAL_SIZES: Record<MaterialFormat, { width: number; height: number }> = {
  carousel: { width: 1080, height: 1350 },
  square: { width: 1080, height: 1080 },
  post: { width: 1200, height: 627 },
  slide: { width: 1920, height: 1080 },
};

export type MaterialProps = {
  format: MaterialFormat;
  /** Cada pieza fija su tema, sin depender del de la página. */
  theme?: "dark" | "light";
  /** Brillo difuso de marca arriba (portadas). */
  glow?: boolean;
  /** Ruta del isotipo para el pie (isotipo-on-dark / -on-light). */
  isotipo?: string;
  /** Texto del pie a la izquierda, junto al isotipo. */
  brand?: string;
  /** Contador o número de página a la derecha del pie («01/06»). */
  counter?: string;
  children: ReactNode;
};

/** Lienzo a tamaño real de exportación (px). Para verlo reducido, envuélvelo en <MaterialPreview>. */
export function Material({
  format,
  theme = "dark",
  glow,
  isotipo,
  brand = "1to1digital.solutions",
  counter,
  children,
}: MaterialProps) {
  return (
    <div className={cx("oto-mat", `oto-mat--${format}`, `oto-mat--${theme}`, glow && "oto-mat--glow")}>
      {children}
      <div className="oto-mat__footer">
        <span className="oto-mat__brand">
          {isotipo && <img src={isotipo} alt="" />}
          {brand}
        </span>
        {counter && <span>{counter}</span>}
      </div>
    </div>
  );
}

/** Muestra un material escalado (para Storybook o una vista previa en una app). */
export function MaterialPreview({ format, scale = 0.25, children }: { format: MaterialFormat; scale?: number; children: ReactNode }) {
  const { width, height } = MATERIAL_SIZES[format];
  return (
    <div style={{ width: width * scale, height: height * scale, overflow: "hidden", borderRadius: 8, flex: "none" }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "0 0" }}>{children}</div>
    </div>
  );
}

export const MatEyebrow = ({ children }: { children: ReactNode }) => <p className="oto-mat__eyebrow">{children}</p>;
export const MatTitle = ({ children }: { children: ReactNode }) => <h1 className="oto-mat__title">{children}</h1>;
export const MatSubtitle = ({ children }: { children: ReactNode }) => <h2 className="oto-mat__subtitle">{children}</h2>;
export const MatText = ({ children }: { children: ReactNode }) => <p className="oto-mat__text">{children}</p>;
export const MatNumber = ({ n }: { n: number }) => <span className="oto-mat__num">{String(n).padStart(2, "0")}</span>;

export type DocPageProps = {
  /** Título del documento para la cabecera (no se muestra en la portada). */
  docTitle?: string;
  isotipo?: string;
  page?: number;
  total?: number;
  cover?: boolean;
  children: ReactNode;
};

/** Página A4 (210×297 mm) siempre en claro. Varias seguidas = un PDF al imprimir. */
export function DocPage({ docTitle, isotipo, page, total, cover, children }: DocPageProps) {
  return (
    <section className="oto-doc">
      {!cover && docTitle && (
        <div className="oto-doc__header">
          <span>
            {isotipo && <img src={isotipo} alt="" />}
            {docTitle}
          </span>
          {page && <span>{String(page).padStart(2, "0")}</span>}
        </div>
      )}
      {cover ? <div className="oto-doc__cover">{children}</div> : children}
      <div className="oto-doc__footer">
        {cover && isotipo ? <img src={isotipo} alt="" style={{ width: "9mm", height: "9mm" }} /> : <span />}
        <span>
          1to1digital.solutions{page && total ? ` · ${page} / ${total}` : ""}
        </span>
      </div>
    </section>
  );
}
