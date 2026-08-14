import type { Metadata } from "next";
import { getVenueBySlug } from "@/lib/venue-data";
import { VenueDetailClient } from "@/components/venue/venue-detail-client";

interface VenuePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: VenuePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const venue = getVenueBySlug(slug);

  const isEn = locale === "en";
  const title = isEn
    ? `${venue.name} - Online Sports Court Booking 24/7 | PlayGrid`
    : `${venue.name} - Đặt Sân Trực Tuyến 24/7 | PlayGrid`;

  const description = isEn
    ? `${venue.name} at ${venue.address}. Book courts online instantly, view pricing ${venue.priceRange}, and check real-time court availability on PlayGrid.`
    : `${venue.name} tại ${venue.address}. Đặt sân online nhanh chóng, xem bảng giá ${venue.priceRange}, kiểm tra sân trống theo thời gian thực tại PlayGrid.`;

  return {
    title,
    description,
    openGraph: {
      title: `${venue.name} - PlayGrid`,
      description: venue.description,
      images: venue.images[0] ? [venue.images[0]] : [],
    },
  };
}

export default async function VenueDetailPage({ params }: VenuePageProps) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  return <VenueDetailClient venue={venue} />;
}
