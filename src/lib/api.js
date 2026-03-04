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
        ...options.headers,
      },
      ...options,
    });

    clearTimeout(timeout);

    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      let message = "Request failed";

      if (contentType?.includes("application/json")) {
        const json = await res.json();
        message = json.message || message;
      } else {
        message = await res.text();
      }

      throw new Error(message);
    }

    if (contentType?.includes("application/json")) {
      return res.json();
    }

    return null;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }

    throw error;
  }
}
