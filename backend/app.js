const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
    origin: "http://localhost:5173",
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
  res.json({
    success: true,
    message: "Welcome to SnippetHub API 🚀",
  });
});

module.exports = app;