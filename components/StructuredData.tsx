const SITE_URL = "https://1to1digital.solutions";
const SITE_NAME = "1to1 Digital Solutions";
const LEGAL_NAME = "1TO1 DIGITAL SOLUTIONS SL.";
const SLOGAN = "We build your technology, you build your business";
const DESCRIPTION =
  "Custom software development: project rescue, digital products from scratch and business digitalisation. Specialists in browser-based mixed reality and Web3.";

export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-positive.svg`,
    slogan: SLOGAN,
    description: DESCRIPTION,
    email: "info@1to1digital.solutions",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avda. de Buendía, 11",
      postalCode: "19005",
      addressLocality: "Guadalajara",
      addressCountry: "ES",
    },
    taxID: "B27630136",
    sameAs: [
      "https://github.com/1to1-Digital-Solutions",
      "https://www.linkedin.com/in/c%C3%A9sar-pe%C3%B3n-lamparero/",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DESCRIPTION,
    inLanguage: ["es-ES", "en-US"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
