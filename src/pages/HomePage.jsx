import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  PackageSearch,
  Plus,
  Sparkles,
  X
} from 'lucide-react';

import { CATEGORIES } from '../data/dummyData';
import { useProducts } from '../context/ProductContext';

import { ProductCard } from '../components/product/ProductCard';
import { CategoryCard } from '../components/product/CategoryCard';
import { SearchBar } from '../components/product/SearchBar';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';

export const HomePage = () => {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    resetFilters,
    fetchProducts
  } = useProducts();

  const [isLoading, setIsLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        await fetchProducts();
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const availableProducts = filteredProducts.filter(
    (product) => !product.isSold
  );

  const featuredProducts = availableProducts.filter(
    (product) => product.featured
  );

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'all';

  const showingFilteredView = hasActiveFilters;

  return (
    <div className="min-h-screen bg-[#f7f6f2] pb-16 dark:bg-[#111614]">

      {/* =========================================
          MARKETPLACE INTRO
      ========================================= */}

      <section className="border-b border-[#e5e2da] bg-[#f7f6f2] dark:border-[#27312d] dark:bg-[#111614]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

          <div className="max-w-3xl">

            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#176b5b] dark:text-[#3faf91]">
              <span className="h-2 w-2 rounded-full bg-[#176b5b] dark:bg-[#3faf91]" />
              BIT Mesra Marketplace
            </div>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl dark:text-[#f3f4f1]">
              Buy and sell around campus.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6b6963] sm:text-lg dark:text-[#a8afa9]">
              Find textbooks, electronics, cycles, hostel essentials
              and more from students at BIT Mesra.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">

              <Link
                to="/sell"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#176b5b] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#125448] dark:bg-[#2f8c76] dark:hover:bg-[#26735f]"
              >
                <Plus className="h-4 w-4" />
                Sell an item
              </Link>

              <a
                href="#listings"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#d6d3cb] bg-white px-5 text-sm font-semibold text-[#363431] transition-colors hover:border-[#176b5b] hover:text-[#176b5b] dark:border-[#303a35] dark:bg-[#18201d] dark:text-gray-200 dark:hover:border-[#3faf91] dark:hover:text-[#3faf91]"
              >
                Browse listings
                <ArrowRight className="h-4 w-4" />
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================
          MAIN MARKETPLACE
      ========================================= */}

      <main
        id="explore"
        className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8"
      >

        {/* =========================================
            SEARCH
        ========================================= */}

        <section className="mb-8">
          <SearchBar
            onOpenMobileFilter={() =>
              setMobileFilterOpen(true)
            }
          />
        </section>


        {/* =========================================
            CATEGORIES
        ========================================= */}

        <section className="mb-10">

          <div className="mb-4 flex items-end justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#171717] dark:text-[#f3f4f1]">
                Browse categories
              </h2>

              <p className="mt-1 text-sm text-[#77746d] dark:text-[#8f9993]">
                Find what you need faster.
              </p>
            </div>

            <span className="shrink-0 text-xs font-medium text-[#88857e] dark:text-[#7f8983]">
              {CATEGORIES.length - 1} categories
            </span>

          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">

            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={
                  selectedCategory === category.id
                }
                onClick={() =>
                  setSelectedCategory(category.id)
                }
              />
            ))}

          </div>

        </section>


        {/* =========================================
            FEATURED LISTINGS
        ========================================= */}

        {!showingFilteredView &&
          featuredProducts.length > 0 && (

            <section className="mb-10">

              <div className="mb-4 flex items-center justify-between">

                <div>
                  <div className="flex items-center gap-2">

                    <Sparkles className="h-4 w-4 text-[#d97745]" />

                    <h2 className="text-xl font-bold tracking-tight text-[#171717] dark:text-[#f3f4f1]">
                      Featured listings
                    </h2>

                  </div>

                  <p className="mt-1 text-sm text-[#77746d] dark:text-[#8f9993]">
                    A few listings worth checking out.
                  </p>
                </div>

                <span className="hidden text-xs font-medium text-[#77746d] sm:block dark:text-[#8f9993]">
                  From BIT Mesra students
                </span>

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {featuredProducts
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}

              </div>

            </section>
          )}


        {/* =========================================
            LISTINGS
        ========================================= */}

        <section
          id="listings"
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
        >

          {/* DESKTOP FILTER */}

          <aside className="hidden lg:sticky lg:top-24 lg:col-span-3 lg:block">
            <FilterSidebar />
          </aside>


          {/* PRODUCTS */}

          <div className="space-y-5 lg:col-span-9">

            {/* LISTING HEADER */}

            <div className="flex flex-col gap-3 border-b border-[#dfdcd4] pb-4 sm:flex-row sm:items-end sm:justify-between dark:border-[#2a342f]">

              <div>

                <h2 className="text-xl font-bold tracking-tight text-[#171717] dark:text-[#f3f4f1]">

                  {selectedCategory === 'all'
                    ? 'All listings'
                    : `${selectedCategory} listings`}

                </h2>

                <p className="mt-1 text-sm text-[#77746d] dark:text-[#8f9993]">
                  {isLoading
                    ? 'Finding available items...'
                    : `${availableProducts.length} ${
                        availableProducts.length === 1
                          ? 'item'
                          : 'items'
                      } available on campus`}
                </p>

              </div>


              {hasActiveFilters && (

                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#176b5b] transition-colors hover:text-[#125448] dark:text-[#3faf91] dark:hover:text-[#52c6a7]"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear filters
                </button>

              )}

            </div>


            {/* LOADING */}

            {isLoading ? (

              <ProductGridSkeleton count={8} />

            ) : availableProducts.length === 0 ? (

              <div className="border border-dashed border-[#d8d5cd] bg-white dark:border-[#35403a] dark:bg-[#18201d]">
                <EmptyState
                  icon={PackageSearch}
                  title="No items found"
                  description="We couldn't find anything matching your search or filters. Try another search or clear your filters."
                  actionLabel="Reset All Filters"
                  onAction={resetFilters}
                />
              </div>

            ) : (

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">

                {availableProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>

            )}

          </div>

        </section>

      </main>


      {/* =========================================
          MOBILE FILTER DRAWER
      ========================================= */}

      {mobileFilterOpen && (

        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">

          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative z-10 h-full w-full max-w-sm overflow-y-auto border-l border-[#e1ded6] bg-[#f7f6f2] p-4 shadow-xl dark:border-[#303a35] dark:bg-[#111614]">

            <FilterSidebar
              onCloseMobile={() =>
                setMobileFilterOpen(false)
              }
            />

          </div>

        </div>

      )}

    </div>
  );
};