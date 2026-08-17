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
  async rewrites() {
    const accountUrl = process.env.NEXT_PUBLIC_ACCOUNT_URL || "http://localhost:3003";
    const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT_URL || "http://localhost:3004";
    return [
      // 1. Account static assets and JS/CSS chunks
      {
        source: "/account-static/_next/:path*",
        destination: `${accountUrl}/_next/:path*`,
      },
      {
        source: "/account-static/images/:path*",
        destination: `${accountUrl}/images/:path*`,
      },
      {
        source: "/account-static/icons/:path*",
        destination: `${accountUrl}/icons/:path*`,
      },
      {
        source: "/account-static/logo/:path*",
        destination: `${accountUrl}/logo/:path*`,
      },
      // 2. Direct static assets used on login/register pages
      {
        source: "/images/login/:path*",
        destination: `${accountUrl}/images/login/:path*`,
      },
      {
        source: "/images/register/:path*",
        destination: `${accountUrl}/images/register/:path*`,
      },
      // 3. Auth & Account Pages (Multi-Zone)
      {
        source: "/:locale/login",
        destination: `${accountUrl}/:locale/login`,
      },
      {
        source: "/:locale/register",
        destination: `${accountUrl}/:locale/register`,
      },
      {
        source: "/:locale/logout",
        destination: `${accountUrl}/:locale/logout`,
      },
      {
        source: "/:locale/forgot-password",
        destination: `${accountUrl}/:locale/forgot-password`,
      },
      {
        source: "/:locale/account",
        destination: `${accountUrl}/:locale`,
      },
      {
        source: "/:locale/account/:path*",
        destination: `${accountUrl}/:locale/:path*`,
      },
      // 4. Payment static assets and JS/CSS chunks
      {
        source: "/payment-static/_next/:path*",
        destination: `${paymentUrl}/_next/:path*`,
      },
      {
        source: "/payment-static/images/:path*",
        destination: `${paymentUrl}/images/:path*`,
      },
      {
        source: "/payment-static/icons/:path*",
        destination: `${paymentUrl}/icons/:path*`,
      },
      {
        source: "/payment-static/logo/:path*",
        destination: `${paymentUrl}/logo/:path*`,
      },
      // 5. Payment & Checkout Pages (Multi-Zone)
      {
        source: "/:locale/payment",
        destination: `${paymentUrl}/:locale`,
      },
      {
        source: "/:locale/payment/:path*",
        destination: `${paymentUrl}/:locale/:path*`,
      },
      {
        source: "/:locale/checkout",
        destination: `${paymentUrl}/:locale`,
      },
      {
        source: "/:locale/checkout/:path*",
        destination: `${paymentUrl}/:locale/:path*`,
      },
    ];
  },
};

const config = withNextIntl(nextConfig);
if (config.experimental && "turbo" in config.experimental) {
  delete (config.experimental as Record<string, unknown>).turbo;
}

export default config;
