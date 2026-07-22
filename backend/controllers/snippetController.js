const Snippet = require("../models/Snippet");
const mongoose = require("mongoose");
// =============================
// CREATE SNIPPET
// =============================

const createSnippet = async (req, res) => {
  try {
    const {
      title,
      description,
      language,
      category,
      tags,
      code,
    } = req.body;

    if (!title || !language || !category || !code) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const snippet = await Snippet.create({
      title,
      description,
      language,
      category,
      tags,
      code,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Snippet created successfully",
      snippet,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =============================
// GET ALL SNIPPETS
// =============================

const getAllSnippets = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = {
      user: req.user.id,
    };

    if (req.query.language) {
      filter.language = req.query.language;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.favorite === "true") {
      filter.favorite = true;
    }

    if (req.query.keyword) {
      filter.$or = [
        {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
      ];
    }

    let sort = {
      createdAt: -1,
    };

    if (req.query.sort === "oldest") {
      sort = {
        createdAt: 1,
      };
    }

    const total = await Snippet.countDocuments(filter);

    const snippets = await Snippet.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSnippets: total,
      snippets,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// GET SINGLE SNIPPET
// =============================

const getSnippetById = async (req, res) => {
  try {

    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    res.status(200).json({
      success: true,
      snippet,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// UPDATE SNIPPET
// =============================

const updateSnippet = async (req, res) => {
  try {

    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Snippet updated successfully",
      snippet: updatedSnippet,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// DELETE SNIPPET
// =============================

const deleteSnippet = async (req, res) => {
  try {

    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    await snippet.deleteOne();

    res.status(200).json({
      success: true,
      message: "Snippet deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// TOGGLE FAVORITE
// =============================

const toggleFavorite = async (req, res) => {
  try {

    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    snippet.favorite = !snippet.favorite;

    await snippet.save();

    res.status(200).json({
      success: true,
      message: "Favorite updated",
      snippet,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// SEARCH SNIPPETS
// =============================

const searchSnippets = async (req, res) => {
  try {

    const keyword = req.query.keyword || "";

    const snippets = await Snippet.find({
      user: req.user.id,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { language: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      count: snippets.length,
      snippets,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// DASHBOARD STATS
// =============================

const getDashboardStats = async (req, res) => {
  try {

    const totalSnippets = await Snippet.countDocuments({
      user: req.user.id,
    });

    const favoriteSnippets = await Snippet.countDocuments({
      user: req.user.id,
      favorite: true,
    });

    const languages = await Snippet.distinct(
      "language",
      {
        user: req.user.id,
      }
    );

    const categories = await Snippet.distinct(
      "category",
      {
        user: req.user.id,
      }
    );

    res.status(200).json({
      success: true,
      stats: {
        totalSnippets,
        favoriteSnippets,
        totalLanguages: languages.length,
        totalCategories: categories.length,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// ANALYTICS
// =============================

const getAnalytics = async (req, res) => {
  try {

    const userId = new mongoose.Types.ObjectId(req.user.id);

    // =============================
    // OVERVIEW
    // =============================

    const totalSnippets = await Snippet.countDocuments({
      user: userId,
    });

    const favoriteSnippets = await Snippet.countDocuments({
      user: userId,
      favorite: true,
    });

    const languagesList = await Snippet.distinct(
      "language",
      {
        user: userId,
      }
    );

    const categoriesList = await Snippet.distinct(
      "category",
      {
        user: userId,
      }
    );

    // =============================
    // LANGUAGE DISTRIBUTION
    // =============================

    const languages = await Snippet.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$language",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
        },
      },
    ]);

    // =============================
    // CATEGORY DISTRIBUTION
    // =============================

    const categories = await Snippet.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
        },
      },
    ]);

    // =============================
    // FAVORITES CHART
    // =============================

    const favorites = {
      favorite: favoriteSnippets,
      others: totalSnippets - favoriteSnippets,
    };

    res.status(200).json({
      success: true,

      overview: {
        totalSnippets,
        favoriteSnippets,
        totalLanguages: languagesList.length,
        totalCategories: categoriesList.length,
      },

      languages,
      categories,
      favorites,
    });

  } catch (error) {

    console.error("Analytics Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  createSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  toggleFavorite,
  searchSnippets,
  getDashboardStats,
  getAnalytics,
};