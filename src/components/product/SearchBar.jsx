import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export const SearchBar = ({ onOpenMobileFilter }) => {
  const { searchQuery, setSearchQuery } = useProducts();

  const popularSearches = [
    'Calculator',
    'Engineering Books',
    'Bicycle',
    'Electric Kettle',
    'Study Table',
  ];

  return (
    <div className="w-full">

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="h-12 w-full rounded-lg border border-[#dedbd3] bg-white pl-12 pr-28 text-[15px] text-[#171717] outline-none transition-all placeholder:text-gray-400 focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/10 dark:border-[#303a35] dark:bg-[#18201d] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-[#3faf91] dark:focus:ring-[#3faf91]/10"
        />

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-[#222c28] dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {onOpenMobileFilter && (
            <button
              type="button"
              onClick={onOpenMobileFilter}
              className="flex h-8 items-center gap-1.5 rounded-md border border-[#dedbd3] bg-[#f7f6f2] px-2.5 text-xs font-semibold text-gray-600 transition-colors hover:border-[#176b5b] hover:text-[#176b5b] dark:border-[#303a35] dark:bg-[#202a26] dark:text-gray-300 dark:hover:border-[#3faf91] dark:hover:text-[#3faf91] lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">

        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Popular
        </span>

        {popularSearches.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSearchQuery(tag)}
            className="shrink-0 border-b border-transparent px-1 text-xs font-medium text-gray-500 transition-colors hover:border-[#176b5b] hover:text-[#176b5b] dark:text-gray-400 dark:hover:border-[#3faf91] dark:hover:text-[#3faf91]"
          >
            {tag}
          </button>
        ))}

      </div>
    </div>
  );
};