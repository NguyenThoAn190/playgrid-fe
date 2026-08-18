import React from "react";
import { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInfoCards } from "@/components/contact/contact-info-cards";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/contact-map";
import { ContactFAQ } from "@/components/contact/contact-faq";
import { ContactEmergencyBanner } from "@/components/contact/contact-emergency-banner";

export const metadata: Metadata = {
  title: "Liên hệ & Hỗ trợ 24/7 | PlayGrid - Nền tảng Thể thao Toàn diện",
  description:
    "Trung tâm hỗ trợ và liên hệ chính thức của PlayGrid. Hỗ trợ người chơi, hợp tác chủ sân thể thao, tổ chức giải đấu và tài trợ trên toàn quốc.",
  openGraph: {
    title: "Liên hệ & Hỗ trợ 24/7 | PlayGrid",
    description:
      "Kết nối nhanh chóng với đội ngũ PlayGrid qua hotline 1900 6868, email hoặc gửi biểu mẫu liên hệ trực tuyến.",
  },
};

import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Liên hệ & Hỗ trợ", url: `/${locale}/contact` },
  ]);

  return (
    <div className="w-full min-h-screen bg-background text-foreground py-6 sm:py-10">
      <JsonLdScript data={breadcrumbSchema} />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* 1. Hero & Trust Badges */}
        <ContactHero />

        {/* 2. Main 2-Column Grid: Info Cards & Smart Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 w-full">
            <ContactInfoCards />
          </div>
          <div className="lg:col-span-7 w-full">
            <ContactForm />
          </div>
        </section>

        {/* 3. Interactive Office Locations & Map */}
        <section>
          <ContactMap />
        </section>

        {/* 4. Frequently Asked Questions (FAQ) */}
        <section>
          <ContactFAQ />
        </section>

        {/* 5. On-Court Emergency Support Banner */}
        <section className="pt-2">
          <ContactEmergencyBanner />
        </section>
      </div>
    </div>
  );
}
