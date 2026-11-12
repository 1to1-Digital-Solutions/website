/** Une clases ignorando las vacías. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export type Tone = "success" | "warning" | "danger" | "info" | "neutral";
