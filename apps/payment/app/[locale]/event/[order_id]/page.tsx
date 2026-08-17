"use client";

import React from "react";
import { useParams } from "next/navigation";
import { EventCheckout } from "@/components/checkout/event-checkout";

export default function EventPaymentPage() {
  const params = useParams();
  const rawOrderId = params?.order_id as string;
  const orderId = rawOrderId || "PG-EVT-77210";

  return <EventCheckout orderId={orderId} />;
}
