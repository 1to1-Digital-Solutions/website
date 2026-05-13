import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "1to1 Digital Solutions",
    short_name: "1to1",
    description: "We build your technology, you build your business.",
    start_url: "/",
    display: "standalone",
    background_color: "#27272a",
    theme_color: "#1f957a",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
