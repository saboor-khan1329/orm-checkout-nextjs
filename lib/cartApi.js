const API = process.env.NEXT_PUBLIC_API_URL;

async function request(endpoint, options = {}) {
  const res = await fetch(`${API}${endpoint}`, {
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
  getCart: () => request("/api/cart"),
  addItem: (product_id, quantity = 1, condition = "new") =>
    request("/api/cart/items", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity, condition }),
    }),
  updateItem: (itemId, quantity) =>
    request(`/api/cart/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),
  removeItem: (itemId) =>
    request(`/api/cart/items/${itemId}`, {
      method: "DELETE",
    }),
  getRelated: () => request(`/api/cart/related`),
};
