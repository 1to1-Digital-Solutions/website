import { useEffect, useId, useRef, type ReactNode } from "react";
import { AlertCircle, AlertTriangle, CircleCheck, Info, X } from "lucide-react";
import { cx, type Tone } from "./utils";

const ICONS = {
  success: CircleCheck,
  warning: AlertTriangle,
  danger: AlertCircle,
  info: Info,
  neutral: Info,
} as const;

/** Píldora de estado. La palabra dice el estado; el color lo refuerza. */
export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={cx("oto-badge", tone !== "neutral" && `oto-badge--${tone}`)}>{children}</span>;
}

/** Etiqueta que se puede quitar (filtros, temas). */
export function Tag({ children, onRemove }: { children: string; onRemove?: () => void }) {
  return (
    <span className="oto-tag">
      {children}
      {onRemove && (
        <button type="button" aria-label={`Quitar ${children}`} onClick={onRemove}>
          <X aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

export type AlertProps = {
  tone?: Exclude<Tone, "neutral">;
  title: string;
  children?: ReactNode;
};

/** Aviso dentro de la página. role="alert" solo para errores. */
export function Alert({ tone = "info", title, children }: AlertProps) {
  const Icon = ICONS[tone];
  return (
    <div className={cx("oto-alert", `oto-alert--${tone}`)} role={tone === "danger" ? "alert" : "status"}>
      <Icon aria-hidden="true" />
      <div>
        <p className="oto-alert__title">{title}</p>
        {children && <p className="oto-alert__text">{children}</p>}
      </div>
    </div>
  );
}

export type ToastProps = {
  tone?: "success" | "danger" | "info";
  children: ReactNode;
  action?: { label: string; onClick: () => void };
  onClose?: () => void;
  /** Milisegundos hasta cerrarse solo. Los de error no se cierran solos. */
  duration?: number;
};

export function Toast({ tone = "success", children, action, onClose, duration = 5000 }: ToastProps) {
  const Icon = ICONS[tone];
  useEffect(() => {
    if (!onClose || tone === "danger") return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, tone, duration]);
  return (
    <div className={cx("oto-toast", `oto-toast--${tone}`)} role={tone === "danger" ? "alert" : "status"}>
      <Icon aria-hidden="true" />
      <span className="oto-toast__text">{children}</span>
      {action && (
        <button className="oto-toast__action" type="button" onClick={action.onClick}>
          {action.label}
        </button>
      )}
      {onClose && (
        <button className="oto-toast__close" type="button" aria-label="Cerrar" onClick={onClose}>
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  /** Botones: el secundario («Cancelar») primero, la acción con su verbo después. */
  actions: ReactNode;
  children?: ReactNode;
};

/** Diálogo modal sobre <dialog> nativo: atrapa el foco y se cierra con Escape. */
export function Dialog({ open, onClose, title, description, actions, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="oto-dialog" aria-labelledby={titleId} onClose={onClose}>
      <h2 className="oto-dialog__title" id={titleId}>
        {title}
      </h2>
      {description && <p className="oto-dialog__text">{description}</p>}
      {children}
      <div className="oto-dialog__actions">{actions}</div>
    </dialog>
  );
}
