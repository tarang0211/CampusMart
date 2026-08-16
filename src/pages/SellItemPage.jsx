import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, PlusCircle, IndianRupee, Sparkles } from "lucide-react";

import { CATEGORIES, HOSTELS, CONDITIONS } from "../data/dummyData";

import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { ProductCard } from "../components/product/ProductCard";

export const SellItemPage = () => {
  const navigate = useNavigate();

  const { fetchProducts } = useProducts();
  const { user } = useAuth();
  const { showToast } = useToast();

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    category: "Books",
    condition: "Like New",
    hostel: user?.hostel || "Bhabha Hall (H-1)",
    description: "",
    contactNumber: user?.phone || "",
  });

  // ==========================================
  // IMAGE STATES
  // ==========================================

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ==========================================
  // IMAGE UPLOAD
  // ==========================================

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    // Maximum 5 images
    if (selectedFiles.length + files.length > 5) {
      showToast("You can upload a maximum of 5 images.", "error");

      e.target.value = "";
      return;
    }

    // Only images
    const invalidFile = files.find((file) => !file.type.startsWith("image/"));

    if (invalidFile) {
      showToast("Only image files are allowed.", "error");

      e.target.value = "";
      return;
    }

    // Maximum 5MB per image
    const largeFile = files.find((file) => file.size > 5 * 1024 * 1024);

    if (largeFile) {
      showToast("Each image must be smaller than 5MB.", "error");

      e.target.value = "";
      return;
    }

    // Save actual files
    setSelectedFiles((prev) => [...prev, ...files]);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };

      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ------------------------------
    // VALIDATION
    // ------------------------------

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Item description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      showToast("Please fix the errors in the form.", "error");

      return;
    }

    try {
      setIsSubmitting(true);

      // ------------------------------
      // GET TOKEN
      // ------------------------------

      const token = localStorage.getItem("BitMart_token");

      if (!token) {
        showToast("Please login first.", "error");

        return;
      }

      // ------------------------------
      // CREATE FORMDATA
      // ------------------------------

      const data = new FormData();

      data.append("title", formData.title.trim());

      data.append("description", formData.description.trim());

      data.append("price", Number(formData.price));

      data.append("category", formData.category);

      data.append("condition", formData.condition);

      data.append("hostel", formData.hostel);

      data.append("contactNumber", formData.contactNumber);

      if (formData.originalPrice) {
        data.append("originalPrice", Number(formData.originalPrice));
      }

      // ------------------------------
      // ADD IMAGES
      // ------------------------------

      selectedFiles.forEach((file) => {
        data.append("images", file);
      });

      // ------------------------------
      // DEBUG
      // ------------------------------

      console.log("Submitting item...");

      console.log("Images selected:", selectedFiles.length);

      // ------------------------------
      // SEND TO BACKEND
      // ------------------------------

      const response = await fetch(
        "https://bitmart-backend-r83h.onrender.com/api/items",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          // IMPORTANT:
          // Do NOT add Content-Type here.
          // Browser automatically creates
          // multipart/form-data boundary.
          body: data,
        },
      );

      const result = await response.json();

      console.log("Create item response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to post item");
      }

      // ------------------------------
      // REFRESH PRODUCTS
      // ------------------------------

      await fetchProducts();

      showToast("Your item has been posted successfully!", "success");

      // ------------------------------
      // REDIRECT
      // ------------------------------

      navigate("/my-listings");
    } catch (error) {
      console.error("Error posting item:", error);

      showToast(error.message || "Failed to post item", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // LIVE PREVIEW
  // ==========================================

  const livePreviewProduct = {
    id: "preview",

    title: formData.title || "Sample Item Title",

    price: formData.price ? Number(formData.price) : 499,

    originalPrice: formData.originalPrice
      ? Number(formData.originalPrice)
      : 999,

    category: formData.category,

    condition: formData.condition,

    hostel: formData.hostel,

    postedTime: new Date().toISOString(),

    isSold: false,

    featured: false,

    images:
      imagePreviews.length > 0
        ? imagePreviews
        : [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
          ],

    description:
      formData.description || "Your item description will appear here.",

    seller: user,
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* HEADER */}

      <div className="space-y-2 border-b border-gray-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <Sparkles className="w-4 h-4" />

          <span>Quick Campus Listing</span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Sell an Item on BitMart
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fill out the details below to post your books, gadgets, or hostel gear
          for students across campus.
        </p>
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =====================================
            FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm"
        >
          {/* =====================================
              IMAGES
          ====================================== */}

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block">
              Upload Item Photos (Up to 5)
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {/* PREVIEWS */}

              {imagePreviews.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800"
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* ADD PHOTO */}

              {imagePreviews.length < 5 && (
                <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 flex flex-col items-center justify-center cursor-pointer bg-gray-50 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors p-2 text-center">
                  <Upload className="w-6 h-6 text-blue-500 mb-1" />

                  <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                    Add Photo
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <p className="text-[11px] text-gray-400">
              Upload up to 5 images. Maximum 5MB per image.
            </p>
          </div>

          {/* =====================================
              TITLE + CATEGORY
          ====================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Item Title"
              name="title"
              placeholder="e.g. Engineering Mathematics HK Dass"
              value={formData.title}
              onChange={handleInputChange}
              error={errors.title}
              required
            />

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Category
                <span className="text-rose-500">*</span>
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* =====================================
              PRICING
          ====================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Selling Price (₹)"
              name="price"
              type="number"
              placeholder="e.g. 450"
              icon={IndianRupee}
              value={formData.price}
              onChange={handleInputChange}
              error={errors.price}
              required
            />

            <Input
              label="Original MRP Price (Optional ₹)"
              name="originalPrice"
              type="number"
              placeholder="e.g. 1200"
              value={formData.originalPrice}
              onChange={handleInputChange}
            />
          </div>

          {/* =====================================
              CONDITION + HOSTEL
          ====================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Condition
                <span className="text-rose-500">*</span>
              </label>

              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Hostel / Location
                <span className="text-rose-500">*</span>
              </label>

              <select
                name="hostel"
                value={formData.hostel}
                onChange={handleInputChange}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {HOSTELS.filter((h) => h !== "All Hostels").map((hostel) => (
                  <option key={hostel} value={hostel}>
                    {hostel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* =====================================
              DESCRIPTION
          ====================================== */}

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Detailed Description
              <span className="text-rose-500">*</span>
            </label>

            <textarea
              name="description"
              rows="4"
              placeholder="Describe the condition, usage period, accessories, reason for selling..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.description && (
              <span className="text-xs text-rose-500 font-medium">
                {errors.description}
              </span>
            )}
          </div>

          {/* =====================================
              CONTACT
          ====================================== */}

          <Input
            label="Contact Phone / WhatsApp Number"
            name="contactNumber"
            placeholder="+91 98765 43210"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />

          {/* =====================================
              SUBMIT
          ====================================== */}

          <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={PlusCircle}
              disabled={isSubmitting}
              className="py-3.5 text-base font-extrabold"
            >
              {isSubmitting ? "Uploading & Posting..." : "Post Item on BitMart"}
            </Button>
          </div>
        </form>

        {/* =====================================
            LIVE PREVIEW
        ====================================== */}

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 space-y-4 shadow-sm sticky top-24">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Live Listing Card Preview
              </span>

              <span className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>

            <ProductCard product={livePreviewProduct} />

            <p className="text-xs text-gray-400 text-center">
              This is how your item will appear to students on the homepage
              feed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
