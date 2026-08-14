import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import { Navbar } from "@/components/navbar/navbar";
import { PWARegister } from "@/components/pwa/pwa-register";
import { InstallPrompt } from "@/components/pwa/install-prompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <div
      className={cn(
        "min-h-full flex flex-col bg-background text-foreground antialiased font-sans",
        geistSans.variable,
        geistMono.variable,
        inter.variable
      )}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PWARegister />
          <main className="flex-1 min-h-screen">{children}</main>
          <InstallPrompt />
        </NextIntlClientProvider>
      </ThemeProvider>
    </div>
  );
}
