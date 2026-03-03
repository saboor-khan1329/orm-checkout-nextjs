const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }

  return res.json();
}

export const cartApi = {
  get: () => request("/api/cart"),

  add: (product_id, quantity = 1, condition = "new") =>
    request("/api/cart/items", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity, condition }),
    }),

  update: (itemId, quantity) =>
    request(`/api/cart/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),

  remove: (itemId) =>
    request(`/api/cart/items/${itemId}`, {
      method: "DELETE",
    }),

  clear: () =>
    request(`/api/cart/clear`, {
      method: "POST",
    }),

  related: () => request(`/api/cart/related`),
};
