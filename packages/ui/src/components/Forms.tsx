import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cx } from "./utils";

type FieldBase = {
  label: string;
  /** Ayuda bajo el campo. */
  hint?: ReactNode;
  /** Error: qué pasa y cómo arreglarlo, en una frase. Sustituye a la ayuda. */
  error?: ReactNode;
};

function Field({
  id,
  label,
  hint,
  error,
  children,
}: FieldBase & { id: string; children: ReactNode }) {
  const msg = error ?? hint;
  return (
    <div className={cx("oto-field", !!error && "oto-field--error")}>
      <label className="oto-label" htmlFor={id}>
        {label}
      </label>
      {children}
      {msg && (
        <p className="oto-hint" id={`${id}-hint`}>
          {error && <AlertCircle aria-hidden="true" />}
          {msg}
        </p>
      )}
    </div>
  );
}

function aria(id: string, f: FieldBase) {
  return {
    "aria-invalid": f.error ? true : undefined,
    "aria-describedby": f.error || f.hint ? `${id}-hint` : undefined,
  };
}

export type TextFieldProps = FieldBase & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, hint, error, id, className, ...rest }: TextFieldProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Field id={fid} label={label} hint={hint} error={error}>
      <input id={fid} className={cx("oto-input", className)} {...aria(fid, { label, hint, error })} {...rest} />
    </Field>
  );
}

export type TextAreaProps = FieldBase & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ label, hint, error, id, className, ...rest }: TextAreaProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Field id={fid} label={label} hint={hint} error={error}>
      <textarea id={fid} className={cx("oto-input", className)} {...aria(fid, { label, hint, error })} {...rest} />
    </Field>
  );
}

export type SelectFieldProps = FieldBase &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: Array<string | { value: string; label: string }>;
  };

export function SelectField({ label, hint, error, id, options, className, ...rest }: SelectFieldProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Field id={fid} label={label} hint={hint} error={error}>
      <div className="oto-select">
        <select id={fid} className={cx("oto-input", className)} {...aria(fid, { label, hint, error })} {...rest}>
          {options.map((o) =>
            typeof o === "string" ? (
              <option key={o}>{o}</option>
            ) : (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ),
          )}
        </select>
        <ChevronDown aria-hidden="true" />
      </div>
    </Field>
  );
}

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: ReactNode };

export function Checkbox({ label, className, ...rest }: ChoiceProps) {
  return (
    <label className={cx("oto-choice", className)}>
      <input type="checkbox" className="oto-checkbox" {...rest} />
      {label}
    </label>
  );
}

export function Radio({ label, className, ...rest }: ChoiceProps) {
  return (
    <label className={cx("oto-choice", className)}>
      <input type="radio" className="oto-radio" {...rest} />
      {label}
    </label>
  );
}

export type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  disabled?: boolean;
};

/** Interruptor para ajustes que se aplican al momento. Si hay que guardar después, usa Checkbox. */
export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  const id = useId();
  return (
    <span className="oto-choice">
      <button
        className="oto-switch"
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        disabled={disabled}
        onClick={() => onChange(!checked)}
      />
      <span id={id}>{label}</span>
    </span>
  );
}

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> & {
  label: string;
  value: number;
  onChange: (value: number) => void;
  /** Cómo se muestra el valor («12 años», «2.500 €»). */
  format?: (value: number) => string;
};

export function Slider({ label, value, onChange, format = String, id, ...rest }: SliderProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <div className="oto-field">
      <label className="oto-label" htmlFor={fid}>
        {label}: <output htmlFor={fid} style={{ fontFamily: "var(--font-mono)" }}>{format(value)}</output>
      </label>
      <input
        id={fid}
        className="oto-range"
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        {...rest}
      />
    </div>
  );
}
