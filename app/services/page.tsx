import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";
import { MENTORSHIP } from "@/content/services";
import { requestLang } from "@/lib/lang";

const SITE_URL = "https://1to1digital.solutions";

export async function generateMetadata(): Promise<Metadata> {
  const c = MENTORSHIP[await requestLang()];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "/services" },
    // Redefining openGraph drops the root image: name it again.
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: "/services",
      images: ["/opengraph-image"],
    },
  };
}

export default async function Page() {
  const c = MENTORSHIP[await requestLang()];
  // The mentoring as a schema.org `Service`, provided by the organization declared in the layout.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services#mentoring`,
    name: c.metaTitle,
    description: c.metaDescription,
    url: `${SITE_URL}/services`,
    serviceType: "AI mentoring",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "ES",
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
