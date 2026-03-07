"use client";

import { useState } from "react";
import { useCheckout } from "./CheckoutProvider";
import { useQuery } from "@tanstack/react-query";
import { shippingApi } from "@/lib/shippingApi";
import { useCart } from "@/context/CartContext";

export default function DeliveryOptions({ partner }) {
  const { state, dispatch } = useCheckout();
  const { summary, updateSummary, cart } = useCart();

  const [showAll, setShowAll] = useState(false);

  const checkoutId = state.contact.checkout_id;

  const { data, isLoading } = useQuery({
    queryKey: ["shipping-rates", checkoutId],

    queryFn: () => shippingApi.getRates(checkoutId),

    enabled: !!checkoutId && partner === "fedex",

    staleTime: 1000 * 60 * 2,

    retry: 1,
  });

  const rates = data?.rates ?? [];

  const currency = cart?.items?.[0]?.symbol || summary?.currency_symbol || "$";

  const selectOption = (rate) => {
    const shippingCost = Number(rate.total);

    dispatch({
      type: "SET_DELIVERY",
      payload: {
        partner: "fedex",
        option: rate.service_name,
        cost: shippingCost,
      },
    });

    dispatch({ type: "SET_STEP", payload: 2 });

    const subtotal = Number(summary?.subtotal ?? 0);
    const tax = Number(summary?.tax ?? 0);

    updateSummary({
      shipping: shippingCost,
      total: subtotal + tax + shippingCost,
    });
  };

  if (isLoading) {
    return (
      <div className="delivery-box-wrap">
        <div className="delivery-box">Loading shipping rates...</div>
      </div>
    );
  }

  const list = showAll ? rates : rates.slice(0, 4);

  return (
    <div>
      <div className="delivery-box-wrap">
        {list.map((rate) => {
          const price = Number(rate.total).toFixed(2);

          const label = `${rate.carrier} | ${rate.service_name} - ${currency}${price}`;

          return (
            <div key={rate.service_name} className="delivery-box">
              <input
                type="radio"
                name="deliveryOption"
                checked={state.delivery.option === rate.service_name}
                onChange={() => selectOption(rate)}
              />

              {label}
            </div>
          );
        })}
      </div>

      {rates.length > 4 && !showAll && (
        <button onClick={() => setShowAll(true)} className="view-more">
          View more*
        </button>
      )}
    </div>
  );
}
