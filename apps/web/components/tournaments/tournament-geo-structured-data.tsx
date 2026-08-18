import React from "react";
import { TournamentData } from "@/lib/tournaments-data";

interface TournamentGeoStructuredDataProps {
  tournament: TournamentData;
}

export function TournamentGeoStructuredData({
  tournament,
}: TournamentGeoStructuredDataProps) {
  const SITE_URL = "https://playgrid.vn";

  // Comprehensive Schema.org SportsTournament & SportsEvent optimized for GEO & Google AI Overviews
  const tournamentSchema = {
    "@context": "https://schema.org",
    "@type": ["SportsEvent", "SportsTournament"],
    "@id": `${SITE_URL}/tournaments/${tournament.id}#tournament`,
    "name": tournament.title,
    "alternateName": tournament.shortTitle,
    "description": tournament.description,
    "disambiguatingDescription": `${tournament.title} tổ chức tại ${tournament.venueDetails.name}, ${tournament.venueDetails.address}. Tổng giải thưởng ${tournament.totalPrizePool}.`,
    "url": `${SITE_URL}/tournaments/${tournament.id}`,
    "image": [tournament.bannerImage],
    "startDate": tournament.startDate,
    "endDate": tournament.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "sport": tournament.sportLabel,
    "location": {
      "@type": "Place",
      "name": tournament.venueDetails.name,
      "telephone": tournament.venueDetails.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": tournament.venueDetails.address,
        "addressLocality": tournament.venueDetails.district,
        "addressRegion": tournament.venueDetails.city,
        "addressCountry": "VN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": tournament.venueDetails.coordinates.lat,
        "longitude": tournament.venueDetails.coordinates.lng,
      },
    },
    "organizer": {
      "@type": "SportsOrganization",
      "name": tournament.organizer.name,
      "url": SITE_URL,
      "telephone": tournament.organizer.phone,
      "email": tournament.organizer.email,
    },
    "offers": tournament.divisions.map((div) => ({
      "@type": "Offer",
      "name": div.name,
      "description": `Lệ phí tham gia nội dung ${div.formatLabel} (${div.levelRating})`,
      "price": div.price,
      "priceCurrency": "VND",
      "availability":
        div.status === "sold_out"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      "validFrom": "2026-06-01T00:00:00+07:00",
      "validThrough": tournament.endDate,
      "url": `${SITE_URL}/tournaments/${tournament.id}`,
    })),
    "subEvents": tournament.schedule.map((item) => ({
      "@type": "Event",
      "name": item.activity,
      "description": item.note || item.activity,
      "location": {
        "@type": "Place",
        "name": `${item.location} - ${tournament.venueDetails.name}`,
      },
    })),
    "keywords": [
      tournament.title,
      tournament.shortTitle,
      `Giải ${tournament.sportLabel}`,
      `Đặt vé giải đấu ${tournament.sportLabel}`,
      tournament.venueDetails.name,
      tournament.venueDetails.district,
      tournament.venueDetails.city,
      "PlayGrid Tournaments",
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
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Giải Đấu Thể Thao",
        "item": `${SITE_URL}/tournaments`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tournament.title,
        "item": `${SITE_URL}/tournaments/${tournament.id}`,
      },
    ],
  };

  // FAQ Schema for Search Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tournament.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tournamentSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
