import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { StructuredData } from "@/components/StructuredData";
import { AttributionCapture } from "@/components/AttributionCapture";
import { ConsentProvider } from "@/context/ConsentContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

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
const siteTagline = "Understand and bring AI into your business, safely";
const siteDescription =
  "An 8-week mentoring for small businesses and freelancers to understand and bring AI into their business safely, and finish with their own system to build their tools without depending on anyone.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  keywords: [
    "IA para empresas",
    "IA para pymes",
    "IA para autónomos",
    "integrar la IA en mi negocio",
    "integrar IA de forma segura",
    "mentoría de IA",
    "formación en IA para empresas",
    "automatizar tareas con IA",
    "herramientas de IA para negocios",
    "AI for small businesses",
    "AI mentoring",
    "Guadalajara",
    "España",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} | ${siteTagline}`,
    description: siteDescription,
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | ${siteTagline}`,
    description: siteDescription,
  },
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
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  const lang: "es" | "en" = langCookie === "en" ? "en" : "es";

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData />
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
              <AttributionCapture />
            </LanguageProvider>
          </ConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
