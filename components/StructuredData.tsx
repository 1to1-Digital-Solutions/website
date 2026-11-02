/**
 * Site-wide schema.org data: the organization, its founder (who gives the mentoring) and the
 * website. Search engines and AI assistants use it to understand who offers what. Each page
 * adds its own block (FAQPage on the home page, Service on /services, ProfilePage on /about).
 */
import { LINKEDIN_URL } from "@/content/contact";

const SITE_URL = "https://1to1digital.solutions";
const SITE_NAME = "1to1 Digital Solutions";
const LEGAL_NAME = "1TO1 DIGITAL SOLUTIONS SL.";

const COPY = {
  es: {
    slogan: "Entiende e integra la IA en tu negocio, de forma segura",
    description:
      "Acompañamiento para que autónomos y pymes sin perfil técnico entiendan e integren la IA en su negocio de forma segura, con un sistema adaptado uno a uno a su empresa. Al terminar, el control es suyo: no dependen de nadie externo para seguir avanzando con la IA.",
    jobTitle: "Ingeniero informático y mentor de IA para pymes y autónomos",
    knowsAbout: [
      "Inteligencia artificial",
      "Integración de IA en empresas",
      "Uso seguro de la IA",
      "Desarrollo de software",
      "Automatización de procesos",
      "Transformación digital",
    ],
  },
  en: {
    slogan: "Understand and bring AI into your business, safely",
    description:
      "Guidance so freelancers and small businesses with no tech profile understand and bring AI into their business safely, with a system adapted one to one to their company. When it ends, the control is theirs: they don't depend on anyone external to keep moving forward with AI.",
    jobTitle: "Computer engineer and AI mentor for small businesses and freelancers",
    knowsAbout: [
      "Artificial intelligence",
      "AI integration in businesses",
      "Safe use of AI",
      "Software development",
      "Process automation",
      "Digital transformation",
    ],
  },
} as const;

export function StructuredData({ lang = "es" }: { lang?: "es" | "en" }) {
  const c = COPY[lang];

  const founder = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#cesar`,
    name: "César Peón",
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/images/profilePicture.jpg`,
    jobTitle: c.jobTitle,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de Alcalá" },
    knowsAbout: c.knowsAbout,
    sameAs: [LINKEDIN_URL],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-positive.svg`,
    image: `${SITE_URL}/opengraph-image`,
    slogan: c.slogan,
    description: c.description,
    email: "info@1to1digital.solutions",
    founder: { "@id": `${SITE_URL}/#cesar` },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avda. de Buendía, 11",
      postalCode: "19005",
      addressLocality: "Guadalajara",
      addressCountry: "ES",
    },
    // Sessions are online: the service covers all of Spain.
    areaServed: { "@type": "Country", name: "España" },
    priceRange: "1.900 € + IVA",
    taxID: "B27630136",
    sameAs: ["https://github.com/1to1-Digital-Solutions", LINKEDIN_URL],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: c.description,
    inLanguage: lang === "es" ? "es-ES" : "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      {[organization, founder, website].map((data) => (
        <script
          key={data["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
