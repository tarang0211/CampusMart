import React from "react";
import { Heart, Trash2, ArrowRight } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";
import { useToast } from "../context/ToastContext";

import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/common/Button";

export const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { products } = useProducts();
  const { showToast } = useToast();

  const wishlistedProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  const handleClearAll = () => {
    clearWishlist();

    showToast(
      "Cleared all items from your Wishlist",
      "info"
    );
  };

  const handleExplore = () => {
    window.location.href = "/";
  };

  return (
    <main
      className="
        min-h-[calc(100vh-80px)]
        w-full
        bg-[#f7f7f5]
        dark:bg-[#0d100f]
        text-gray-900
        dark:text-white
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-10
          space-y-8
          animate-fade-in
        "
      >

        {/* =========================
            HEADER
        ========================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-5
            pb-6
            border-b
            border-gray-200
            dark:border-[#252927]
          "
        >
          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-rose-50
                  dark:bg-rose-950/30
                  flex
                  items-center
                  justify-center
                "
              >
                <Heart
                  className="
                    w-6
                    h-6
                    text-rose-500
                    fill-rose-500
                  "
                />
              </div>

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                  dark:text-white
                "
              >
                My Saved Wishlist
              </h1>

            </div>

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
                mt-2
              "
            >
              You have{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {wishlistedProducts.length}
              </span>{" "}
              {wishlistedProducts.length === 1
                ? "item"
                : "items"}{" "}
              saved in your wishlist.
            </p>

          </div>

          {/* CLEAR BUTTON */}

          {wishlistedProducts.length > 0 && (
            <Button
              variant="ghost"
              icon={Trash2}
              onClick={handleClearAll}
              className="
                text-rose-600
                hover:text-rose-700
                hover:bg-rose-50
                dark:text-rose-400
                dark:hover:bg-rose-950/30
              "
            >
              Clear Wishlist
            </Button>
          )}

        </div>

        {/* =========================
            EMPTY WISHLIST
        ========================= */}

        {wishlistedProducts.length === 0 ? (

          <section
            className="
              w-full
              min-h-[430px]
              rounded-3xl
              border
              border-gray-200
              dark:border-[#252927]
              bg-white
              dark:bg-[#151918]
              flex
              flex-col
              items-center
              justify-center
              text-center
              px-6
              py-16
              shadow-sm
            "
          >

            {/* ICON */}

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-gray-100
                dark:bg-[#202422]
                flex
                items-center
                justify-center
                mb-7
              "
            >
              <Heart
                className="
                  w-10
                  h-10
                  text-gray-400
                  dark:text-gray-500
                "
              />
            </div>

            {/* TITLE */}

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-extrabold
                text-gray-900
                dark:text-white
              "
            >
              Your wishlist is empty
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                max-w-xl
                mt-3
                text-sm
                sm:text-base
                leading-6
                text-gray-500
                dark:text-gray-400
              "
            >
              Save interesting books, cycles, gadgets, and hostel
              essentials here so you can easily find them later.
            </p>

            {/* BUTTON */}

            <div className="mt-8">

              <Button
                variant="primary"
                icon={ArrowRight}
                onClick={handleExplore}
                className="font-bold"
              >
                Explore Campus Market
              </Button>

            </div>

          </section>

        ) : (

          /* =========================
             WISHLIST PRODUCTS
          ========================= */

          <section
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
            "
          >
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </section>

        )}

      </div>
    </main>
  );
};