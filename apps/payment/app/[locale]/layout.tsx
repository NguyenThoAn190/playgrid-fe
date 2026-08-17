import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { routing } from "../../i18n/routing";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import { PWARegister } from "@/components/pwa/pwa-register";
import { InstallPrompt } from "@/components/pwa/install-prompt";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
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

  // Read theme from server cookies for instantaneous SSR theme matching
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("playgrid_theme")?.value;
  const initialTheme = themeCookie === "dark" || themeCookie === "light" ? themeCookie : "system";

  return (
    <div
      className={cn(
        "min-h-full flex flex-col bg-background text-foreground antialiased font-sans",
        inter.variable,
        inter.className
      )}
    >
      <ThemeProvider attribute="class" defaultTheme={initialTheme} enableSystem disableTransitionOnChange>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PWARegister />
          <main className="flex-1">{children}</main>
          <InstallPrompt />
        </NextIntlClientProvider>
      </ThemeProvider>
    </div>
  );
}
