import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  PlusCircle,
  CheckCircle2,
  Edit,
  Trash2,
  Tag,
  AlertTriangle
} from 'lucide-react';

import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

import {
  formatCurrency,
  formatTimeAgo,
  getConditionBadge
} from '../utils/formatters';

import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { EmptyState } from '../components/common/EmptyState';

export const MyListingsPage = () => {
  const {
    products,
    fetchMyProducts,
    markAsSold,
    deleteProduct,
    editProduct
  } = useProducts();

  const { user } = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: '',
    price: '',
    description: ''
  });

  // ==========================================
  // LOAD MY LISTINGS
  // ==========================================

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
        console.error(
          'Error loading my listings:',
          error
        );

        showToast(
          error.message || 'Failed to load your listings',
          'error'
        );
      } finally {
        setLoading(false);
      }
    };

    loadMyListings();

    // Intentionally only run when logged-in user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ==========================================
  // MY LISTINGS
  // ==========================================

  // /my-items API already returns only current user's items
  const userListings = user ? products : [];

  const activeCount = userListings.filter(
    (product) => !product.isSold
  ).length;

  const soldCount = userListings.filter(
    (product) => product.isSold
  ).length;

  // ==========================================
  // TOGGLE SOLD
  // ==========================================

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
          'success'
        );
      } else {
        showToast(
          'Listing re-activated for sale',
          'info'
        );
      }
    } catch (error) {
      console.error(
        'Error changing sold status:',
        error
      );

      showToast(
        error.message || 'Failed to update listing',
        'error'
      );
    }
  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);

    setEditForm({
      title: product.title || '',
      price: product.price || '',
      description: product.description || ''
    });
  };

  // ==========================================
  // SAVE EDIT
  // ==========================================

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingProduct) return;

    try {
      await editProduct(
        editingProduct.id,
        {
          title: editForm.title,
          price: Number(editForm.price),
          description: editForm.description
        }
      );

      showToast(
        'Listing updated successfully!',
        'success'
      );

      setEditingProduct(null);

    } catch (error) {
      console.error(
        'Error updating listing:',
        error
      );

      showToast(
        error.message || 'Failed to update listing',
        'error'
      );
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleConfirmDelete = async () => {
    if (!deletingProductId) return;

    try {
      await deleteProduct(
        deletingProductId
      );

      showToast(
        'Listing deleted from CampusMart',
        'info'
      );

      setDeletingProductId(null);

    } catch (error) {
      console.error(
        'Error deleting listing:',
        error
      );

      showToast(
        error.message || 'Failed to delete listing',
        'error'
      );
    }
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">

        <div className="w-14 h-14 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />

        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Loading your listings...
        </p>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-6">

        <div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">

            <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />

            <span>
              My Campus Listings
            </span>

          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your posted items, update prices,
            or mark items as sold.
          </p>

        </div>

        <Link to="/sell">

          <Button
            variant="primary"
            icon={PlusCircle}
            className="font-bold"
          >
            Post New Item
          </Button>

        </Link>

      </div>


      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* TOTAL */}

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">

          <div>

            <span className="text-xs uppercase font-bold text-gray-400">
              Total Listings
            </span>

            <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">
              {userListings.length}
            </div>

          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 rounded-xl">

            <Package className="w-6 h-6" />

          </div>

        </div>


        {/* ACTIVE */}

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">

          <div>

            <span className="text-xs uppercase font-bold text-gray-400">
              Active Listings
            </span>

            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {activeCount}
            </div>

          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-xl">

            <Tag className="w-6 h-6" />

          </div>

        </div>


        {/* SOLD */}

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">

          <div>

            <span className="text-xs uppercase font-bold text-gray-400">
              Items Sold
            </span>

            <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-0.5">
              {soldCount}
            </div>

          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-950/60 text-purple-600 rounded-xl">

            <CheckCircle2 className="w-6 h-6" />

          </div>

        </div>

      </div>


      {/* EMPTY STATE */}

      {userListings.length === 0 ? (

        <EmptyState
          icon={Package}
          title="You have no listings"
          description="Have old books, cycles, or hostel items you no longer need? Post them now."
          actionLabel="Post Your First Item"
          onAction={() =>
            window.location.href = '/sell'
          }
        />

      ) : (

        /* LISTINGS */

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {userListings.map((product) => (

            <div
              key={product.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden transition-all ${
                product.isSold
                  ? 'opacity-75'
                  : ''
              }`}
            >

              {/* IMAGE */}

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-slate-800">

                <img
                  src={
                    product.images &&
                    product.images.length > 0
                      ? product.images[0]
                      : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
                  }
                  alt={product.title}
                  className={`w-full h-full object-cover ${
                    product.isSold
                      ? 'grayscale'
                      : ''
                  }`}
                />

                {/* SOLD OVERLAY */}

                {product.isSold && (

                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center">

                    <span className="bg-rose-600 text-white font-extrabold uppercase text-xs tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      SOLD
                    </span>

                  </div>

                )}

                {/* CATEGORY */}

                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-lg">

                  {product.category}

                </div>

              </div>


              {/* CONTENT */}

              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">

                <div className="space-y-2">

                  <div className="flex items-center justify-between text-xs">

                    <span
                      className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${getConditionBadge(
                        product.condition
                      )}`}
                    >
                      {product.condition}
                    </span>

                    <span className="text-gray-400 font-medium">
                      {formatTimeAgo(
                        product.postedTime
                      )}
                    </span>

                  </div>


                  <Link
                    to={`/product/${product.id}`}
                    className="block"
                  >

                    <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1 hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>

                  </Link>


                  <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">

                    {formatCurrency(
                      product.price
                    )}

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2">

                  {/* SOLD */}

                  <button
                    onClick={() =>
                      handleToggleSold(
                        product.id,
                        product.isSold,
                        product.title
                      )
                    }
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                      product.isSold
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-gray-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 dark:text-gray-200'
                    }`}
                  >

                    <CheckCircle2 className="w-3.5 h-3.5" />

                    <span>
                      {product.isSold
                        ? 'Mark Available'
                        : 'Mark Sold'}
                    </span>

                  </button>


                  {/* EDIT */}

                  <button
                    onClick={() =>
                      handleOpenEditModal(
                        product
                      )
                    }
                    className="p-2 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800 transition-colors"
                    title="Edit Listing"
                  >

                    <Edit className="w-4 h-4" />

                  </button>


                  {/* DELETE */}

                  <button
                    onClick={() =>
                      setDeletingProductId(
                        product.id
                      )
                    }
                    className="p-2 rounded-xl border border-gray-200 dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
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
                title: e.target.value
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
                price: e.target.value
              }))
            }
            required
          />


          <div className="flex flex-col space-y-1.5">

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Description
            </label>

            <textarea
              rows="3"
              value={editForm.description}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="space-y-4 text-center">

          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 mx-auto flex items-center justify-center">

            <AlertTriangle className="w-6 h-6" />

          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this
            listing from CampusMart? This action
            cannot be undone.
          </p>

          <div className="pt-4 flex justify-end gap-3">

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
            >
              Yes, Delete Listing
            </Button>

          </div>

        </div>

      </Modal>

    </div>
  );
};