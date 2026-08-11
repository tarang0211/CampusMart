const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
} = require("../controllers/itemController");

// ==========================================
// TEST ROUTE
// ==========================================

router.get("/test", (req, res) => {
  res.json({
    message: "Item routes are working ✅",
  });
});

// ==========================================
// GET ALL ITEMS
// ==========================================

router.get("/", getAllItems);

// ==========================================
// GET MY ITEMS
// ==========================================

router.get("/my-items", protect, getMyItems);

// ==========================================
// GET SINGLE ITEM
// ==========================================

router.get("/:id", getItemById);

// ==========================================
// UPDATE ITEM
// ==========================================

router.put("/:id", protect, updateItem);

// ==========================================
// DELETE ITEM
// ==========================================

router.delete("/:id", protect, deleteItem);

// ==========================================
// CREATE ITEM + IMAGE UPLOAD
// ==========================================

router.post(
  "/",
  protect,
  upload.array("images", 5),
  createItem
);

module.exports = router;