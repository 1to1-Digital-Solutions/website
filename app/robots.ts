import type { MetadataRoute } from "next";

// AI search and assistant crawlers, named on purpose: being cited by them is part of how
// clients find the mentoring (GEO). "*" already allows them; naming them makes it explicit.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: "https://1to1digital.solutions/sitemap.xml",
    host: "https://1to1digital.solutions",
  };
}
