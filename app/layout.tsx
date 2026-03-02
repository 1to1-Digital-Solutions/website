import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} bg-background text-foreground selection:bg-primary/30 min-h-screen font-sans antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Navbar />
          <main className="flex flex-col">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
