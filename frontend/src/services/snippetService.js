import api from "./api";

// =========================
// GET ALL SNIPPETS
// =========================
export const getSnippets = (params = {}) => {
  return api.get("/snippets", {
    params,
  });
};

// =========================
// SEARCH SNIPPETS
// =========================
export const searchSnippets = (keyword) => {
  return api.get("/snippets/search", {
    params: {
      keyword,
    },
  });
};

// =========================
// GET SINGLE SNIPPET
// =========================
export const getSnippet = (id) => {
  return api.get(`/snippets/${id}`);
};

// =========================
// CREATE
// =========================
export const createSnippet = (data) => {
  return api.post("/snippets", data);
};

// =========================
// UPDATE
// =========================
export const updateSnippet = (id, data) => {
  return api.put(`/snippets/${id}`, data);
};

// =========================
// DELETE
// =========================
export const deleteSnippet = (id) => {
  return api.delete(`/snippets/${id}`);
};

// =========================
// FAVORITE
// =========================
export const toggleFavorite = (id) => {
  return api.patch(`/snippets/${id}/favorite`);
};

// =========================
// DASHBOARD
// =========================
export const getDashboardStats = () => {
  return api.get("/snippets/stats");
};

export const getAnalytics = () => {
  return api.get("/snippets/analytics");
};