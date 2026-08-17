"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ConcertCheckout } from "@/components/checkout/concert-checkout";

export default function ConcertPaymentPage() {
  const params = useParams();
  const rawOrderId = params?.order_id as string;
  const orderId = rawOrderId || "PG-CON-33910";

  return <ConcertCheckout orderId={orderId} />;
}
