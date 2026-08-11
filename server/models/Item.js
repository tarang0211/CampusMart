const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    // =========================
    // SELLER
    // =========================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =========================
    // ITEM DETAILS
    // =========================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    // =========================
    // LOCATION
    // =========================

    hostel: {
      type: String,
      default: "All Hostels",
    },

    // =========================
    // CONTACT
    // =========================

    contactNumber: {
      type: String,
      default: "",
    },

    // =========================
    // IMAGES
    // =========================

    images: {
      type: [String],
      default: [],
    },

    // =========================
    // SOLD STATUS
    // =========================

    isSold: {
      type: Boolean,
      default: false,
    },

    // =========================
    // FEATURED
    // =========================

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);