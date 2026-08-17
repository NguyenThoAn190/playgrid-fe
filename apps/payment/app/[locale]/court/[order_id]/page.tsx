"use client";

import React from "react";
import { useParams } from "next/navigation";
import { CourtCheckout } from "@/components/checkout/court-checkout";

export default function CourtPaymentPage() {
  const params = useParams();
  const rawOrderId = params?.order_id as string;
  const orderId = rawOrderId || "PG-CRT-89241";

  return <CourtCheckout orderId={orderId} />;
}
