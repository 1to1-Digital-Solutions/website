import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { StructuredData } from "@/components/StructuredData";
import { ConsentProvider } from "@/context/ConsentContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { requestLang } from "@/lib/lang";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://1to1digital.solutions";
const siteName = "1to1 Digital Solutions";

// Spanish first: it is the audience, and what crawlers get (they send no language cookie).
const SEO = {
  es: {
    title: "IA para autónomos y pymes, de forma segura",
    description:
      "Entiende e integra la IA en tu negocio de forma segura, con un sistema adaptado uno a uno a tu empresa. Al terminar, el control es tuyo. Para autónomos y pymes sin perfil técnico.",
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
  en: {
    title: "AI for freelancers and small businesses, safely",
    description:
      "Understand and bring AI into your business safely, with a system adapted one to one to your company. When it ends, the control is yours. For freelancers and small businesses with no tech profile.",
    locale: "en_US",
    alternateLocale: ["es_ES"],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const seo = SEO[await requestLang()];
  const fullTitle = `${seo.title} | ${siteName}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: fullTitle, template: `%s | ${siteName}` },
    description: seo.description,
    applicationName: siteName,
    authors: [{ name: "César Peón", url: `${siteUrl}/about` }],
    creator: "César Peón",
    publisher: siteName,
    keywords: [
      "mentoría de IA",
      "mentoría de inteligencia artificial",
      "IA para pymes",
      "IA para autónomos",
      "IA para empresas",
      "integrar la IA en mi negocio",
      "uso seguro de la IA",
      "política de uso de IA",
      "formación en IA para empresas",
      "Reglamento Europeo de IA",
      "automatizar tareas con IA",
      "AI mentoring",
      "AI for small businesses",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName,
      title: fullTitle,
      description: seo.description,
      locale: seo.locale,
      alternateLocale: [...seo.alternateLocale],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: seo.description },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Inline script injected before hydration to avoid flash of wrong theme
const themeScript = `
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = (stored === 'dark' || stored === 'light') ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await requestLang();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData lang={lang} />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} bg-background text-foreground selection:bg-primary/30 min-h-screen font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ConsentProvider>
            <LanguageProvider initialLang={lang}>
              <a
                href="#main-content"
                className="bg-primary sr-only fixed top-2 left-2 z-[100] rounded-lg px-4 py-2 font-bold text-[var(--on-primary)] focus:not-sr-only focus:outline-none"
              >
                {lang === "es" ? "Saltar al contenido principal" : "Skip to main content"}
              </a>
              <Navbar />
              <main id="main-content" className="flex flex-col">
                {children}
              </main>
              <Footer />
              <CookieBanner />
              <GoogleAnalytics />
            </LanguageProvider>
          </ConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
