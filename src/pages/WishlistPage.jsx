import React from 'react';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

export const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { products } = useProducts();
  const { showToast } = useToast();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleClearAll = () => {
    clearWishlist();
    showToast('Cleared all items from your Wishlist', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <span>My Saved Wishlist</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            You have {wishlistedProducts.length} items saved in your wishlist.
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <Button
            variant="ghost"
            icon={Trash2}
            onClick={handleClearAll}
            className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            Clear Wishlist
          </Button>
        )}
      </div>

      {/* Grid or Empty State */}
      {wishlistedProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Explore our campus marketplace and click the heart icon on any item card to save items for later!"
          actionLabel="Explore Campus Market"
          onAction={() => window.location.href = '/'}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
