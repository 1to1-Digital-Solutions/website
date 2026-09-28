import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";
import { SERVICES, SERVICES_PAGE } from "@/content/services";
import { requestLang } from "@/lib/lang";

const SITE_URL = "https://1to1digital.solutions";

export async function generateMetadata(): Promise<Metadata> {
  const c = SERVICES_PAGE[await requestLang()];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "/services" },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: "/services" },
  };
}

export default async function Page() {
  const lang = await requestLang();
  // Cada servicio como `Service` de schema.org, colgado de la organización que declara el layout.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/services#${s.slug}`,
        name: s[lang].title,
        description: s[lang].summary,
        url: `${SITE_URL}/services#${s.slug}`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "ES",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServicesPage />
    </>
  );
}
