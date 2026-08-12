import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { Inter } from "next/font/google";
import "../globals.css";
import { PWARegister } from "@/components/pwa/pwa-register";
import { InstallPrompt } from "@/components/pwa/install-prompt";

const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "vi" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <PWARegister />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <InstallPrompt />
      </body>
    </html>
  );
}

