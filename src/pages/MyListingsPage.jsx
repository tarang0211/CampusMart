import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  PlusCircle,
  CheckCircle2,
  Edit,
  Trash2,
  Tag,
  AlertTriangle,
} from "lucide-react";

import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

import {
  formatCurrency,
  formatTimeAgo,
  getConditionBadge,
} from "../utils/formatters";

import { Modal } from "../components/common/Modal";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { EmptyState } from "../components/common/EmptyState";

export const MyListingsPage = () => {
  const {
    products,
    fetchMyProducts,
    markAsSold,
    deleteProduct,
    editProduct,
  } = useProducts();

  const { user } = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const loadMyListings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        await fetchMyProducts();
      } catch (error) {
        console.error("Error loading my listings:", error);

        showToast(
          error.message || "Failed to load your listings",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    loadMyListings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const userListings = user ? products : [];

  const activeCount = userListings.filter(
    (product) => !product.isSold
  ).length;

  const soldCount = userListings.filter(
    (product) => product.isSold
  ).length;

  const handleToggleSold = async (
    id,
    currentStatus,
    title
  ) => {
    try {
      await markAsSold(id);

      if (!currentStatus) {
        showToast(
          `"${title}" marked as SOLD!`,
          "success"
        );
      } else {
        showToast(
          "Listing re-activated for sale",
          "info"
        );
      }
    } catch (error) {
      console.error(
        "Error changing sold status:",
        error
      );

      showToast(
        error.message ||
          "Failed to update listing",
        "error"
      );
    }
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);

    setEditForm({
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingProduct) return;

    try {
      await editProduct(editingProduct.id, {
        title: editForm.title,
        price: Number(editForm.price),
        description: editForm.description,
      });

      showToast(
        "Listing updated successfully!",
        "success"
      );

      setEditingProduct(null);
    } catch (error) {
      console.error(
        "Error updating listing:",
        error
      );

      showToast(
        error.message ||
          "Failed to update listing",
        "error"
      );
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingProductId) return;

    try {
      await deleteProduct(deletingProductId);

      showToast(
        "Listing deleted from BitMart",
        "info"
      );

      setDeletingProductId(null);
    } catch (error) {
      console.error(
        "Error deleting listing:",
        error
      );

      showToast(
        error.message ||
          "Failed to delete listing",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#f4f3ee] dark:bg-[#0f1512] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#cfe4dc] border-t-[#176b5b] animate-spin" />

        <p className="text-sm font-semibold text-[#77746d] dark:text-[#929b95]">
          Loading your listings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f4f3ee] dark:bg-[#0f1512]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#dedbd3] dark:border-[#29332f] pb-7">

          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#176b5b] text-white flex items-center justify-center shadow-sm">
                <Package className="w-5 h-5" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#222220] dark:text-[#f3f4f1]">
                  My Listings
                </h1>

                <p className="text-sm text-[#77746d] dark:text-[#929b95] mt-0.5">
                  Manage everything you've posted on BitMart.
                </p>
              </div>
            </div>
          </div>

          <Link to="/sell">
            <Button
              variant="primary"
              icon={PlusCircle}
              className="w-full md:w-auto bg-[#176b5b] hover:bg-[#125447] border-[#176b5b] shadow-sm font-bold"
            >
              Post New Item
            </Button>
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* TOTAL */}
          <div className="bg-white dark:bg-[#18201d] p-5 rounded-2xl border border-[#e3e0d8] dark:border-[#303a35] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#99968f]">
                Total Listings
              </span>

              <div className="text-2xl font-extrabold text-[#222220] dark:text-white mt-1">
                {userListings.length}
              </div>
            </div>

            <div className="p-3 bg-[#e8f2ef] dark:bg-[#123b32] text-[#176b5b] dark:text-[#3faf91] rounded-xl">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* ACTIVE */}
          <div className="bg-white dark:bg-[#18201d] p-5 rounded-2xl border border-[#e3e0d8] dark:border-[#303a35] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#99968f]">
                Active Listings
              </span>

              <div className="text-2xl font-extrabold text-[#176b5b] dark:text-[#3faf91] mt-1">
                {activeCount}
              </div>
            </div>

            <div className="p-3 bg-[#e8f2ef] dark:bg-[#123b32] text-[#176b5b] dark:text-[#3faf91] rounded-xl">
              <Tag className="w-6 h-6" />
            </div>
          </div>

          {/* SOLD */}
          <div className="bg-white dark:bg-[#18201d] p-5 rounded-2xl border border-[#e3e0d8] dark:border-[#303a35] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#99968f]">
                Items Sold
              </span>

              <div className="text-2xl font-extrabold text-[#a95650] dark:text-[#e47770] mt-1">
                {soldCount}
              </div>
            </div>

            <div className="p-3 bg-[#f7e9e7] dark:bg-[#3b2422] text-[#a95650] dark:text-[#e47770] rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {userListings.length === 0 ? (
          <div className="bg-white dark:bg-[#18201d] rounded-3xl border border-[#e3e0d8] dark:border-[#303a35] shadow-sm p-8 sm:p-12">
            <EmptyState
              icon={Package}
              title="You have no listings"
              description="Have old books, cycles, or hostel items you no longer need? Post them now."
              actionLabel="Post Your First Item"
              onAction={() => {
                window.location.href = "/sell";
              }}
            />
          </div>
        ) : (

          /* LISTINGS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {userListings.map((product) => (
              <div
                key={product.id}
                className={`group bg-white dark:bg-[#18201d] rounded-2xl border border-[#e3e0d8] dark:border-[#303a35] shadow-sm flex flex-col overflow-hidden transition-all duration-200 hover:border-[#c8c4ba] dark:hover:border-[#46534d] hover:shadow-md ${
                  product.isSold ? "opacity-75" : ""
                }`}
              >

                {/* IMAGE */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eeece6] dark:bg-[#202a26]">

                  <img
                    src={
                      product.images &&
                      product.images.length > 0
                        ? product.images[0]
                        : "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={product.title}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.025] ${
                      product.isSold
                        ? "grayscale"
                        : ""
                    }`}
                  />

                  {/* SOLD OVERLAY */}
                  {product.isSold && (
                    <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                      <span className="bg-[#171717] text-white font-bold uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-md">
                        Sold
                      </span>
                    </div>
                  )}

                  {/* CATEGORY */}
                  {product.category && (
                    <div className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">
                      {product.category}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1 justify-between">

                  <div className="space-y-3">

                    {/* CONDITION + TIME */}
                    <div className="flex items-center justify-between gap-2 text-xs">

                      {product.condition ? (
                        <span
                          className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${getConditionBadge(
                            product.condition
                          )}`}
                        >
                          {product.condition}
                        </span>
                      ) : (
                        <span />
                      )}

                      <span className="text-[#99968f] dark:text-[#747e78] font-medium">
                        {formatTimeAgo(
                          product.postedTime
                        )}
                      </span>
                    </div>

                    {/* TITLE */}
                    <Link
                      to={`/product/${product.id}`}
                      className="block"
                    >
                      <h3 className="font-bold text-[#222220] dark:text-[#f3f4f1] text-[15px] leading-5 line-clamp-2 hover:text-[#176b5b] dark:hover:text-[#3faf91] transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    {/* PRICE */}
                    <div className="text-xl font-extrabold text-[#171717] dark:text-white">
                      {formatCurrency(
                        product.price
                      )}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="pt-4 mt-5 border-t border-[#ebe8e1] dark:border-[#29332f] flex items-center gap-2">

                    {/* SOLD */}
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleSold(
                          product.id,
                          product.isSold,
                          product.title
                        )
                      }
                      className={`flex-1 min-w-0 py-2.5 px-2.5 rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 ${
                        product.isSold
                          ? "bg-[#e8f2ef] text-[#176b5b] dark:bg-[#123b32] dark:text-[#3faf91]"
                          : "bg-[#f1f0eb] text-[#4b4b47] hover:bg-[#e8f2ef] hover:text-[#176b5b] dark:bg-[#202a26] dark:text-[#d2d6d3] dark:hover:bg-[#123b32] dark:hover:text-[#3faf91]"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />

                      <span className="truncate">
                        {product.isSold
                          ? "Mark Available"
                          : "Mark Sold"}
                      </span>
                    </button>

                    {/* EDIT */}
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenEditModal(product)
                      }
                      className="p-2.5 rounded-xl border border-[#dedbd3] dark:border-[#39443f] text-[#5f605b] dark:text-[#b8bfbb] hover:bg-[#e8f2ef] hover:text-[#176b5b] hover:border-[#b9d4cb] dark:hover:bg-[#123b32] dark:hover:text-[#3faf91] dark:hover:border-[#245b4d] transition-colors"
                      title="Edit Listing"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={() =>
                        setDeletingProductId(
                          product.id
                        )
                      }
                      className="p-2.5 rounded-xl border border-[#dedbd3] dark:border-[#39443f] text-[#a95650] dark:text-[#e47770] hover:bg-[#f7e9e7] hover:border-[#e1b5b0] dark:hover:bg-[#3b2422] dark:hover:border-[#673b37] transition-colors"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDIT MODAL */}
        <Modal
          isOpen={!!editingProduct}
          onClose={() =>
            setEditingProduct(null)
          }
          title="Edit Listing Details"
        >
          <form
            onSubmit={handleSaveEdit}
            className="space-y-4"
          >
            <Input
              label="Product Title"
              value={editForm.title}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              required
            />

            <Input
              label="Selling Price (₹)"
              type="number"
              value={editForm.price}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              required
            />

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4b4b47] dark:text-[#d2d6d3]">
                Description
              </label>

              <textarea
                rows="3"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-xl border border-[#d8d5cd] dark:border-[#39443f] bg-white dark:bg-[#18201d] text-[#222220] dark:text-[#f3f4f1] text-sm placeholder:text-[#99968f] focus:outline-none focus:ring-2 focus:ring-[#176b5b]/30 focus:border-[#176b5b] transition-colors"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setEditingProduct(null)
                }
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                type="submit"
                className="bg-[#176b5b] hover:bg-[#125447] border-[#176b5b]"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>

        {/* DELETE MODAL */}
        <Modal
          isOpen={!!deletingProductId}
          onClose={() =>
            setDeletingProductId(null)
          }
          title="Delete Listing Confirmation"
        >
          <div className="space-y-5 text-center">

            <div className="w-12 h-12 rounded-full bg-[#f7e9e7] dark:bg-[#3b2422] text-[#a95650] dark:text-[#e47770] mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <p className="text-sm leading-6 text-[#66655f] dark:text-[#aeb5b1]">
              Are you sure you want to delete this
              listing from BitMart? This action
              cannot be undone.
            </p>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setDeletingProductId(null)
                }
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={handleConfirmDelete}
                className="bg-[#a95650] hover:bg-[#8f4540] border-[#a95650]"
              >
                Yes, Delete Listing
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};