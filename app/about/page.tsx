import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { ABOUT } from "@/content/about";
import { requestLang } from "@/lib/lang";

export async function generateMetadata(): Promise<Metadata> {
  const c = ABOUT[await requestLang()];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "/about" },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: "/about" },
  };
}

export default function Page() {
  return <AboutPage />;
}
