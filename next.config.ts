import type { NextConfig } from "next";

// Baseline security headers. CSP is intentionally permissive on `script-src`
// because the theme-flash script in app/layout.tsx is inline; tightening that
// (nonce-based CSP via middleware) is tracked in TODO.md.
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=()",
      "usb=()",
    ].join(", "),
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Inline theme-flash script + Next.js runtime requires unsafe-inline / unsafe-eval today.
      // Replace with nonces once the bootstrap script is migrated. Vercel Live needed for preview overlays.
      // googletagmanager: gtag.js loader (gated by user consent; CSP only authorises it, doesn't load it).
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://www.googletagmanager.com",
      // Tailwind's hashing strategy and arbitrary class injections rely on inline styles.
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      // data:/blob: needed for Three.js textures and Next/Image blur placeholders. GA beacons via google-analytics.com.
      "img-src 'self' data: blob: https: https://www.google-analytics.com https://*.google-analytics.com",
      "media-src 'self'",
      // GA endpoints + Vercel realtime overlays.
      "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
