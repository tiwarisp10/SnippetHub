import api from "./api";

export const register = (data) =>
  api.post("/auth/register", data);

export const login = (data) =>
  api.post("/auth/login", data);

export const logout = () =>
  api.post("/auth/logout");

export const getCurrentUser = () =>
  api.get("/auth/me");

export const changePassword = (passwords) =>
    api.put("/auth/change-password", passwords);