const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint, options = {}) {
  const controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      credentials: "include",

      signal: controller.signal,

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...options.headers,
      },

      ...options,
    });

    clearTimeout(timeout);

    const type = res.headers.get("content-type");

    if (!res.ok) {
      let msg = "Request failed";

      if (type?.includes("json")) {
        const j = await res.json();
        msg = j.message || msg;
      }

      throw new Error(msg);
    }

    if (type?.includes("json")) {
      return res.json();
    }

    return null;
  } catch (e) {
    if (e.name === "AbortError") {
      throw new Error("Request timeout");
    }

    throw e;
  }
}
