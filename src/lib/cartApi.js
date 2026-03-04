import { apiFetch } from "./api";

export const cartApi = {
  getCart: () => apiFetch("/api/cart"),

  addItem: (data) =>
    apiFetch("/api/cart/items", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateQty: ({ itemId, quantity }) =>
    apiFetch(`/api/cart/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),

  removeItem: (itemId) =>
    apiFetch(`/api/cart/items/${itemId}`, {
      method: "DELETE",
    }),

  validateCart: () =>
    apiFetch("/api/cart/validate", {
      method: "POST",
    }),
};
