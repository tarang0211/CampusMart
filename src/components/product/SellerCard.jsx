import React from "react";
import {
  ShieldCheck,
  Star,
  MessageSquare,
  Phone,
  MapPin,
  Building,
  Award,
} from "lucide-react";
import { Button } from "../common/Button";

export const SellerCard = ({ seller, productTitle, onContactClick }) => {
  if (!seller) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi ${seller.name}, I am interested in buying your "${productTitle}" listed on BitMart! Is it still available?`,
  );

  const phoneNumber = seller.phone?.replace(/\D/g, "");

  const whatsappNumber = phoneNumber?.startsWith("91")
    ? phoneNumber
    : `91${phoneNumber}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 space-y-5 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Seller Information
        </h3>
        {seller.verifiedStudent && (
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Student</span>
          </div>
        )}
      </div>

      {/* Seller Header */}
      <div className="flex items-center gap-4">
        <img
          src={
            seller.avatar ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
          }
          alt={seller.name}
          className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-sm"
        />
        <div className="space-y-1">
          <h4 className="font-bold text-gray-900 dark:text-white text-base">
            {seller.name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {seller.department || "B.Tech Student"}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{seller.rating || 4.9}</span>
            </span>
            <span className="text-gray-300 dark:text-slate-700">•</span>
            <span className="font-medium text-gray-500">
              {seller.soldCount || 2} Items Sold
            </span>
          </div>
        </div>
      </div>

      {/* Hostel Location Details */}
      <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-800/60 space-y-2 text-xs text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="font-semibold text-gray-900 dark:text-white">
            {seller.hostel}
          </span>
        </div>
        {seller.room && (
          <div className="flex items-center gap-2 pl-6 text-gray-500">
            <span>Pickup: {seller.room}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            variant="success"
            fullWidth
            icon={MessageSquare}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3"
          >
            Chat on WhatsApp
          </Button>
        </a>

        <Button
          variant="outline"
          fullWidth
          icon={Phone}
          onClick={onContactClick}
          className="border-gray-300 dark:border-slate-700 py-2.5"
        >
          View Contact Number
        </Button>
      </div>
    </div>
  );
};
