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
  assetPrefix: "/account-static",
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./i18n/request.ts",
    },
  },
  async rewrites() {
    return [
      {
        source: "/account-static/_next/:path*",
        destination: "/_next/:path*",
      },
      {
        source: "/account-static/images/:path*",
        destination: "/images/:path*",
      },
      {
        source: "/account-static/icons/:path*",
        destination: "/icons/:path*",
      },
      {
        source: "/account-static/logo/:path*",
        destination: "/logo/:path*",
      },
    ];
  },
};

const config = withNextIntl(nextConfig);
if (config.experimental && "turbo" in config.experimental) {
  delete (config.experimental as Record<string, unknown>).turbo;
}

export default config;
