// frontend/src/api/api.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let parsed;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch (e) {
    parsed = text;
  }

  // If response status is not OK, throw an Error with backend message (if any)
  if (!res.ok) {
    const msg = parsed && parsed.message ? parsed.message : (typeof parsed === 'string' ? parsed : `HTTP ${res.status}`);
    const err = new Error(msg);
    err.status = res.status;
    err.body = parsed;
    throw err;
  }

  return parsed;
}

const api = {
  get: (path, options = {}) => request(path, { method: "GET", ...options }),
  post: (path, body, options = {}) => request(path, { method: "POST", body, ...options }),
};

export default api;
