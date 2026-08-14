import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Clock,
  Heart,
  Share2,
  Flag,
  ShieldCheck,
  Phone,
} from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

import {
  formatCurrency,
  formatTimeAgo,
  getConditionBadge,
} from "../utils/formatters";

import { ImageGallery } from "../components/product/ImageGallery";
import { SellerCard } from "../components/product/SellerCard";
import { ProductCard } from "../components/product/ProductCard";
import { Modal } from "../components/common/Modal";
import { Button } from "../components/common/Button";

export const ProductDetailsPage = () => {
  const { id } = useParams();

  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  // =========================
  // PRODUCT STATE
  // =========================

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // MODAL STATES
  // =========================

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const [reportReason, setReportReason] = useState(
    "Incorrect hostel location or misleading item details",
  );

  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`http://localhost:5000/api/items/${id}`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch product");
        }

        console.log("Product details:", result);

        // =========================
        // BACKEND → FRONTEND MAPPING
        // =========================

        const mappedProduct = {
          id: result._id,

          title: result.title,

          description: result.description,

          price: Number(result.price),

          originalPrice: result.originalPrice
            ? Number(result.originalPrice)
            : null,

          category: result.category,

          condition: result.condition,

          hostel: result.hostel || "Campus",

          contactNumber: result.contactNumber || "",

          images:
            result.images && result.images.length > 0
              ? result.images
              : [
                  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
                ],

          postedTime: result.createdAt || new Date().toISOString(),

          isSold: result.isSold || false,

          featured: result.featured || false,

          seller: {
            id: result.user?._id || result.user?.id || "",

            name: result.user?.name || "Campus Seller",

            email: result.user?.email || "",

            phone: result.contactNumber || result.user?.phone || "",

            hostel: result.hostel || result.user?.hostel || "Campus",
          },
        };

        setProduct(mappedProduct);
      } catch (err) {
        console.error("Product fetch error:", err);

        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="text-gray-500 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR / NOT FOUND
  // =========================

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="text-6xl">😕</div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Product Not Found
        </h2>

        <p className="text-gray-500 dark:text-gray-400">
          {error || "The listing you are looking for may have been deleted."}
        </p>

        <Link to="/">
          <Button variant="primary">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  // =========================
  // WISHLIST
  // =========================

  const wishlisted = isWishlisted(product.id);

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);

    if (!wishlisted) {
      showToast(`Saved "${product.title}" to Wishlist`, "success");
    } else {
      showToast("Removed from Wishlist", "info");
    }
  };

  // =========================
  // SHARE
  // =========================

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: `Check out this item on BitMart: ${product.title}`,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);

        showToast("Listing link copied to clipboard!", "info");
      }
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  // =========================
  // REPORT
  // =========================

  const handleReportSubmit = (e) => {
    e.preventDefault();

    setReportModalOpen(false);

    showToast(
      "Report submitted successfully. Our campus moderation team will review it.",
      "success",
    );
  };

  // =========================
  // PHONE
  // =========================

  const sellerPhone = product.contactNumber || product.seller?.phone || "";

  // =========================
  // JSX
  // =========================

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      {/* =========================
          BREADCRUMB
      ========================= */}

      <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 overflow-x-auto no-scrollbar">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>

        <ChevronRight className="w-3.5 h-3.5" />

        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          {product.category}
        </Link>

        <ChevronRight className="w-3.5 h-3.5" />

        <span className="text-gray-900 dark:text-white font-semibold truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================
            LEFT COLUMN
        ========================= */}

        <div className="lg:col-span-7 space-y-8">
          {/* IMAGE GALLERY */}

          <ImageGallery images={product.images} />

          {/* DESCRIPTION */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-3">
              Item Overview & Details
            </h3>

            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            {/* QUICK SPECS */}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
              <div className="p-3 bg-gray-50 dark:bg-slate-800/60 rounded-2xl">
                <span className="text-[11px] font-semibold uppercase text-gray-400 block">
                  Category
                </span>

                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {product.category}
                </span>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-slate-800/60 rounded-2xl">
                <span className="text-[11px] font-semibold uppercase text-gray-400 block">
                  Condition
                </span>

                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 ${getConditionBadge(
                    product.condition,
                  )}`}
                >
                  {product.condition}
                </span>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-slate-800/60 rounded-2xl">
                <span className="text-[11px] font-semibold uppercase text-gray-400 block">
                  Hostel
                </span>

                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {product.hostel}
                </span>
              </div>
            </div>

            {/* SAFETY */}

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />

              <div className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                <strong className="font-bold block text-sm mb-0.5">
                  Campus Safety Guidelines
                </strong>
                Always inspect the item in person at the hostel common room or
                canteen before transferring money.
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            RIGHT COLUMN
        ========================= */}

        <div className="lg:col-span-5 space-y-6">
          {/* TITLE + PRICE */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            {/* BADGES */}

            <div className="flex items-center justify-between gap-2">
              <span
                className={`px-3 py-1 rounded-xl border text-xs font-bold ${getConditionBadge(
                  product.condition,
                )}`}
              >
                {product.condition}
              </span>

              <div className="flex items-center gap-2">
                {/* SHARE */}

                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  title="Share listing"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* WISHLIST */}

                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-xl border transition-colors ${
                    wishlisted
                      ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/60 dark:border-rose-900"
                      : "border-gray-200 dark:border-slate-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
                  title={wishlisted ? "Remove Wishlist" : "Add to Wishlist"}
                >
                  <Heart
                    className={`w-4 h-4 ${wishlisted ? "fill-rose-600" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* TITLE */}

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            {/* PRICE */}

            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-blue-600 dark:text-blue-400 block">
                  Asking Price
                </span>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                    {formatCurrency(product.price)}
                  </span>

                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />

                  {formatTimeAgo(product.postedTime)}
                </span>
              </div>
            </div>

            {/* REPORT */}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setReportModalOpen(true)}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 flex items-center gap-1.5 transition-colors"
              >
                <Flag className="w-3.5 h-3.5" />

                <span>Report this listing</span>
              </button>
            </div>
          </div>

          {/* SELLER */}

          <SellerCard
            seller={product.seller}
            productTitle={product.title}
            onContactClick={() => setContactModalOpen(true)}
          />
        </div>
      </div>

      {/* =========================
          CONTACT MODAL
      ========================= */}

      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title="Seller Contact Information"
      >
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 mx-auto flex items-center justify-center">
            <Phone className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
              {product.seller?.name || "Campus Seller"}
            </h4>

            <p className="text-sm text-gray-500">
              {product.seller?.hostel || product.hostel || "Campus"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <span className="text-xs uppercase font-bold text-gray-400 block mb-1">
              Direct Phone Number
            </span>

            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              {sellerPhone || "Phone number not available"}
            </span>
          </div>

          <div className="flex gap-3">
            {sellerPhone ? (
              <a href={`tel:${sellerPhone}`} className="flex-1">
                <Button variant="primary" fullWidth icon={Phone}>
                  Call Seller
                </Button>
              </a>
            ) : (
              <Button variant="primary" fullWidth disabled className="flex-1">
                Phone Unavailable
              </Button>
            )}

            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setContactModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* =========================
          REPORT MODAL
      ========================= */}

      <Modal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title="Report Listing"
      >
        <form onSubmit={handleReportSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Please let us know why you are reporting this listing. We maintain a
            safe environment for all students.
          </p>

          <div className="space-y-2">
            {[
              "Incorrect hostel location or misleading item details",
              "Overpriced or fake product description",
              "Item is already sold or unavailable",
              "Spam or inappropriate content",
            ].map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-slate-800 text-sm text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <input
                  type="radio"
                  name="report"
                  checked={reportReason === reason}
                  onChange={() => setReportReason(reason)}
                  className="w-4 h-4 text-blue-600 accent-blue-600"
                />

                <span>{reason}</span>
              </label>
            ))}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setReportModalOpen(false)}
            >
              Cancel
            </Button>

            <Button variant="danger" type="submit">
              Submit Report
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
