import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PlayGrid Dashboard",
    short_name: "PlayGrid Dash",
    description: "PlayGrid Dashboard Application",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0363FE",
    orientation: "any",
    // @ts-expect-error scope_extensions is a W3C standard for multi-origin PWA
    scope_extensions: [
      { origin: "https://playgrid-fe-web.vercel.app" },
      { origin: "https://playgrid-fe-account.vercel.app" },
      { origin: "https://playgrid-fe-dashboard.vercel.app" },
      { origin: "https://playgrid-fe-payment.vercel.app" },
      { origin: "https://playgrid-fe-admin.vercel.app" },
      { origin: "https://playgrid.vn" },
      { origin: "https://account.playgrid.vn" },
      { origin: "https://dashboard.playgrid.vn" },
      { origin: "https://payment.playgrid.vn" },
      { origin: "https://admin.playgrid.vn" },
      { origin: "http://localhost:3000" },
      { origin: "http://localhost:3001" },
      { origin: "http://localhost:3002" },
      { origin: "http://localhost:3003" },
      { origin: "http://localhost:3004" },
    ],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icons/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
