import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  transpilePackages: ["@workspace/ui"],
  allowedDevOrigins: ["100.78.38.8", "100.78.38.8:3000", "localhost:3000"],
  assetPrefix: "/payment-static",
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./i18n/request.ts",
    },
  },
  async rewrites() {
    return [
      {
        source: "/payment-static/_next/:path*",
        destination: "/_next/:path*",
      },
      {
        source: "/payment-static/images/:path*",
        destination: "/images/:path*",
      },
      {
        source: "/payment-static/icons/:path*",
        destination: "/icons/:path*",
      },
      {
        source: "/payment-static/logo/:path*",
        destination: "/logo/:path*",
      },
      // Fallback if accessed directly on payment domain with /payment prefix
      {
        source: "/:locale/payment/:path*",
        destination: "/:locale/:path*",
      },
      {
        source: "/:locale/payment",
        destination: "/:locale",
      },
    ];
  },
};

const config = withNextIntl(nextConfig);
if (config.experimental && "turbo" in config.experimental) {
  delete (config.experimental as Record<string, unknown>).turbo;
}

export default config;
