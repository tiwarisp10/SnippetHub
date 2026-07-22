const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  toggleFavorite,
  searchSnippets,
  getDashboardStats,
  getAnalytics,
} = require("../controllers/snippetController");

const router = express.Router();

// =============================
// SNIPPET ROUTES
// =============================

// Search Snippets
router.get("/search", protect, searchSnippets);

// Get All Snippets
router.get("/", protect, getAllSnippets);

router.get("/stats", protect, getDashboardStats);

router.get("/analytics", protect, getAnalytics);

// Get Single Snippet
router.get("/:id", protect, getSnippetById);

// Create Snippet
router.post("/", protect, createSnippet);

// Update Snippet
router.put("/:id", protect, updateSnippet);

// Delete Snippet
router.delete("/:id", protect, deleteSnippet);

// Toggle Favorite
router.patch("/:id/favorite", protect, toggleFavorite);

module.exports = router;