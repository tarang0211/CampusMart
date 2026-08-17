import React from 'react';
import {
  LayoutGrid,
  BookOpen,
  Laptop,
  Bike,
  Home,
  Armchair,
  PenTool,
  Shirt,
  MoreHorizontal
} from 'lucide-react';

const ICON_MAP = {
  LayoutGrid,
  BookOpen,
  Laptop,
  Bike,
  Home,
  Armchair,
  PenTool,
  Shirt,
  MoreHorizontal
};

export const CategoryCard = ({ category, isSelected, onClick }) => {
  const IconComponent = ICON_MAP[category.icon] || LayoutGrid;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-w-[92px] shrink-0 flex-col items-center justify-center gap-2 rounded-lg border px-4 py-3 transition-colors duration-150 ${
        isSelected
          ? 'border-[#176b5b] bg-[#176b5b] text-white'
          : 'border-[#e3e0d8] bg-white text-[#44403c] hover:border-[#b9d2ca] hover:bg-[#faf9f6] dark:border-[#303a35] dark:bg-[#18201d] dark:text-gray-200 dark:hover:border-[#3f6257] dark:hover:bg-[#1d2723]'
      }`}
    >
      <IconComponent
        className={`h-5 w-5 transition-colors ${
          isSelected
            ? 'text-white'
            : 'text-[#176b5b] dark:text-[#3faf91]'
        }`}
      />

      <span className="text-xs font-semibold leading-none">
        {category.label}
      </span>
    </button>
  );
};