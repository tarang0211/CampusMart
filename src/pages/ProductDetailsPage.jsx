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
} from "../utils/formatters";

import { ImageGallery } from "../components/product/ImageGallery";
import { SellerCard } from "../components/product/SellerCard";
import { Modal } from "../components/common/Modal";
import { Button } from "../components/common/Button";

export const ProductDetailsPage = () => {
  const { id } = useParams();

  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const [reportReason, setReportReason] = useState(
    "Incorrect hostel location or misleading item details"
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://bitmart-backend-r83h.onrender.com/api/items/${id}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch product");
        }

        console.log("Product details:", result);

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

  const getConditionStyle = (condition) => {
    const value = condition?.toLowerCase();

    if (value === "like new") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/70";
    }

    if (value === "good") {
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-900/70";
    }

    if (value === "fair") {
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/70";
    }

    if (value === "new") {
      return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800";
    }

    return "bg-[#f0efeb] text-[#5f5c56] border-[#d8d5cd] dark:bg-[#18201d] dark:text-[#b5bcb8] dark:border-[#35403a]";
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f7f6f2] dark:bg-[#111614]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#cfe2db] border-t-[#176b5b] rounded-full animate-spin mx-auto dark:border-[#29443b] dark:border-t-[#3faf91]" />

          <p className="text-[#77746d] dark:text-[#8f9993]">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] bg-[#f7f6f2] dark:bg-[#111614]">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
          <div className="text-6xl">😕</div>

          <h2 className="text-2xl font-bold text-[#171717] dark:text-[#f3f4f1]">
            Product Not Found
          </h2>

          <p className="text-[#77746d] dark:text-[#8f9993]">
            {error || "The listing you are looking for may have been deleted."}
          </p>

          <Link to="/">
            <Button variant="primary">
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);

    if (!wishlisted) {
      showToast(`Saved "${product.title}" to Wishlist`, "success");
    } else {
      showToast("Removed from Wishlist", "info");
    }
  };

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

  const handleReportSubmit = (e) => {
    e.preventDefault();

    setReportModalOpen(false);

    showToast(
      "Report submitted successfully. Our campus moderation team will review it.",
      "success"
    );
  };

  const sellerPhone =
    product.contactNumber || product.seller?.phone || "";

  return (
    <div className="min-h-screen bg-[#f7f6f2] dark:bg-[#111614]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-[#77746d] dark:text-[#8f9993] overflow-x-auto no-scrollbar">

          <Link
            to="/"
            className="hover:text-[#176b5b] dark:hover:text-[#3faf91] transition-colors"
          >
            Home
          </Link>

          <ChevronRight className="w-3.5 h-3.5 shrink-0" />

          <Link
            to="/"
            className="hover:text-[#176b5b] dark:hover:text-[#3faf91] transition-colors"
          >
            {product.category}
          </Link>

          <ChevronRight className="w-3.5 h-3.5 shrink-0" />

          <span className="text-[#171717] dark:text-[#f3f4f1] font-semibold truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-8">

            <ImageGallery images={product.images} />

            {/* Description */}
            <div className="bg-white dark:bg-[#111b18] rounded-2xl border border-[#dfdcd4] dark:border-[#2a342f] p-6 sm:p-8 space-y-6 shadow-sm">

              <h3 className="text-lg font-bold text-[#171717] dark:text-[#f3f4f1] border-b border-[#ebe8e1] dark:border-[#2a342f] pb-3">
                Item Overview & Details
              </h3>

              <p className="text-[#5f5c56] dark:text-[#b5bcb8] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {product.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#ebe8e1] dark:border-[#2a342f]">

                <div className="p-3 bg-[#f7f6f2] dark:bg-[#18201d] rounded-xl">
                  <span className="text-[11px] font-semibold uppercase text-[#96938b] block">
                    Category
                  </span>

                  <span className="text-sm font-bold text-[#171717] dark:text-[#f3f4f1]">
                    {product.category}
                  </span>
                </div>

                <div className="p-3 bg-[#f7f6f2] dark:bg-[#18201d] rounded-xl">
                  <span className="text-[11px] font-semibold uppercase text-[#96938b] block">
                    Condition
                  </span>

                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md border inline-block mt-0.5 ${getConditionStyle(
                      product.condition
                    )}`}
                  >
                    {product.condition}
                  </span>
                </div>

                <div className="p-3 bg-[#f7f6f2] dark:bg-[#18201d] rounded-xl">
                  <span className="text-[11px] font-semibold uppercase text-[#96938b] block">
                    Hostel
                  </span>

                  <span className="text-sm font-bold text-[#171717] dark:text-[#f3f4f1]">
                    {product.hostel}
                  </span>
                </div>

              </div>

              {/* Safety */}
              <div className="p-4 rounded-xl bg-[#edf6f2] dark:bg-[#182923] border border-[#cfe2db] dark:border-[#315248] flex items-start gap-3">

                <ShieldCheck className="w-5 h-5 text-[#176b5b] dark:text-[#3faf91] shrink-0 mt-0.5" />

                <div className="text-xs text-[#245348] dark:text-[#b7d8ce] leading-relaxed">

                  <strong className="font-bold block text-sm mb-0.5 text-[#176b5b] dark:text-[#5cc5a7]">
                    Campus Safety Guidelines
                  </strong>

                  Always inspect the item in person at the hostel common room
                  or canteen before transferring money.

                </div>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 space-y-6">

            {/* Product Info */}
            <div className="bg-white dark:bg-[#111b18] rounded-2xl border border-[#dfdcd4] dark:border-[#2a342f] p-6 sm:p-8 space-y-6 shadow-sm">

              {/* Top Row */}
              <div className="flex items-center justify-between gap-2">

                <span
                  className={`px-3 py-1 rounded-xl border text-xs font-bold ${getConditionStyle(
                    product.condition
                  )}`}
                >
                  {product.condition}
                </span>

                <div className="flex items-center gap-2">

                  {/* Share */}
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-xl text-[#77746d] hover:text-[#176b5b] dark:hover:text-[#3faf91] hover:bg-[#edf3f0] dark:hover:bg-[#182923] transition-colors"
                    title="Share listing"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-2 rounded-xl border transition-colors ${
                      wishlisted
                        ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/50 dark:border-rose-900 dark:text-rose-400"
                        : "border-[#d8d5cd] dark:border-[#35403a] text-[#77746d] hover:bg-[#f0efeb] dark:hover:bg-[#18201d] hover:text-[#176b5b] dark:hover:text-[#3faf91]"
                    }`}
                    title={
                      wishlisted
                        ? "Remove Wishlist"
                        : "Add to Wishlist"
                    }
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlisted ? "fill-rose-600" : ""
                      }`}
                    />
                  </button>

                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#f3f4f1] leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="p-4 rounded-2xl bg-[#edf6f2] dark:bg-[#182923] border border-[#d4e6df] dark:border-[#315248] flex items-baseline justify-between">

                <div>

                  <span className="text-xs uppercase font-bold text-[#176b5b] dark:text-[#3faf91] block">
                    Asking Price
                  </span>

                  <div className="flex items-baseline gap-2">

                    <span className="text-3xl font-extrabold text-[#176b5b] dark:text-[#3faf91]">
                      {formatCurrency(product.price)}
                    </span>

                    {product.originalPrice && (
                      <span className="text-sm text-[#96938b] line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}

                  </div>
                </div>

                <div className="text-right">

                  <span className="text-xs text-[#96938b] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatTimeAgo(product.postedTime)}
                  </span>

                </div>
              </div>

              {/* Report */}
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

            {/* Seller */}
            <SellerCard
              seller={product.seller}
              productTitle={product.title}
              onContactClick={() => setContactModalOpen(true)}
            />

          </div>
        </div>

        {/* Contact Modal */}
        <Modal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          title="Seller Contact Information"
        >

          <div className="space-y-6 text-center">

            <div className="w-16 h-16 rounded-full bg-[#e7f0ec] dark:bg-[#182923] text-[#176b5b] dark:text-[#3faf91] mx-auto flex items-center justify-center">
              <Phone className="w-8 h-8" />
            </div>

            <div className="space-y-1">

              <h4 className="text-xl font-bold text-[#171717] dark:text-[#f3f4f1]">
                {product.seller?.name || "Campus Seller"}
              </h4>

              <p className="text-sm text-[#77746d] dark:text-[#8f9993]">
                {product.seller?.hostel ||
                  product.hostel ||
                  "Campus"}
              </p>

            </div>

            <div className="p-4 rounded-2xl bg-[#f7f6f2] dark:bg-[#18201d] border border-[#dfdcd4] dark:border-[#35403a]">

              <span className="text-xs uppercase font-bold text-[#96938b] block mb-1">
                Direct Phone Number
              </span>

              <span className="text-2xl font-extrabold text-[#176b5b] dark:text-[#3faf91]">
                {sellerPhone || "Phone number not available"}
              </span>

            </div>

            <div className="flex gap-3">

              {sellerPhone ? (
                <a
                  href={`tel:${sellerPhone}`}
                  className="flex-1"
                >
                  <Button
                    variant="primary"
                    fullWidth
                    icon={Phone}
                    className="!bg-[#176b5b] !border-[#176b5b] hover:!bg-[#125448] hover:!border-[#125448] dark:!bg-[#2f8c76] dark:!border-[#2f8c76] dark:hover:!bg-[#26735f] dark:hover:!border-[#26735f]"
                  >
                    Call Seller
                  </Button>
                </a>
              ) : (
                <Button
                  variant="primary"
                  fullWidth
                  disabled
                  className="flex-1"
                >
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

        {/* Report Modal */}
        <Modal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          title="Report Listing"
        >

          <form
            onSubmit={handleReportSubmit}
            className="space-y-4"
          >

            <p className="text-sm text-[#5f5c56] dark:text-[#b5bcb8]">
              Please let us know why you are reporting this listing.
              We maintain a safe environment for all students.
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
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#dfdcd4] dark:border-[#2a342f] text-sm text-[#363431] dark:text-[#d0d6d3] cursor-pointer hover:bg-[#f7f6f2] dark:hover:bg-[#18201d]"
                >

                  <input
                    type="radio"
                    name="report"
                    checked={reportReason === reason}
                    onChange={() => setReportReason(reason)}
                    className="w-4 h-4 accent-[#176b5b]"
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

              <Button
                variant="danger"
                type="submit"
              >
                Submit Report
              </Button>

            </div>

          </form>
        </Modal>

      </div>
    </div>
  );
};