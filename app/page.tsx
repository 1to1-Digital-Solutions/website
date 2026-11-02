import { HomePage } from "@/components/HomePage";
import { FAQ } from "@/content/faq";
import { requestLang } from "@/lib/lang";

export default async function Page() {
  const faq = FAQ[await requestLang()];
  // The same questions the page shows, as schema.org `FAQPage`: search engines and AI
  // assistants read the answers straight from here.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage />
    </>
  );
}
