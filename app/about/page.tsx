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
    // Redefining openGraph drops the root image: name it again.
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: "/about",
      images: ["/opengraph-image"],
    },
  };
}

const SITE_URL = "https://1to1digital.solutions";

export default async function Page() {
  const c = ABOUT[await requestLang()];
  // The about page as schema.org `ProfilePage` about César (declared in the layout).
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/about`,
    name: c.metaTitle,
    description: c.metaDescription,
    mainEntity: { "@id": `${SITE_URL}/#cesar` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AboutPage />
    </>
  );
}
