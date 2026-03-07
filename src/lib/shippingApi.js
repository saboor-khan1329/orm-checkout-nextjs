import { apiFetch } from "./api";

export const shippingApi = {
  getRates: (checkoutId) =>
    apiFetch(`/api/checkout/shipping-rates?checkout_id=${checkoutId}`),

  applyShipping: (data) =>
    apiFetch("/api/checkout/step2", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
