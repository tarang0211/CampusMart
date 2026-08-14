const Item = require("../models/Item");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

// ==========================================
// Upload Image to Cloudinary
// ==========================================

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "BitMart/items",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// ==========================================
// CREATE ITEM
// ==========================================

const createItem = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);

    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing",
      });
    }

    const {
      title,
      description,
      price,
      category,
      condition,
      hostel,
      contactNumber,
      originalPrice,
    } = req.body;

    // Check required fields
    if (!title || !description || !price || !category || !condition) {
      return res.status(400).json({
        message:
          "Title, description, price, category and condition are required",
      });
    }

    // ==========================================
    // Upload Images
    // ==========================================

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file)),
      );
    }

    // ==========================================
    // Create Item
    // ==========================================

    const item = await Item.create({
      user: req.user,

      title: title.trim(),

      description: description.trim(),

      price: Number(price),

      category,

      condition,

      hostel: hostel || "All Hostels",

      contactNumber: contactNumber || "",

      originalPrice: originalPrice ? Number(originalPrice) : 0,

      images: imageUrls,

      isSold: false,
    });

    // Populate seller information
    await item.populate("user", "name email");

    res.status(201).json(item);
  } catch (error) {
    console.error("Create item error:", error);

    res.status(500).json({
      message: "Failed to create item",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL ITEMS
// ==========================================

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    console.error("Get all items error:", error);

    res.status(500).json({
      message: "Failed to fetch items",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE ITEM
// ==========================================

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Get item error:", error);

    res.status(500).json({
      message: "Failed to fetch item",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE ITEM
// ==========================================

const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    // Check ownership
    if (item.user.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this item",
      });
    }

    // Update allowed fields
    if (req.body.title !== undefined) {
      item.title = req.body.title;
    }

    if (req.body.description !== undefined) {
      item.description = req.body.description;
    }

    if (req.body.price !== undefined) {
      item.price = Number(req.body.price);
    }

    if (req.body.category !== undefined) {
      item.category = req.body.category;
    }

    if (req.body.condition !== undefined) {
      item.condition = req.body.condition;
    }

    if (req.body.hostel !== undefined) {
      item.hostel = req.body.hostel;
    }

    if (req.body.contactNumber !== undefined) {
      item.contactNumber = req.body.contactNumber;
    }

    if (req.body.originalPrice !== undefined) {
      item.originalPrice = Number(req.body.originalPrice);
    }

    if (req.body.isSold !== undefined) {
      item.isSold = req.body.isSold;
    }

    await item.save();

    await item.populate("user", "name email");

    res.status(200).json(item);
  } catch (error) {
    console.error("Update item error:", error);

    res.status(500).json({
      message: "Failed to update item",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE ITEM
// ==========================================

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    // Check ownership
    if (item.user.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this item",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Delete item error:", error);

    res.status(500).json({
      message: "Failed to delete item",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY ITEMS
// ==========================================

const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({
      user: req.user,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    console.error("Get my items error:", error);

    res.status(500).json({
      message: "Failed to fetch your items",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
};
