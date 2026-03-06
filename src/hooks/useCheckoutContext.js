"use client";

import { useQuery } from "@tanstack/react-query";
import { checkoutApi } from "@/lib/checkoutApi";

export function useCheckoutContext() {
  return useQuery({
    queryKey: ["checkout-context"],
    queryFn: checkoutApi.getContext,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
