import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  Heart, 
  Package, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  LogOut, 
  LogIn, 
  Sparkles 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import { Button } from '../common/Button';

export const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { products, searchQuery, setSearchQuery } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const userListingsCount = products.filter(p => p.seller && p.seller.id === (user?.id || 'usr-me')).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
                  BIT<span className="text-blue-600 dark:text-blue-400">Mart</span>
                </span>
                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                  Campus Only
                </span>
              </div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium -mt-1 hidden sm:block">
                Buy & Sell College Essentials
              </span>
            </div>
          </Link>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search books, cycles, kettle, electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all duration-200"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Navigation Actions (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>

            <Link
              to="/wishlist"
              className={`relative px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                isActive('/wishlist')
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/my-listings"
              className={`relative px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${
                isActive('/my-listings')
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>My Listings</span>
              {userListingsCount > 0 && (
                <span className="bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {userListingsCount}
                </span>
              )}
            </Link>

            <Link
              to="/sell"
              className="ml-1"
            >
              <Button variant="primary" size="sm" icon={PlusCircle}>
                Sell Item
              </Button>
            </Link>
          </nav>

          {/* Right Control Tools */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* User Profile / Auth buttons */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2 border-l border-gray-200 dark:border-slate-800 pl-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      {user?.hostel?.split(' ')[0]}
                    </span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-4 animate-fade-in">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          <div className="flex flex-col space-y-1 pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Sell Item
              </span>
              <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">Post Now</span>
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                Wishlist
              </span>
              {wishlist.length > 0 && (
                <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/my-listings"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-500" />
                My Listings
              </span>
              {userListingsCount > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {userListingsCount}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-gray-500" />
              Profile ({user?.name})
            </Link>
          </div>

          <div className="pt-2 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-rose-600 dark:text-rose-400 flex items-center gap-2 px-2 py-1"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button variant="outline" size="sm" fullWidth>Log In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button variant="primary" size="sm" fullWidth>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
