import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";
import { MENTORSHIP, PRICE_EUR } from "@/content/services";
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
    serviceType: "Mentoría de inteligencia artificial para pymes y autónomos",
    provider: { "@id": `${SITE_URL}/#organization` },
    // Online sessions: all of Spain.
    areaServed: { "@type": "Country", name: "España" },
    availableChannel: { "@type": "ServiceChannel", name: "Online (videollamada)" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Pymes y autónomos sin perfil tecnológico interno",
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 1, maxValue: 50 },
    },
    termsOfService: `${SITE_URL}/terms-conditions`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: c.outcomesTitle,
      itemListElement: c.outcomes.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.title, description: o.text },
      })),
    },
    offers: {
      "@type": "Offer",
      price: PRICE_EUR,
      priceCurrency: "EUR",
      // + VAT: schema.org has no flag on Offer, so it goes in the price specification.
      priceSpecification: {
        "@type": "PriceSpecification",
        price: PRICE_EUR,
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
      },
      url: `${SITE_URL}/services#price`,
    },
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
