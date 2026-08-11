import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-3 shadow-sm flex flex-col space-y-3">
      <div className="w-full h-48 rounded-xl animate-shimmer"></div>
      <div className="space-y-2 px-1">
        <div className="h-4 w-3/4 animate-shimmer rounded-md"></div>
        <div className="h-5 w-1/2 animate-shimmer rounded-md"></div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-3 w-1/3 animate-shimmer rounded-md"></div>
          <div className="h-3 w-1/4 animate-shimmer rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const DetailPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6">
      <div className="lg:col-span-7 space-y-4">
        <div className="w-full h-96 rounded-2xl animate-shimmer"></div>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl animate-shimmer"></div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5 space-y-4">
        <div className="h-8 w-3/4 animate-shimmer rounded-lg"></div>
        <div className="h-10 w-1/3 animate-shimmer rounded-lg"></div>
        <div className="h-24 w-full animate-shimmer rounded-xl"></div>
        <div className="h-36 w-full animate-shimmer rounded-xl"></div>
      </div>
    </div>
  );
};
