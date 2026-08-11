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
      onClick={onClick}
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 text-sm font-semibold shadow-xs ${
        isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
          : 'bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-slate-800'
      }`}
    >
      <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : category.color}`}>
        <IconComponent className="w-4 h-4" />
      </div>
      <span>{category.label}</span>
    </button>
  );
};
