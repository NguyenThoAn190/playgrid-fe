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
  title: "PlayGrid",
  description: "PlayGrid Web Application",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PlayGrid",
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
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
