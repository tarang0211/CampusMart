import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  Package,
  CheckCircle2,
  Heart,
  Edit,
  LogOut
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { HOSTELS } from '../data/dummyData';

export const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { products } = useProducts();
  const { wishlist } = useWishlist();
  const { showToast } = useToast();

  const [editModalOpen, setEditModalOpen] =
    useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    hostel: user?.hostel || ''
  });

  const userListings = products.filter(
    (product) =>
      product.seller &&
      product.seller.id === user?.id
  );

  const soldCount = userListings.filter(
    (product) => product.isSold
  ).length;

  // =========================
  // OPEN EDIT PROFILE
  // =========================

  const handleOpenEdit = () => {
    setProfileForm({
      name: user?.name || '',
      phone: user?.phone || '',
      hostel: user?.hostel || ''
    });

    setEditModalOpen(true);
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleSaveProfile = (e) => {
    e.preventDefault();

    updateProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      hostel: profileForm.hostel
    });

    showToast(
      'Profile updated successfully!',
      'success'
    );

    setEditModalOpen(false);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    logout();

    showToast(
      'Logged out of account',
      'info'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">

      {/* =========================
          PROFILE CARD
      ========================= */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

        {/* Banner */}

        <div className="h-36 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 relative">

          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />

            <span>
              Verified Campus Student
            </span>
          </div>

        </div>

        {/* Profile Details */}

        <div className="px-6 sm:px-8 pb-8 relative -mt-16 space-y-6">

          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 text-center sm:text-left">

            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">

              {/* Avatar */}

              <div className="w-28 h-28 rounded-3xl border-4 border-white dark:border-slate-900 shadow-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center">

                <User className="w-14 h-14 text-gray-400" />

              </div>

              {/* Basic Info */}

              <div className="space-y-1">

                <div className="flex items-center justify-center sm:justify-start gap-2">

                  <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {user?.name || 'Campus User'}
                  </h1>

                  {user?.isVerified && (
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Verified
                    </span>
                  )}

                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  BIT Mesra Student
                </p>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex items-center gap-2">

              <Button
                variant="outline"
                icon={Edit}
                onClick={handleOpenEdit}
              >
                Edit Profile
              </Button>

              <Button
                variant="danger"
                icon={LogOut}
                onClick={handleLogout}
              >
                Log Out
              </Button>

            </div>

          </div>

          {/* =========================
              USER DETAILS
          ========================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">

            {/* Email */}

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 space-y-1">

              <span className="text-xs text-gray-400 uppercase font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                College Email
              </span>

              <span className="text-sm font-semibold text-gray-900 dark:text-white block truncate">
                {user?.email || 'Not available'}
              </span>

            </div>

            {/* Hostel */}

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 space-y-1">

              <span className="text-xs text-gray-400 uppercase font-bold flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-500" />
                Hostel
              </span>

              <span className="text-sm font-semibold text-gray-900 dark:text-white block truncate">
                {user?.hostel || 'Not specified'}
              </span>

            </div>

            {/* Phone */}

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 space-y-1">

              <span className="text-xs text-gray-400 uppercase font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                Phone Number
              </span>

              <span className="text-sm font-semibold text-gray-900 dark:text-white block truncate">
                {user?.phone || 'Not available'}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          ACTIVITY STATS
      ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* Posted */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 flex items-center justify-between shadow-sm">

          <div>

            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Posted Items
            </span>

            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
              {userListings.length}
            </div>

          </div>

          <div className="p-3.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 rounded-2xl">
            <Package className="w-7 h-7" />
          </div>

        </div>

        {/* Sold */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 flex items-center justify-between shadow-sm">

          <div>

            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Items Sold
            </span>

            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {soldCount}
            </div>

          </div>

          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-2xl">
            <CheckCircle2 className="w-7 h-7" />
          </div>

        </div>

        {/* Wishlist */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 flex items-center justify-between shadow-sm">

          <div>

            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Saved Wishlist
            </span>

            <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
              {wishlist.length}
            </div>

          </div>

          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 rounded-2xl">
            <Heart className="w-7 h-7" />
          </div>

        </div>

      </div>

      {/* =========================
          EDIT PROFILE MODAL
      ========================= */}

      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Profile Information"
      >

        <form
          onSubmit={handleSaveProfile}
          className="space-y-4"
        >

          <Input
            label="Full Name"
            value={profileForm.name}
            onChange={(e) =>
              setProfileForm((prev) => ({
                ...prev,
                name: e.target.value
              }))
            }
            required
          />

          <Input
            label="Phone / WhatsApp Number"
            value={profileForm.phone}
            onChange={(e) =>
              setProfileForm((prev) => ({
                ...prev,
                phone: e.target.value
              }))
            }
            required
          />

          <div className="flex flex-col space-y-1.5">

            <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Hostel
            </label>

            <select
              value={profileForm.hostel}
              onChange={(e) =>
                setProfileForm((prev) => ({
                  ...prev,
                  hostel: e.target.value
                }))
              }
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

              {HOSTELS
                .filter(
                  (hostel) =>
                    hostel !== 'All Hostels'
                )
                .map((hostel) => (
                  <option
                    key={hostel}
                    value={hostel}
                  >
                    {hostel}
                  </option>
                ))}

            </select>

          </div>

          <div className="pt-4 flex justify-end gap-3">

            <Button
              variant="ghost"
              type="button"
              onClick={() =>
                setEditModalOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              type="submit"
            >
              Save Profile
            </Button>

          </div>

        </form>

      </Modal>

    </div>
  );
};