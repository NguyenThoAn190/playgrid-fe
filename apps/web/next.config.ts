import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  allowedDevOrigins: ["100.78.38.8", "100.78.38.8:3000", "localhost:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./i18n/request.ts",
    },
  },
};

const config = withNextIntl(nextConfig);
if (config.experimental && "turbo" in config.experimental) {
  delete (config.experimental as Record<string, unknown>).turbo;
}

export default config;
