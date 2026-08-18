import React from "react";
import { VenueDetailData } from "@/lib/venue-data";
import { EventData } from "@/lib/events-data";
import { BlogPostData } from "@/components/blog/blog-card";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

const SITE_URL = "https://playgrid.vn";

/**
 * 1. Global WebSite Schema.org
 */
export function getWebsiteJsonLd(locale: string = "vi") {
  const isEn = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "PlayGrid",
    alternateName: ["PlayGrid Vietnam", "PlayGrid Sports Platform", "Nền tảng Thể thao PlayGrid"],
    description: isEn
      ? "Vietnam's premier sports platform for court booking, tournament registration, and player matchmaking."
      : "Nền tảng thể thao hàng đầu Việt Nam — Đặt sân trực tuyến, đăng ký giải đấu và ghép kèo thể thao 24/7.",
    inLanguage: ["vi-VN", "en-US"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}/badminton/venue?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * 2. Organization Schema.org
 */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "PlayGrid Vietnam",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo/playgrid-icon.png`,
      width: "512",
      height: "512",
    },
    sameAs: [
      "https://facebook.com/playgrid.vn",
      "https://instagram.com/playgrid.vn",
      "https://youtube.com/@playgridvn",
      "https://tiktok.com/@playgrid.vn",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84 901 234 567",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: ["Vietnamese", "English"],
    },
  };
}

/**
 * 3. BreadcrumbList Schema.org
 */
export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * 4. SportsActivityLocation (Venue Detail) Schema.org
 */
export function getVenueJsonLd(venue: VenueDetailData, locale: string = "vi") {
  const images = venue.images.map((img) =>
    img.startsWith("http") ? img : `${SITE_URL}${img}`
  );

  return {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    "@id": `${SITE_URL}/${locale}/venue/${venue.slug}#venue`,
    name: venue.name,
    alternateName: venue.shortName,
    description: venue.description,
    url: `${SITE_URL}/${locale}/venue/${venue.slug}`,
    image: images,
    telephone: venue.phone || "+84 901 234 567",
    email: venue.email || "support@playgrid.vn",
    priceRange: venue.priceRange,
    currenciesAccepted: "VND",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, QR Code, MoMo, VNPay",
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.address,
      addressLocality: venue.district,
      addressRegion: venue.city,
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: venue.coordinates.lat,
      longitude: venue.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "05:00",
        closes: "23:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: venue.rating || 4.8,
      reviewCount: venue.reviewsCount || 10,
      bestRating: "5",
      worstRating: "1",
    },
    amenityFeature: venue.amenities?.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.label,
      value: "true",
    })) || [],
    review: venue.reviews?.slice(0, 5).map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.userName,
      },
      datePublished: review.date,
      reviewBody: review.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: "5",
        worstRating: "1",
      },
    })) || [],
  };
}

/**
 * 5. Venue Listing ItemList Schema.org
 */
export function getVenueListJsonLd(
  venues: VenueDetailData[],
  sportName: string,
  locale: string = "vi"
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Danh sách sân ${sportName} nổi bật tại TP. Hồ Chí Minh`,
    description: `Khám phá các sân ${sportName} chất lượng cao, giá tốt, hỗ trợ đặt sân trực tuyến 24/7 trên PlayGrid.`,
    itemListElement: venues.map((venue, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SportsActivityLocation",
        name: venue.name,
        url: `${SITE_URL}/${locale}/venue/${venue.slug}`,
        image: venue.images[0]?.startsWith("http")
          ? venue.images[0]
          : `${SITE_URL}${venue.images[0] || ""}`,
        address: venue.address,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: venue.rating,
          reviewCount: venue.reviewsCount,
        },
        priceRange: venue.priceRange,
      },
    })),
  };
}

/**
 * 6. BlogPosting Schema.org
 */
export function getBlogPostingJsonLd(post: BlogPostData, locale: string = "vi") {
  const imageUrl = post.imageUrl?.startsWith("http")
    ? post.imageUrl
    : `${SITE_URL}${post.imageUrl}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/${locale}/blog/${post.id}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: "2026-05-16T08:00:00+07:00",
    dateModified: "2026-05-16T10:00:00+07:00",
    articleSection: post.category,
    inLanguage: locale === "en" ? "en-US" : "vi-VN",
    author: {
      "@type": "Person",
      name: "Chuyên gia Thể thao PlayGrid",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "SportsOrganization",
      name: "PlayGrid Vietnam",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/playgrid-icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${post.id}`,
    },
  };
}

/**
 * 7. Blog Collection & ItemList Schema.org
 */
export function getBlogListJsonLd(posts: BlogPostData[], locale: string = "vi") {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "PlayGrid Blog & Kiến thức Thể thao",
    description: "Tổng hợp kỹ thuật, chiến thuật, mẹo tập luyện cầu lông, pickleball và tin tức thể thao mới nhất.",
    url: `${SITE_URL}/${locale}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/${locale}/blog/${post.id}`,
        name: post.title,
      })),
    },
  };
}

/**
 * 8. Events ItemList Schema.org
 */
export function getEventListJsonLd(events: EventData[], locale: string = "vi") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lịch thi đấu & Giải đấu Thể thao PlayGrid",
    description: "Danh sách giải đấu cầu lông, pickleball, marathon và bơi biển quy mô toàn quốc.",
    url: `${SITE_URL}/${locale}/events`,
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SportsEvent",
        name: event.title,
        description: event.description,
        url: `${SITE_URL}/${locale}/events/${event.id}`,
        image: event.imageUrl?.startsWith("http")
          ? event.imageUrl
          : `${SITE_URL}${event.imageUrl}`,
        location: {
          "@type": "Place",
          name: event.location,
          address: event.location,
        },
      },
    })),
  };
}

/**
 * 9. FAQ Schema.org
 */
export function getFAQJsonLd(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * 10. SportsTournament Schema.org
 */
export function getTournamentJsonLd(tournament: {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  bannerImage: string;
  startDate: string;
  endDate: string;
  sportLabel: string;
  totalPrizePool: string;
  venueDetails: {
    name: string;
    address: string;
    district: string;
    city: string;
    coordinates: { lat: number; lng: number };
    phone: string;
  };
  organizer: {
    name: string;
    phone: string;
    email: string;
  };
  divisions: {
    name: string;
    price: number;
    formatLabel: string;
    levelRating: string;
    status: string;
  }[];
}, locale: string = "vi") {
  return {
    "@context": "https://schema.org",
    "@type": ["SportsEvent", "SportsTournament"],
    "@id": `${SITE_URL}/${locale}/tournaments/${tournament.id}#tournament`,
    name: tournament.title,
    alternateName: tournament.shortTitle,
    description: tournament.description,
    url: `${SITE_URL}/${locale}/tournaments/${tournament.id}`,
    image: [tournament.bannerImage],
    startDate: tournament.startDate,
    endDate: tournament.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: tournament.sportLabel,
    location: {
      "@type": "Place",
      name: tournament.venueDetails.name,
      telephone: tournament.venueDetails.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: tournament.venueDetails.address,
        addressLocality: tournament.venueDetails.district,
        addressRegion: tournament.venueDetails.city,
        addressCountry: "VN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: tournament.venueDetails.coordinates.lat,
        longitude: tournament.venueDetails.coordinates.lng,
      },
    },
    organizer: {
      "@type": "SportsOrganization",
      name: tournament.organizer.name,
      url: SITE_URL,
      telephone: tournament.organizer.phone,
      email: tournament.organizer.email,
    },
    offers: tournament.divisions.map((div) => ({
      "@type": "Offer",
      name: div.name,
      description: `Lệ phí thi đấu ${div.formatLabel} - ${div.levelRating}`,
      price: div.price,
      priceCurrency: "VND",
      availability:
        div.status === "sold_out"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      url: `${SITE_URL}/${locale}/tournaments/${tournament.id}`,
    })),
  };
}

/**
 * React Component for Rendering JSON-LD Script Tag
 */
export function JsonLdScript({
  data,
}: {
  data: Record<string, any> | Array<Record<string, any>>;
}) {
  const jsonString = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
