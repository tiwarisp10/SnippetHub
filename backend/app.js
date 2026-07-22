const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const snippetRoutes = require("./routes/snippetRoutes");

const app = express();

// =============================
// MIDDLEWARES
// =============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// =============================
// ROUTES
// =============================

app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);

// =============================
// TEST ROUTE
// =============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Welcome to SnippetHub API",
  });
});

// =============================
// 404 HANDLER
// =============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
