const DEFAULT_API_BASE_URL = "http://localhost:8000";

const sanitizeBaseUrl = (value) => {
  if (!value || typeof value !== "string") {
    return DEFAULT_API_BASE_URL;
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
};

export const API_BASE_URL = sanitizeBaseUrl(process.env.EXPO_PUBLIC_API_URL);

const withQueryParams = (path, query = {}) => {
  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
};

const parseResponse = async (response) => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const apiRequest = async (path, { method = "GET", query, body, headers = {} } = {}) => {
  const url = withQueryParams(path, query);

  const response = await fetch(url, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message = typeof data === "object" && data?.detail
      ? data.detail
      : `HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
};
