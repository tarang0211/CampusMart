import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Heart } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export const Footer = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useProducts();

  const handleCategoryClick = (category) => {
  setSelectedCategory(category);
  navigate('/');
};

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Building2 className="w-5 h-5" />
              </div>

              <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
                Campus<span className="text-blue-600 dark:text-blue-400">Mart</span>
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
              CampusMart is an exclusive peer-to-peer marketplace designed specifically for college students to buy, sell, and trade books, electronics, hostel essentials, and cycles safely inside campus.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-lg w-fit border border-emerald-200 dark:border-emerald-900">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified College Students Only</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Home Marketplace
                </Link>
              </li>

              <li>
                <Link
                  to="/sell"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Sell an Item
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  My Saved Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/my-listings"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Manage My Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Popular Categories
            </h4>

            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('Books')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Engineering Textbooks
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleCategoryClick('Electronics')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Calculators & Gadgets
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleCategoryClick('Cycles')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Campus Bicycles
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleCategoryClick('Hostel Essentials')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Hostel Kettles & Lamps
                </button>
              </li>
            </ul>
          </div>

        

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} CampusMart. All rights reserved.</p>

          <div className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for College Students</span>
          </div>
        </div>

      </div>
    </footer>
  );
};