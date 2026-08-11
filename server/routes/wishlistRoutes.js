
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// =========================
// GET WISHLIST
// =========================

router.get("/", protect, getWishlist);

// =========================
// ADD TO WISHLIST
// =========================

router.post("/:itemId", protect, addToWishlist);

// =========================
// REMOVE FROM WISHLIST
// =========================

router.delete("/:itemId", protect, removeFromWishlist);

module.exports = router;
