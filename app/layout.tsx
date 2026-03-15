import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { LanguageProvider } from "@/context/LanguageContext";

// Using Inter for readable body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Using Outfit for modern, dynamic headings
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1to1 Studio | Premium Tech Execution",
  description:
    "Specialized technical execution for startups. Blockchain, Mixed Reality, and MVP Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} bg-background text-foreground selection:bg-primary/30 min-h-screen font-sans antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <a
            href="#main-content"
            className="bg-primary text-background focus:not-sr-only sr-only fixed top-2 left-2 z-[100] rounded-lg px-4 py-2 font-bold focus:outline-none"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex flex-col">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
