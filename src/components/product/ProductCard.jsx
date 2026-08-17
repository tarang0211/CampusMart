import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock } from 'lucide-react';

import {
  formatCurrency,
  formatTimeAgo,
  getConditionBadge,
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
    <article className="group overflow-hidden rounded-lg border border-[#e3e0d8] bg-white transition-colors duration-200 hover:border-[#c8c4ba] dark:border-[#2a342f] dark:bg-[#111b18] dark:hover:border-[#3b4842]">

      {/* IMAGE */}
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-[#eeece6] dark:bg-[#202a26]"
      >
        <img
          src={
            product.images?.[0] ||
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800'
          }
          alt={product.title}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025] ${
            product.isSold ? 'opacity-50 grayscale' : ''
          }`}
        />

        {/* SOLD */}
        {product.isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="rounded-md bg-[#171717] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
              Sold
            </span>
          </div>
        )}

        {/* WISHLIST */}
        {!product.isSold && (
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-150 ${
              wishlisted
                ? 'border-[#c95c55] bg-[#c95c55] text-white'
                : 'border-white/70 bg-white/95 text-[#4b4b47] hover:border-white hover:text-[#c95c55] dark:border-[#35403a] dark:bg-[#18201d]/95 dark:text-[#d0d6d3] dark:hover:border-[#46534d] dark:hover:text-[#e47770]'
            }`}
            title={
              wishlisted
                ? 'Remove from Wishlist'
                : 'Add to Wishlist'
            }
            aria-label={
              wishlisted
                ? 'Remove from Wishlist'
                : 'Add to Wishlist'
            }
          >
            <Heart
              className={`h-4 w-4 ${
                wishlisted ? 'fill-current' : ''
              }`}
            />
          </button>
        )}

        {/* FEATURED */}
        {product.featured && !product.isSold && (
          <span className="absolute bottom-3 left-3 rounded-md bg-[#176b5b] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white dark:bg-[#2f8c76]">
            Featured
          </span>
        )}
      </Link>

      {/* DETAILS */}
      <div className="p-4">

        {/* LOCATION + CONDITION */}
        <div className="mb-2.5 flex items-center justify-between gap-2">

          <span className="flex min-w-0 items-center gap-1.5 text-xs text-[#77746d] dark:text-[#929b95]">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#176b5b] dark:text-[#3faf91]" />

            <span className="truncate">
              {product.hostel || 'Hostel not specified'}
            </span>
          </span>

          {product.condition && (
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${getConditionBadge(
                product.condition
              )}`}
            >
              {product.condition}
            </span>
          )}

        </div>

        {/* TITLE */}
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[2.75rem] text-[15px] font-semibold leading-5 text-[#222220] transition-colors group-hover:text-[#176b5b] dark:text-[#f3f4f1] dark:group-hover:text-[#3faf91]">
            {product.title}
          </h3>
        </Link>

        {/* PRICE + TIME */}
        <div className="mt-4 flex items-end justify-between gap-3">

          <div className="min-w-0">

            <div className="flex items-baseline gap-2">

              <span className="text-lg font-bold text-[#176b5b] dark:text-[#3faf91]">
                {formatCurrency(product.price)}
              </span>

              {product.originalPrice && (
                <span className="text-xs text-[#99968f] line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}

            </div>

          </div>

          <div className="flex shrink-0 items-center gap-1 text-[11px] text-[#99968f] dark:text-[#747e78]">
            <Clock className="h-3 w-3" />
            <span>
              {formatTimeAgo(product.postedTime)}
            </span>
          </div>

        </div>

      </div>
    </article>
  );
};