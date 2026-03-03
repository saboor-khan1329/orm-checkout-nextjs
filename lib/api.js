const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://orm.test:8000";

export async function apiFetch(endpoint, options = {}) {
  try {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE}${endpoint}`;

    console.log("🚀 API CALL:", url);

    const res = await fetch(url, {
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
      throw new Error(text || "API request failed");
    }

    return await res.json();
  } catch (error) {
    console.error("❌ API ERROR:", error);
    throw error;
  }
}
