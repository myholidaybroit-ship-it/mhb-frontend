// MyHolidayBro API client (public site).
//
// A thin, dependency-free wrapper around fetch for talking to backend-mhb.
// This is ADDITIVE — the existing localStorage flows (AuthContext, Wishlist,
// forms) still work untouched. Switch a feature over to the API when ready by
// calling these helpers instead of writing to localStorage.
//
// Configure the base URL with NEXT_PUBLIC_API_URL (see .env.local.example).

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
const TOKEN_KEY = "mhb_token_v1";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = false, headers = {} } = {}) {
  const opts = { method, headers: { ...headers } };
  if (body !== undefined) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  if (auth) {
    const token = getToken();
    if (token) opts.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, opts);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = payload?.error?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.details = payload?.error?.details;
    throw err;
  }
  return payload;
}

export const api = {
  base: BASE_URL,
  get: (p, o) => request(p, { ...o, method: "GET" }),
  post: (p, body, o) => request(p, { ...o, method: "POST", body }),
  put: (p, body, o) => request(p, { ...o, method: "PUT", body }),
  patch: (p, body, o) => request(p, { ...o, method: "PATCH", body }),
  del: (p, o) => request(p, { ...o, method: "DELETE" }),
};

// ── Content ────────────────────────────────────────────────────────────────
export const content = {
  all: () => api.get("/content"),
  section: (key) => api.get(`/content/${key}`),
};

// ── Catalog ──────────────────────────────────────────────────────────────
export const catalog = {
  destinations: (query = "") => api.get(`/destinations${query}`),
  destination: (slug) => api.get(`/destinations/${slug}`),
  weekends: (query = "") => api.get(`/weekends${query}`),
  weekend: (id) => api.get(`/weekends/${id}`),
  moments: () => api.get("/moments"),
  testimonials: () => api.get("/testimonials"),
};

// ── Auth ─────────────────────────────────────────────────────────────────
export const auth = {
  async signup(payload) {
    const r = await api.post("/auth/signup", payload);
    setToken(r.token);
    return r;
  },
  async login(payload) {
    const r = await api.post("/auth/login", payload);
    setToken(r.token);
    return r;
  },
  me: () => api.get("/auth/me", { auth: true }),
  logout: () => setToken(null),
};

// ── Account ───────────────────────────────────────────────────────────────
export const account = {
  profile: () => api.get("/account/profile", { auth: true }),
  updateProfile: (payload) => api.patch("/account/profile", payload, { auth: true }),
  changePassword: (payload) => api.post("/account/change-password", payload, { auth: true }),
  wishlist: () => api.get("/account/wishlist", { auth: true }),
  setWishlist: (items) => api.put("/account/wishlist", { items }, { auth: true }),
  addWishlist: (item) => api.post("/account/wishlist", item, { auth: true }),
  removeWishlist: (id) => api.del(`/account/wishlist/${id}`, { auth: true }),
  clearWishlist: () => api.del("/account/wishlist", { auth: true }),
  bookings: () => api.get("/account/bookings", { auth: true }),
  createBooking: (payload) => api.post("/account/bookings", payload, { auth: true }),
};

// ── Public forms ──────────────────────────────────────────────────────────
export const forms = {
  enquiry: (payload) => api.post("/enquiries", payload),
  subscribe: (email, source) => api.post("/newsletter", { email, source }),
};
