import React, { useState } from "react";
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
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

import { Modal } from "../components/common/Modal";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { HOSTELS } from "../data/dummyData";

export const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { products } = useProducts();
  const { wishlist } = useWishlist();
  const { showToast } = useToast();

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    hostel: user?.hostel || "",
  });

  const userListings = products.filter(
    (product) =>
      product.seller &&
      product.seller.id === user?.id
  );

  const soldCount = userListings.filter(
    (product) => product.isSold
  ).length;

  const handleOpenEdit = () => {
    setProfileForm({
      name: user?.name || "",
      phone: user?.phone || "",
      hostel: user?.hostel || "",
    });

    setEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    updateProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      hostel: profileForm.hostel,
    });

    showToast(
      "Profile updated successfully!",
      "success"
    );

    setEditModalOpen(false);
  };

  const handleLogout = () => {
    logout();

    showToast(
      "Logged out of account",
      "info"
    );
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0d1411] text-[#f1f5f2]">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">

        {/* =========================
            PROFILE CARD
        ========================= */}

        <div className="bg-[#151d19] rounded-3xl border border-[#29352f] shadow-xl overflow-hidden">

          {/* Banner */}

          <div className="h-36 bg-gradient-to-r from-[#123f35] via-[#176b5b] to-[#23816d] relative">

            <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#67d2b5]" />

              <span>
                Verified Campus Student
              </span>
            </div>

          </div>

          {/* Profile Details */}

          <div className="px-6 sm:px-8 pb-8 relative -mt-16 space-y-6">

            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 text-center sm:text-left">

              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">

                {/* Avatar */}

                <div className="w-28 h-28 rounded-3xl border-4 border-[#151d19] shadow-xl bg-[#202a25] flex items-center justify-center">

                  <User className="w-14 h-14 text-[#7d8983]" />

                </div>

                {/* Basic Info */}

                <div className="space-y-1">

                  <div className="flex items-center justify-center sm:justify-start gap-2">

                    <h1 className="text-2xl font-extrabold text-[#f1f5f2]">
                      {user?.name || "Campus User"}
                    </h1>

                    {user?.isVerified && (
                      <span className="bg-[#123f35] text-[#67d2b5] border border-[#246653] text-[10px] font-bold px-2 py-0.5 rounded-md">
                        Verified
                      </span>
                    )}

                  </div>

                  <p className="text-xs text-[#929b95] font-medium">
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
                  className="border-[#394740] bg-[#151d19] text-[#d7ddd9] hover:bg-[#202a25] hover:border-[#2f9d82] hover:text-[#4fc09f]"
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

              <div className="p-4 rounded-2xl bg-[#1b2420] border border-[#29352f] space-y-1">

                <span className="text-xs text-[#7d8983] uppercase font-bold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#3faf91]" />
                  College Email
                </span>

                <span className="text-sm font-semibold text-[#f1f5f2] block truncate">
                  {user?.email || "Not available"}
                </span>

              </div>

              {/* Hostel */}

              <div className="p-4 rounded-2xl bg-[#1b2420] border border-[#29352f] space-y-1">

                <span className="text-xs text-[#7d8983] uppercase font-bold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#3faf91]" />
                  Hostel
                </span>

                <span className="text-sm font-semibold text-[#f1f5f2] block truncate">
                  {user?.hostel || "Not specified"}
                </span>

              </div>

              {/* Phone */}

              <div className="p-4 rounded-2xl bg-[#1b2420] border border-[#29352f] space-y-1">

                <span className="text-xs text-[#7d8983] uppercase font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#3faf91]" />
                  Phone Number
                </span>

                <span className="text-sm font-semibold text-[#f1f5f2] block truncate">
                  {user?.phone || "Not available"}
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

          <div className="bg-[#151d19] rounded-3xl border border-[#29352f] p-6 flex items-center justify-between shadow-sm">

            <div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#7d8983]">
                Total Posted Items
              </span>

              <div className="text-3xl font-extrabold text-[#3faf91] mt-1">
                {userListings.length}
              </div>

            </div>

            <div className="p-3.5 bg-[#123f35] border border-[#246653] text-[#3faf91] rounded-2xl">
              <Package className="w-7 h-7" />
            </div>

          </div>

          {/* Sold */}

          <div className="bg-[#151d19] rounded-3xl border border-[#29352f] p-6 flex items-center justify-between shadow-sm">

            <div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#7d8983]">
                Items Sold
              </span>

              <div className="text-3xl font-extrabold text-[#4fc09f] mt-1">
                {soldCount}
              </div>

            </div>

            <div className="p-3.5 bg-[#123f35] border border-[#246653] text-[#4fc09f] rounded-2xl">
              <CheckCircle2 className="w-7 h-7" />
            </div>

          </div>

          {/* Wishlist */}

          <div className="bg-[#151d19] rounded-3xl border border-[#29352f] p-6 flex items-center justify-between shadow-sm">

            <div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#7d8983]">
                Saved Wishlist
              </span>

              <div className="text-3xl font-extrabold text-[#e47770] mt-1">
                {wishlist.length}
              </div>

            </div>

            <div className="p-3.5 bg-[#3b2020] border border-[#653532] text-[#e47770] rounded-2xl">
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
                  name: e.target.value,
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
                  phone: e.target.value,
                }))
              }
              required
            />

            <div className="flex flex-col space-y-1.5">

              <label className="text-xs font-semibold uppercase tracking-wider text-[#d7ddd9]">
                Hostel
              </label>

              <select
                value={profileForm.hostel}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    hostel: e.target.value,
                  }))
                }
                className="w-full py-3 px-4 rounded-2xl border border-[#34413b] bg-[#111916] text-[#f1f5f2] text-sm outline-none transition-all duration-200 focus:border-[#2f9d82] focus:ring-2 focus:ring-[#2f9d82]/20"
              >

                {HOSTELS
                  .filter(
                    (hostel) =>
                      hostel !== "All Hostels"
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
                className="text-[#b8c0bb] hover:bg-[#202a25]"
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
    </div>
  );
};