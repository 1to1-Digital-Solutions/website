import { cookies } from "next/headers";

/** El idioma de la petición, con la misma cookie que usa el layout. */
export async function requestLang(): Promise<"es" | "en"> {
  const cookieStore = await cookies();
  return cookieStore.get("lang")?.value === "en" ? "en" : "es";
}
