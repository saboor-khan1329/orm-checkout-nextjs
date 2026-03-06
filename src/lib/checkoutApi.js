import { apiFetch } from "./api";

export const checkoutApi = {
  getContext: () => apiFetch("/api/checkout/context"),

  submitStep1: (data) =>
    apiFetch("/api/checkout/step1", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  previewVat: (country_code) =>
    apiFetch("/api/checkout/vat-preview", {
      method: "POST",
      body: JSON.stringify({ country_code }),
    }),
};
