import type { CSSProperties, ReactNode } from "react";
import { cx } from "./utils";

export type Column<T> = {
  key: string;
  header: string;
  /** Cifras: mono, a la derecha y con dígitos tabulares. */
  numeric?: boolean;
  render: (row: T) => ReactNode;
};

export function DataTable<T>({ columns, rows, rowKey }: { columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string }) {
  return (
    <div className="oto-table-wrap">
      <table className="oto-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" style={c.numeric ? { textAlign: "right" } : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)}>
              {columns.map((c) => (
                <td key={c.key} className={c.numeric ? "oto-num" : undefined}>
                  {c.render(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** KPI: etiqueta y cifra. Solo una cifra por vista va en accent. */
export function StatCard({ label, value, accent }: { label: string; value: ReactNode; accent?: boolean }) {
  return (
    <div className="oto-stat">
      <p className="oto-stat__label">{label}</p>
      <p className={cx("oto-stat__value", accent && "oto-stat__value--accent")}>{value}</p>
    </div>
  );
}

export type EmptyStateProps = {
  icon: ReactNode;
  /** Invita a actuar: «Añade tu primer contacto». Nunca «No hay datos». */
  title: string;
  text?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({ icon, title, text, action }: EmptyStateProps) {
  return (
    <div className="oto-empty">
      <span className="oto-icon-chip" aria-hidden="true">
        {icon}
      </span>
      <p className="oto-empty__title">{title}</p>
      {text && <p className="oto-empty__text">{text}</p>}
      {action}
    </div>
  );
}

export function Skeleton({ width = "100%", height = 14, style }: { width?: CSSProperties["width"]; height?: CSSProperties["height"]; style?: CSSProperties }) {
  return <span className="oto-skeleton" aria-hidden="true" style={{ width, height, ...style }} />;
}
