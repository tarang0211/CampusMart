import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Sparkles,
  PlusCircle,
  ShieldCheck,
  Zap,
  PackageSearch,
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
import { Button } from '../components/common/Button';

export const HomePage = () => {

  // =========================
  // PRODUCT CONTEXT
  // =========================

  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    resetFilters,
    fetchProducts
  } = useProducts();


  // =========================
  // STATES
  // =========================

  const [isLoading, setIsLoading] =
    useState(true);

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);


  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setIsLoading(true);

        await fetchProducts();

      } catch (error) {

        console.error(
          'Failed to load products:',
          error
        );

      } finally {

        setIsLoading(false);

      }

    };

    loadProducts();

  }, []);


  // =========================
  // ONLY ACTIVE PRODUCTS
  // =========================

  const availableProducts =
    filteredProducts.filter(
      (product) =>
        !product.isSold
    );


  // =========================
  // FEATURED PRODUCTS
  // =========================

  const featuredProducts =
    availableProducts.filter(
      (product) =>
        product.featured
    );


  // =========================
  // CLEAR FILTER CHECK
  // =========================

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all';


  // =========================
  // JSX
  // =========================

  return (

    <div className="min-h-screen pb-16 space-y-10">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 shadow-xl">

        {/* Background Circles */}

        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />


        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">


          {/* HERO TEXT */}

          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-100 border border-white/20">

              <Sparkles className="w-4 h-4 text-amber-300" />

              <span>
                Campus Verified Marketplace
              </span>

            </div>


            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">

              Buy & Sell College Essentials

              <br className="hidden sm:block" />

              <span className="text-amber-300 underline decoration-amber-300/40 underline-offset-8">

                Hostel to Hostel

              </span>

            </h1>


            <p className="text-base sm:text-lg text-blue-100 max-w-2xl font-normal leading-relaxed">

              Find cheap textbooks, lab kits, cycles,
              scientific calculators, and kettles from
              students in your own campus.

              Zero delivery fees, instant WhatsApp contact!

            </p>


            {/* HERO BUTTONS */}

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">

              <Link
                to="/sell"
                className="w-full sm:w-auto"
              >

                <Button
                  variant="primary"
                  size="lg"
                  icon={PlusCircle}
                  className="bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold shadow-lg shadow-amber-500/20 border-none w-full sm:w-auto"
                >
                  Sell Your Item Now
                </Button>

              </Link>


              <a
                href="#explore"
                className="w-full sm:w-auto"
              >

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Browse Campus Catalog
                </Button>

              </a>

            </div>


            {/* FEATURE BADGES */}

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-blue-200 font-medium border-t border-white/10">

              <div className="flex items-center gap-1.5">

                <ShieldCheck className="w-4 h-4 text-emerald-400" />

                <span>
                  Verified .edu Emails Only
                </span>

              </div>


              <div className="flex items-center gap-1.5">

                <Zap className="w-4 h-4 text-amber-300" />

                <span>
                  Instant Hostel Pickup
                </span>

              </div>

            </div>

          </div>


          {/* HERO IMAGE */}

          <div className="lg:col-span-5 hidden lg:block">

            <div className="relative mx-auto max-w-md bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/20 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                alt="College Marketplace Students"
                className="w-full h-72 object-cover rounded-2xl shadow-inner"
              />

              <div className="mt-3 flex items-center justify-between px-2 text-xs font-semibold text-white">

                <span>
                  Campus Marketplace
                </span>

                <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px]">
                  Live
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          MAIN CATALOG
      ========================= */}

      <div
        id="explore"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >


        {/* SEARCH */}

        <SearchBar
          onOpenMobileFilter={() =>
            setMobileFilterOpen(true)
          }
        />


        {/* =========================
            CATEGORIES
        ========================= */}

        <div className="space-y-3">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Browse by Category
            </h2>

            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {CATEGORIES.length - 1} categories
            </span>

          </div>


          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">

            {CATEGORIES.map(
              (category) => (

                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={
                    selectedCategory ===
                    category.id
                  }
                  onClick={() =>
                    setSelectedCategory(
                      category.id
                    )
                  }
                />

              )
            )}

          </div>

        </div>


        {/* =========================
            FEATURED DEALS
        ========================= */}

        {featuredProducts.length > 0 &&
          searchQuery === '' &&
          selectedCategory === 'all' && (

            <div className="space-y-4 pt-2">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Sparkles className="w-5 h-5 text-amber-500" />

                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                    Featured Deals
                  </h2>

                </div>

                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Top Picks by Students
                </span>

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {featuredProducts
                  .slice(0, 4)
                  .map(
                    (product) => (

                      <ProductCard
                        key={product.id}
                        product={product}
                      />

                    )
                  )}

              </div>

            </div>

          )}


        {/* =========================
            FILTER + PRODUCTS
        ========================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">


          {/* DESKTOP FILTER */}

          <div className="hidden lg:block lg:col-span-3 sticky top-24">

            <FilterSidebar />

          </div>


          {/* PRODUCTS */}

          <div className="lg:col-span-9 space-y-6">


            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs">

              <div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">

                  {selectedCategory === 'all'
                    ? 'All Campus Listings'
                    : `${selectedCategory} Listings`}

                </h2>


                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">

                  Showing {availableProducts.length}{' '}

                  {availableProducts.length === 1
                    ? 'item'
                    : 'items'}{' '}

                  available on campus

                </p>

              </div>


              {/* CLEAR FILTER */}

              {hasActiveFilters && (

                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >

                  <X className="w-3.5 h-3.5" />

                  Clear Search & Filters

                </button>

              )}

            </div>


            {/* =========================
                LOADING
            ========================= */}

            {isLoading ? (

              <ProductGridSkeleton count={8} />

            ) : availableProducts.length === 0 ? (

              <EmptyState
                icon={PackageSearch}
                title="No items found"
                description="We couldn't find any items matching your filters or search query. Try searching for something else or clearing your filters."
                actionLabel="Reset All Filters"
                onAction={resetFilters}
              />

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                {availableProducts.map(
                  (product) => (

                    <ProductCard
                      key={product.id}
                      product={product}
                    />

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </div>


      {/* =========================
          MOBILE FILTER DRAWER
      ========================= */}

      {mobileFilterOpen && (

        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">


          {/* BACKDROP */}

          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() =>
              setMobileFilterOpen(false)
            }
          />


          {/* DRAWER */}

          <div className="relative w-full max-w-xs bg-white dark:bg-slate-900 h-full overflow-y-auto p-4 z-10 animate-fade-in shadow-2xl">

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