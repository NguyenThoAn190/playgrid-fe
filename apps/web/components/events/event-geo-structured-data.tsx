import React from "react";
import { EventData } from "@/lib/events-data";

interface EventGeoStructuredDataProps {
  event: EventData;
}

export function EventGeoStructuredData({ event }: EventGeoStructuredDataProps) {
  const scheduleSection = event.contentSections?.find((s) => s.type === "schedule");

  // Comprehensive Schema.org SportsEvent optimized for GEO (Generative Engine Optimization) & Google AI Overviews
  const sportsEventSchema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "@id": `https://playgrid.io/events/${event.id}#event`,
    "name": event.title,
    "alternateName": "Aqua Warriors Vân Đồn 2026",
    "description": event.description,
    "disambiguatingDescription": `Giải đấu ba môn phối hợp Triathlon và bơi biển quy mô quốc tế tổ chức tại Bãi biển Vân Đồn, Quảng Ninh. Gồm các cự ly ${event.distanceText || "Triathlon Olympic 51.5km, Aquathlon Standard, Bơi biển 3km, Kid Warriors"}.`,
    "url": `https://playgrid.io/events/${event.id}`,
    "image": [event.imageUrl],
    "startDate": "2026-09-12T08:00:00+07:00",
    "endDate": "2026-09-13T18:00:00+07:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "sport": "Triathlon & Open Water Swimming",
    "competitor": {
      "@type": "SportsTeam",
      "name": "Các vận động viên Aqua Warriors",
    },
    "location": {
      "@type": "Place",
      "name": "Bãi biển Vân Đồn",
      "telephone": "+84 901 234 567",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Khu du lịch Bãi biển Vân Đồn",
        "addressLocality": "Huyện Vân Đồn",
        "addressRegion": "Tỉnh Quảng Ninh",
        "postalCode": "200000",
        "addressCountry": "VN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.0667,
        "longitude": 107.4167,
      },
    },
    "organizer": {
      "@type": "SportsOrganization",
      "name": "Ban Tổ Chức Aqua Warriors & PlayGrid Vietnam",
      "url": "https://playgrid.io",
      "logo": "https://playgrid.io/images/logo.png",
    },
    "offers": event.distanceTiers?.map((tier) => ({
      "@type": "Offer",
      "name": tier.name,
      "description": `Vé tham gia cự ly ${tier.distance} - Giai đoạn ${tier.phase}`,
      "price": tier.price,
      "priceCurrency": "VND",
      "availability":
        tier.status === "sold_out"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      "validFrom": "2026-06-01T00:00:00+07:00",
      "validThrough": "2026-08-31T23:59:59+07:00",
      "url": `https://playgrid.io/events/${event.id}`,
    })) || [],
    "subEvents": scheduleSection?.scheduleTimeline?.map((item) => ({
      "@type": "Event",
      "name": item.activity,
      "description": item.note || item.activity,
      "location": {
        "@type": "Place",
        "name": item.location || "Bãi biển Vân Đồn",
      },
    })) || [],
    "keywords": [
      "Aqua Warriors Vân Đồn",
      "Triathlon Vân Đồn 2026",
      "Bơi biển Quảng Ninh",
      "Aquathlon 2026",
      "Đặt vé giải thể thao PlayGrid",
      "Giải bơi biển Vân Đồn",
    ],
  };

  // Breadcrumbs Schema for Navigation Hierarchy
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ PlayGrid",
        "item": "https://playgrid.io",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Sự kiện & Giải đấu",
        "item": "https://playgrid.io/events",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": event.title,
        "item": `https://playgrid.io/events/${event.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
