import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0363FE" },
    { media: "(prefers-color-scheme: dark)", color: "#12141C" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "User Dashboard - PlayGrid",
  description: "PlayGrid User Dashboard",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PlayGrid Dashboard",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

