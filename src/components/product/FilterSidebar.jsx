import React from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Building,
  Tag,
  ArrowUpDown,
  IndianRupee,
  Layers
} from 'lucide-react';

import {
  HOSTELS,
  CONDITIONS,
  CATEGORIES
} from '../../data/dummyData';

import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../common/Button';

export const FilterSidebar = ({
  className = '',
  onCloseMobile
}) => {
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
    <aside
      className={`space-y-6 rounded-lg border border-[#e3e0d8] bg-white p-5 dark:border-[#303a35] dark:bg-[#18201d] ${className}`}
    >

      {/* =================================
          HEADER
      ================================= */}

      <div className="flex items-center justify-between border-b border-[#ece9e2] pb-4 dark:border-[#2b3530]">

        <div className="flex items-center gap-2 text-sm font-bold text-[#242421] dark:text-[#f3f4f1]">

          <SlidersHorizontal className="h-4 w-4 text-[#176b5b] dark:text-[#3faf91]" />

          <span>Filters</span>

        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs font-semibold text-[#77746d] transition-colors hover:text-[#176b5b] dark:text-[#929b95] dark:hover:text-[#3faf91]"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>

      </div>


      {/* =================================
          SORT
      ================================= */}

      <div className="space-y-2">

        <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#66635d] dark:text-[#a1aaa4]">

          <ArrowUpDown className="h-3.5 w-3.5 text-[#176b5b] dark:text-[#3faf91]" />

          Sort by

        </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-10 w-full rounded-md border border-[#dedbd3] bg-[#faf9f6] px-3 text-sm text-[#33322f] outline-none transition-colors focus:border-[#176b5b] focus:ring-1 focus:ring-[#176b5b]/20 dark:border-[#303a35] dark:bg-[#202a26] dark:text-gray-200 dark:focus:border-[#3faf91]"
        >
          <option value="newest">
            Latest Campus Posts
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>
        </select>

      </div>


      {/* =================================
          CATEGORY
      ================================= */}

      <div className="space-y-2">

        <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#66635d] dark:text-[#a1aaa4]">

          <Layers className="h-3.5 w-3.5 text-[#176b5b] dark:text-[#3faf91]" />

          Category

        </label>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className="h-10 w-full rounded-md border border-[#dedbd3] bg-[#faf9f6] px-3 text-sm text-[#33322f] outline-none transition-colors focus:border-[#176b5b] focus:ring-1 focus:ring-[#176b5b]/20 dark:border-[#303a35] dark:bg-[#202a26] dark:text-gray-200 dark:focus:border-[#3faf91]"
        >
          {CATEGORIES.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.label}
            </option>
          ))}
        </select>

      </div>


      {/* =================================
          HOSTEL
      ================================= */}

      <div className="space-y-2">

        <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#66635d] dark:text-[#a1aaa4]">

          <Building className="h-3.5 w-3.5 text-[#176b5b] dark:text-[#3faf91]" />

          Hostel / Zone

        </label>

        <select
          value={selectedHostel}
          onChange={(e) =>
            setSelectedHostel(e.target.value)
          }
          className="h-10 w-full rounded-md border border-[#dedbd3] bg-[#faf9f6] px-3 text-sm text-[#33322f] outline-none transition-colors focus:border-[#176b5b] focus:ring-1 focus:ring-[#176b5b]/20 dark:border-[#303a35] dark:bg-[#202a26] dark:text-gray-200 dark:focus:border-[#3faf91]"
        >
          {HOSTELS.map((hostel) => (
            <option
              key={hostel}
              value={hostel}
            >
              {hostel}
            </option>
          ))}
        </select>

      </div>


      {/* =================================
          PRICE
      ================================= */}

      <div className="space-y-3">

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#66635d] dark:text-[#a1aaa4]">

            <IndianRupee className="h-3.5 w-3.5 text-[#176b5b] dark:text-[#3faf91]" />

            Max price

          </label>

          <span className="text-sm font-bold text-[#176b5b] dark:text-[#3faf91]">
            {formatCurrency(priceRange)}
          </span>

        </div>

        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={priceRange}
          onChange={(e) =>
            setPriceRange(Number(e.target.value))
          }
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#ddd9d0] accent-[#176b5b] dark:bg-[#35403a] dark:accent-[#3faf91]"
        />

        <div className="flex justify-between text-[10px] font-medium text-[#99968f]">
          <span>₹100</span>
          <span>₹10,000+</span>
        </div>

      </div>


      {/* =================================
          CONDITION
      ================================= */}

      <div className="space-y-3">

        <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#66635d] dark:text-[#a1aaa4]">

          <Tag className="h-3.5 w-3.5 text-[#176b5b] dark:text-[#3faf91]" />

          Condition

        </label>

        <div className="space-y-2">

          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#55534e] dark:text-gray-300">

            <input
              type="radio"
              name="condition"
              checked={selectedCondition === 'all'}
              onChange={() =>
                setSelectedCondition('all')
              }
              className="h-4 w-4 accent-[#176b5b] dark:accent-[#3faf91]"
            />

            <span>All conditions</span>

          </label>

          {CONDITIONS.map((condition) => (

            <label
              key={condition}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-[#55534e] dark:text-gray-300"
            >

              <input
                type="radio"
                name="condition"
                checked={
                  selectedCondition === condition
                }
                onChange={() =>
                  setSelectedCondition(condition)
                }
                className="h-4 w-4 accent-[#176b5b] dark:accent-[#3faf91]"
              />

              <span>{condition}</span>

            </label>

          ))}

        </div>

      </div>


      {/* =================================
          MOBILE APPLY
      ================================= */}

      {onCloseMobile && (

        <div className="border-t border-[#ece9e2] pt-4 dark:border-[#2b3530]">

          <Button
            variant="primary"
            fullWidth
            onClick={onCloseMobile}
          >
            Apply Filters
          </Button>

        </div>

      )}

    </aside>
  );
};