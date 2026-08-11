
const User = require("../models/User");
const Item = require("../models/Item");

// =========================
// GET WISHLIST
// =========================

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate("wishlist");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Get wishlist error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// ADD TO WISHLIST
// =========================

const addToWishlist = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.wishlist.includes(itemId)) {
      return res.status(400).json({
        message: "Item already in wishlist",
      });
    }

    user.wishlist.push(itemId);

    await user.save();

    res.status(200).json({
      message: "Item added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Add wishlist error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// REMOVE FROM WISHLIST
// =========================

const removeFromWishlist = async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== itemId
    );

    await user.save();

    res.status(200).json({
      message: "Item removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Remove wishlist error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
