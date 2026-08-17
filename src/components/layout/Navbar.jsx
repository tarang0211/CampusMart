import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Plus,
  Heart,
  Package,
  User,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
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

  const userListingsCount = products.filter(
    (product) =>
      product.seller &&
      product.seller.id === (user?.id || 'usr-me')
  ).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e2da] bg-[#f7f6f2] dark:border-[#27312d] dark:bg-[#0d1412]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">

          {/* Brand */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#176b5b] text-white dark:bg-[#2f8c76]">
              <span className="text-sm font-bold">B</span>
            </div>

            <div className="leading-none">
              <span className="text-xl font-bold tracking-tight text-[#171717] dark:text-[#f3f4f1]">
                BIT<span className="text-[#176b5b] dark:text-[#3faf91]">Mart</span>
              </span>

              <span className="mt-1 hidden text-[10px] font-medium text-[#77746d] dark:text-[#8f9993] sm:block">
                BIT Mesra Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden min-w-0 flex-1 md:block md:max-w-xl"
          >
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#96938b] dark:text-[#727d77]" />

            <input
              type="text"
              placeholder="Search books, electronics, cycles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#d6d3cb] bg-white pl-10 pr-10 text-sm text-[#171717] outline-none transition focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/10 dark:border-[#303a35] dark:bg-[#111b18] dark:text-[#f3f4f1] dark:placeholder:text-[#727d77] dark:focus:border-[#3faf91] dark:focus:bg-[#111b18] dark:focus:ring-[#3faf91]/10"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#96938b] transition hover:text-[#363431] dark:text-[#727d77] dark:hover:text-[#d5dad7]"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>

          {/* Desktop Navigation */}
          <nav className="ml-auto hidden items-center gap-1 lg:flex">

            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-[#176b5b] dark:text-[#3faf91]'
                  : 'text-[#5f5c56] hover:text-[#176b5b] dark:text-[#b5bcb8] dark:hover:text-[#3faf91]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/wishlist"
              className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/wishlist')
                  ? 'text-[#176b5b] dark:text-[#3faf91]'
                  : 'text-[#5f5c56] hover:text-[#176b5b] dark:text-[#b5bcb8] dark:hover:text-[#3faf91]'
              }`}
            >
              <Heart className="h-4 w-4" />
              Wishlist

              {wishlist.length > 0 && (
                <span className="ml-0.5 text-xs font-semibold text-[#88857e] dark:text-[#7f8983]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/my-listings"
              className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/my-listings')
                  ? 'text-[#176b5b] dark:text-[#3faf91]'
                  : 'text-[#5f5c56] hover:text-[#176b5b] dark:text-[#b5bcb8] dark:hover:text-[#3faf91]'
              }`}
            >
              <Package className="h-4 w-4" />
              Listings

              {userListingsCount > 0 && (
                <span className="ml-0.5 text-xs font-semibold text-[#88857e] dark:text-[#7f8983]">
                  {userListingsCount}
                </span>
              )}
            </Link>

            {/* Sell Item */}
            <Link to="/sell" className="ml-2">
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                className="!border-[#176b5b] !bg-[#176b5b] !text-white hover:!border-[#125448] hover:!bg-[#125448] focus:!ring-[#176b5b]/30 dark:!border-[#2f8c76] dark:!bg-[#2f8c76] dark:hover:!border-[#26735f] dark:hover:!bg-[#26735f]"
              >
                Sell Item
              </Button>
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex shrink-0 items-center gap-1">

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#5f5c56] transition-colors hover:bg-[#ece9e1] hover:text-[#176b5b] dark:text-[#b5bcb8] dark:hover:bg-[#18201d] dark:hover:text-[#3faf91]"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="h-4.5 w-4.5 text-amber-400" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-[#176b5b] dark:text-[#3faf91]" />
              )}
            </button>

            {/* Profile / Auth */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="ml-1 hidden items-center gap-2 border-l border-[#e5e2da] pl-3 sm:flex dark:border-[#303a35]"
              >
                <img
                  src={
                    user?.avatar ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
                  }
                  alt={user?.name || 'Profile'}
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-[#c9d8d2] dark:ring-[#36564c]"
                />

                <div className="hidden text-left xl:block">
                  <p className="max-w-[100px] truncate text-xs font-semibold text-[#171717] dark:text-[#f3f4f1]">
                    {user?.name?.split(' ')[0]}
                  </p>

                  <p className="max-w-[100px] truncate text-[10px] text-[#77746d] dark:text-[#8f9993]">
                    {user?.hostel || 'Student'}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="ml-1 hidden items-center gap-1 sm:flex">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>

                <Link to="/register">
                  <Button
                    variant="primary"
                    size="sm"
                    className="!border-[#176b5b] !bg-[#176b5b] hover:!border-[#125448] hover:!bg-[#125448] dark:!border-[#2f8c76] dark:!bg-[#2f8c76] dark:hover:!border-[#26735f] dark:hover:!bg-[#26735f]"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-[#5f5c56] transition-colors hover:bg-[#ece9e1] hover:text-[#176b5b] dark:text-[#d0d6d3] dark:hover:bg-[#18201d] dark:hover:text-[#3faf91] lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#e5e2da] bg-[#f7f6f2] dark:border-[#27312d] dark:bg-[#0d1412] lg:hidden">
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-4 sm:px-6">

            {/* Mobile Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative"
            >
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#96938b] dark:text-[#727d77]" />

              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#d6d3cb] bg-white pl-10 pr-4 text-sm text-[#171717] outline-none focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/10 dark:border-[#303a35] dark:bg-[#111b18] dark:text-[#f3f4f1] dark:placeholder:text-[#727d77] dark:focus:border-[#3faf91] dark:focus:ring-[#3faf91]/10"
              />
            </form>

            {/* Mobile Links */}
            <div className="space-y-1">

              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive('/')
                    ? 'bg-[#e7f0ec] text-[#176b5b] dark:bg-[#182923] dark:text-[#3faf91]'
                    : 'text-[#5f5c56] dark:text-[#d0d6d3]'
                }`}
              >
                Home
              </Link>

              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive('/wishlist')
                    ? 'bg-[#e7f0ec] text-[#176b5b] dark:bg-[#182923] dark:text-[#3faf91]'
                    : 'text-[#5f5c56] dark:text-[#d0d6d3]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </span>

                {wishlist.length > 0 && (
                  <span className="text-xs text-[#88857e] dark:text-[#7f8983]">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/my-listings"
                onClick={closeMobileMenu}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive('/my-listings')
                    ? 'bg-[#e7f0ec] text-[#176b5b] dark:bg-[#182923] dark:text-[#3faf91]'
                    : 'text-[#5f5c56] dark:text-[#d0d6d3]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Package className="h-4 w-4" />
                  My Listings
                </span>

                {userListingsCount > 0 && (
                  <span className="text-xs text-[#88857e] dark:text-[#7f8983]">
                    {userListingsCount}
                  </span>
                )}
              </Link>

              {isLoggedIn && (
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive('/profile')
                      ? 'bg-[#e7f0ec] text-[#176b5b] dark:bg-[#182923] dark:text-[#3faf91]'
                      : 'text-[#5f5c56] dark:text-[#d0d6d3]'
                  }`}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              )}

              <Link
                to="/sell"
                onClick={closeMobileMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#176b5b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#125448] dark:bg-[#2f8c76] dark:hover:bg-[#26735f]"
              >
                <Plus className="h-4 w-4" />
                Sell an Item
              </Link>
            </div>

            {/* Mobile Bottom */}
            <div className="border-t border-[#e5e2da] pt-3 dark:border-[#303a35]">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                    >
                      Log in
                    </Button>
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="flex-1"
                  >
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      className="!border-[#176b5b] !bg-[#176b5b] hover:!border-[#125448] hover:!bg-[#125448] dark:!border-[#2f8c76] dark:!bg-[#2f8c76] dark:hover:!border-[#26735f] dark:hover:!bg-[#26735f]"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};