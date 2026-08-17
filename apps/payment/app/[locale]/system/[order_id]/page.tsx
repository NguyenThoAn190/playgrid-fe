"use client";

import React from "react";
import { useParams } from "next/navigation";
import { SystemPlanCheckout } from "@/components/checkout/system-plan-checkout";

export default function SystemPaymentPage() {
  const params = useParams();
  const rawOrderId = params?.order_id as string;
  const orderId = rawOrderId || "PG-SYS-10293";

  return <SystemPlanCheckout orderId={orderId} />;
}
