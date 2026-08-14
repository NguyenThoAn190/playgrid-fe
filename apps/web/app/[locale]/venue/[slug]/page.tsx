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
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  return {
    title: `${venue.name} - Đặt Sân Trực Tuyến 24/7 | PlayGrid`,
    description: `${venue.name} tại ${venue.address}. Đặt sân cầu lông online nhanh chóng, xem bảng giá ${venue.priceRange}, kiểm tra sân trống theo thời gian thực tại PlayGrid.`,
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
