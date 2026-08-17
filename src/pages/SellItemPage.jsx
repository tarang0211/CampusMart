import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  X,
  PlusCircle,
  IndianRupee,
  Sparkles,
} from "lucide-react";

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

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    if (selectedFiles.length + files.length > 5) {
      showToast("You can upload a maximum of 5 images.", "error");
      e.target.value = "";
      return;
    }

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {
      showToast("Only image files are allowed.", "error");
      e.target.value = "";
      return;
    }

    const largeFile = files.find(
      (file) => file.size > 5 * 1024 * 1024
    );

    if (largeFile) {
      showToast("Each image must be smaller than 5MB.", "error");
      e.target.value = "";
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };

      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeImage = (index) => {
    setSelectedFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setImagePreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const token = localStorage.getItem("BitMart_token");

      if (!token) {
        showToast("Please login first.", "error");
        return;
      }

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("price", Number(formData.price));
      data.append("category", formData.category);
      data.append("condition", formData.condition);
      data.append("hostel", formData.hostel);
      data.append("contactNumber", formData.contactNumber);

      if (formData.originalPrice) {
        data.append(
          "originalPrice",
          Number(formData.originalPrice)
        );
      }

      selectedFiles.forEach((file) => {
        data.append("images", file);
      });

      console.log("Submitting item...");
      console.log("Images selected:", selectedFiles.length);

      const response = await fetch(
        "https://bitmart-backend-r83h.onrender.com/api/items",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      console.log("Create item response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to post item"
        );
      }

      await fetchProducts();

      showToast(
        "Your item has been posted successfully!",
        "success"
      );

      navigate("/my-listings");
    } catch (error) {
      console.error("Error posting item:", error);

      showToast(
        error.message || "Failed to post item",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const livePreviewProduct = {
    id: "preview",

    title:
      formData.title || "Sample Item Title",

    price: formData.price
      ? Number(formData.price)
      : 499,

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
      formData.description ||
      "Your item description will appear here.",

    seller: user,
  };

  return (
    <div className="min-h-screen w-full bg-[#0c1411] text-[#eef3f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">

        {/* HEADER */}

        <div className="space-y-3 border-b border-[#26352f] pb-7">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16352d] border border-[#245247] text-[#45b89b] text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Quick Campus Listing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f1f5f3]">
            Sell an Item on BitMart
          </h1>

          <p className="text-sm sm:text-base text-[#91a19a] max-w-2xl leading-relaxed">
            Fill out the details below to post your books,
            gadgets, or hostel gear for students across campus.
          </p>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 bg-[#121b18] rounded-3xl border border-[#26352f] p-6 sm:p-8 space-y-7 shadow-xl"
          >

            {/* IMAGES */}

            <div className="space-y-4">

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#c5d0cb] block">
                  Upload Item Photos
                </label>

                <p className="text-xs text-[#71817a] mt-1">
                  Add up to 5 clear photos of your item.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">

                {imagePreviews.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group aspect-square rounded-2xl overflow-hidden border border-[#304039] bg-[#18221f]"
                  >
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {imagePreviews.length < 5 && (
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-[#35463f] hover:border-[#3aaa91] flex flex-col items-center justify-center cursor-pointer bg-[#17211e] hover:bg-[#1b302a] transition-all p-2 text-center">

                    <div className="w-10 h-10 rounded-xl bg-[#193a32] flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5 text-[#45b89b]" />
                    </div>

                    <span className="text-[11px] font-semibold text-[#aebbb5]">
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

              <p className="text-[11px] text-[#687871]">
                Maximum 5 images · Maximum 5MB per image.
              </p>

            </div>

            {/* TITLE + CATEGORY */}

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

                <label className="text-xs font-semibold uppercase tracking-wider text-[#c5d0cb]">
                  Category{" "}
                  <span className="text-rose-500">*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#35463f] bg-[#17211e] text-[#eef3f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#3aaa91] focus:border-[#3aaa91] transition-all"
                >
                  {CATEGORIES
                    .filter((c) => c.id !== "all")
                    .map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}
                        className="bg-[#17211e] text-[#eef3f0]"
                      >
                        {cat.label}
                      </option>
                    ))}
                </select>

              </div>

            </div>

            {/* PRICING */}

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

            {/* CONDITION + HOSTEL */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="flex flex-col space-y-1.5">

                <label className="text-xs font-semibold uppercase tracking-wider text-[#c5d0cb]">
                  Condition{" "}
                  <span className="text-rose-500">*</span>
                </label>

                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#35463f] bg-[#17211e] text-[#eef3f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#3aaa91] focus:border-[#3aaa91] transition-all"
                >
                  {CONDITIONS.map((cond) => (
                    <option
                      key={cond}
                      value={cond}
                      className="bg-[#17211e] text-[#eef3f0]"
                    >
                      {cond}
                    </option>
                  ))}
                </select>

              </div>

              <div className="flex flex-col space-y-1.5">

                <label className="text-xs font-semibold uppercase tracking-wider text-[#c5d0cb]">
                  Hostel / Location{" "}
                  <span className="text-rose-500">*</span>
                </label>

                <select
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleInputChange}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#35463f] bg-[#17211e] text-[#eef3f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#3aaa91] focus:border-[#3aaa91] transition-all"
                >
                  {HOSTELS
                    .filter((h) => h !== "All Hostels")
                    .map((hostel) => (
                      <option
                        key={hostel}
                        value={hostel}
                        className="bg-[#17211e] text-[#eef3f0]"
                      >
                        {hostel}
                      </option>
                    ))}
                </select>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="flex flex-col space-y-1.5">

              <label className="text-xs font-semibold uppercase tracking-wider text-[#c5d0cb]">
                Detailed Description{" "}
                <span className="text-rose-500">*</span>
              </label>

              <textarea
                name="description"
                rows="5"
                placeholder="Describe the condition, usage period, accessories, reason for selling..."
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border border-[#35463f] bg-[#17211e] text-[#eef3f0] placeholder:text-[#63736c] text-sm focus:outline-none focus:ring-2 focus:ring-[#3aaa91] focus:border-[#3aaa91] transition-all resize-none"
              />

              {errors.description && (
                <span className="text-xs text-rose-500 font-medium">
                  {errors.description}
                </span>
              )}

            </div>

            {/* CONTACT */}

            <Input
              label="Contact Phone / WhatsApp Number"
              name="contactNumber"
              placeholder="+91 98765 43210"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />

            {/* SUBMIT */}

            <div className="pt-5 border-t border-[#26352f]">

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                icon={PlusCircle}
                disabled={isSubmitting}
                className="py-3.5 text-base font-extrabold bg-[#2f9f87] hover:bg-[#278b76] shadow-lg shadow-[#2f9f87]/20"
              >
                {isSubmitting
                  ? "Uploading & Posting..."
                  : "Post Item on BitMart"}
              </Button>

            </div>

          </form>

          {/* LIVE PREVIEW */}

          <div className="lg:col-span-4 space-y-4">

            <div className="bg-[#121b18] rounded-3xl border border-[#26352f] p-6 space-y-5 shadow-xl lg:sticky lg:top-24">

              <div className="flex items-center justify-between border-b border-[#26352f] pb-4">

                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#aab7b1]">
                    Live Listing Preview
                  </span>

                  <p className="text-[11px] text-[#687871] mt-1">
                    Preview of your marketplace card
                  </p>
                </div>

                <span className="bg-[#193a32] border border-[#285c4e] text-[#48b99c] text-[10px] font-bold px-2.5 py-1 rounded-full">
                  LIVE
                </span>

              </div>

              <div className="rounded-2xl overflow-hidden">
                <ProductCard product={livePreviewProduct} />
              </div>

              <p className="text-xs text-[#71817a] text-center leading-relaxed">
                This is how your item will appear to students
                on the BitMart marketplace.
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};