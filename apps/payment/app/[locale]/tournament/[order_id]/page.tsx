"use client";

import React from "react";
import { useParams } from "next/navigation";
import { TournamentCheckout } from "@/components/checkout/tournament-checkout";

export default function TournamentPaymentPage() {
  const params = useParams();
  const rawOrderId = params?.order_id as string;
  const orderId = rawOrderId || "PG-TRN-55812";

  return <TournamentCheckout orderId={orderId} />;
}
