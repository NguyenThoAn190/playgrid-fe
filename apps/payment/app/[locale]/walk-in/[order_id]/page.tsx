"use client";

import React from "react";
import { useParams } from "next/navigation";
import { WalkInCheckout } from "@/components/checkout/walk-in-checkout";

export default function WalkInPaymentPage() {
  const params = useParams();
  const rawOrderId = params?.order_id as string;
  const orderId = rawOrderId || "PG-WLK-99014";

  return <WalkInCheckout orderId={orderId} />;
}
