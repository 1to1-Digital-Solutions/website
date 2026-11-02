import { cookies } from "next/headers";

/** The request language, from the same cookie the layout uses. */
export async function requestLang(): Promise<"es" | "en"> {
  const cookieStore = await cookies();
  return cookieStore.get("lang")?.value === "en" ? "en" : "es";
}
