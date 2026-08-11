import React from 'react';
import { SlidersHorizontal, RotateCcw, Building, Tag, ArrowUpDown, IndianRupee, Layers } from 'lucide-react';
import { HOSTELS, CONDITIONS, CATEGORIES } from '../../data/dummyData';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../common/Button';

export const FilterSidebar = ({ className = '', onCloseMobile }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedHostel,
    setSelectedHostel,
    selectedCondition,
    setSelectedCondition,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    resetFilters
  } = useProducts();

  return (
    <aside className={`bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 space-y-6 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-base">
          <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Filter & Sort</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-blue-500" />
          Sort Order
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full py-2.5 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Latest Campus Posts</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Category Dropdown/Pills */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-500" />
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full py-2.5 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Hostel Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-blue-500" />
          Hostel / Campus Zone
        </label>
        <select
          value={selectedHostel}
          onChange={(e) => setSelectedHostel(e.target.value)}
          className="w-full py-2.5 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {HOSTELS.map(hostel => (
            <option key={hostel} value={hostel}>
              {hostel}
            </option>
          ))}
        </select>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-blue-500" />
            Max Price
          </label>
          <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
            {formatCurrency(priceRange)}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[11px] text-gray-400 font-medium">
          <span>₹100</span>
          <span>₹10,000+</span>
        </div>
      </div>

      {/* Item Condition Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-blue-500" />
          Item Condition
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="radio"
              name="condition"
              checked={selectedCondition === 'all'}
              onChange={() => setSelectedCondition('all')}
              className="w-4 h-4 text-blue-600 accent-blue-600"
            />
            <span>All Conditions</span>
          </label>
          {CONDITIONS.map(cond => (
            <label key={cond} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="radio"
                name="condition"
                checked={selectedCondition === cond}
                onChange={() => setSelectedCondition(cond)}
                className="w-4 h-4 text-blue-600 accent-blue-600"
              />
              <span>{cond}</span>
            </label>
          ))}
        </div>
      </div>

      {onCloseMobile && (
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
          <Button variant="primary" fullWidth onClick={onCloseMobile}>
            Apply Filters
          </Button>
        </div>
      )}
    </aside>
  );
};
