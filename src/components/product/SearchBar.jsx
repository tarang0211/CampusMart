import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export const SearchBar = ({ onOpenMobileFilter }) => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div className="w-full space-y-3">
      <div className="relative flex items-center shadow-lg shadow-blue-500/5 rounded-2xl">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search engineering books, cycles, scientific calculator..."
          className="w-full pl-12 pr-28 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />

        <div className="absolute right-3 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Filter Button for Mobile */}
          {onOpenMobileFilter && (
            <button
              onClick={onOpenMobileFilter}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Popular Quick Tag Shortcuts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-gray-500 dark:text-gray-400 no-scrollbar">
        <span className="font-semibold text-gray-400 uppercase tracking-wider shrink-0 text-[10px]">Popular:</span>
        {['Calculator', 'Engineering Books', 'Bicycle', 'Electric Kettle', 'Study Table'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchQuery(tag)}
            className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors shrink-0 font-medium"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
