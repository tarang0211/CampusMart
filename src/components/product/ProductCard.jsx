import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock } from 'lucide-react';

import {
  formatCurrency,
  formatTimeAgo,
  getConditionBadge
} from '../../utils/formatters';

import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export const ProductCard = ({ product }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const wishlisted = isWishlisted(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(product.id);

    if (!wishlisted) {
      showToast(
        `Added "${product.title.slice(0, 24)}..." to Wishlist`,
        'success'
      );
    } else {
      showToast('Removed from Wishlist', 'info');
    }
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">

      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-slate-800"
      >
        <img
          src={
            product.images?.[0] ||
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800'
          }
          alt={product.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            product.isSold ? 'opacity-50 grayscale' : ''
          }`}
          loading="lazy"
        />

        {/* =========================
            SOLD OVERLAY
        ========================= */}

        {product.isSold && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-rose-600 text-white font-extrabold uppercase text-xs tracking-widest px-4 py-1.5 rounded-full shadow-lg transform -rotate-6">
              SOLD OUT
            </span>
          </div>
        )}

        {/* =========================
            FEATURED BADGE
        ========================= */}

        {product.featured && !product.isSold && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
            Featured
          </div>
        )}

        {/* =========================
            CATEGORY
        ========================= */}

        <div className="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-lg">
          {product.category}
        </div>

        {/* =========================
            WISHLIST
        ========================= */}

        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/40'
              : 'bg-white/80 dark:bg-slate-900/80 text-gray-700 dark:text-gray-200 hover:bg-white hover:text-rose-500'
          }`}
          title={
            wishlisted
              ? 'Remove from Wishlist'
              : 'Add to Wishlist'
          }
        >
          <Heart
            className={`w-4 h-4 ${
              wishlisted ? 'fill-white' : ''
            }`}
          />
        </button>
      </Link>

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}

      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">

        <div className="space-y-1.5">

          {/* Hostel + Condition */}

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-2">

            <span className="flex items-center gap-1 font-medium truncate text-gray-600 dark:text-gray-300">

              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />

              <span className="truncate">
                {product.hostel || 'Hostel not specified'}
              </span>

            </span>

            <span
              className={`px-2 py-0.5 rounded-md border text-[10px] font-bold shrink-0 ${getConditionBadge(
                product.condition
              )}`}
            >
              {product.condition}
            </span>

          </div>

          {/* Product Title */}

          <Link
            to={`/product/${product.id}`}
            className="block"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>

        </div>

        {/* =========================
            PRICE + TIME
        ========================= */}

        <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">

          <div className="flex items-baseline gap-1.5">

            <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
              {formatCurrency(product.price)}
            </span>

            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}

          </div>

          <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">

            <Clock className="w-3 h-3" />

            <span>
              {formatTimeAgo(product.postedTime)}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};