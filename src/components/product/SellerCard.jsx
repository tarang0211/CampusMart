import React from "react";
import {
  ShieldCheck,
  Star,
  MessageSquare,
  Phone,
  Building,
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
    <div className="bg-white dark:bg-[#111b18] rounded-2xl border border-[#dfdcd4] dark:border-[#2a342f] p-6 space-y-5 shadow-sm transition-colors">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#ebe8e1] dark:border-[#2a342f]">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#77746d] dark:text-[#8f9993]">
          Seller Information
        </h3>

        {seller.verifiedStudent && (
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#176b5b] dark:text-[#3faf91] bg-[#edf6f2] dark:bg-[#182923] px-2.5 py-1 rounded-full border border-[#cfe2db] dark:border-[#315248]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Student</span>
          </div>
        )}
      </div>

      {/* Seller */}
      <div className="flex items-center gap-4">
        <img
          src={
            seller.avatar ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
          }
          alt={seller.name}
          className="w-14 h-14 rounded-xl object-cover border-2 border-[#176b5b] dark:border-[#3faf91] shadow-sm"
        />

        <div className="space-y-1">
          <h4 className="font-bold text-[#171717] dark:text-[#f3f4f1] text-base">
            {seller.name}
          </h4>

          <p className="text-xs text-[#77746d] dark:text-[#8f9993] font-medium">
            {seller.department || "B.Tech Student"}
          </p>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              {seller.rating || 4.9}
            </span>

            <span className="text-[#d0cdc5] dark:text-[#3a4641]">
              •
            </span>

            <span className="font-medium text-[#77746d] dark:text-[#8f9993]">
              {seller.soldCount || 2} Items Sold
            </span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="p-4 rounded-xl bg-[#f7f6f2] dark:bg-[#18201d] space-y-2 text-xs text-[#5f5c56] dark:text-[#b5bcb8] border border-[#ebe8e1] dark:border-[#2a342f]">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-[#176b5b] dark:text-[#3faf91] shrink-0" />

          <span className="font-semibold text-[#171717] dark:text-[#f3f4f1]">
            {seller.hostel || "Campus"}
          </span>
        </div>

        {seller.room && (
          <div className="pl-6 text-[#77746d] dark:text-[#8f9993]">
            Pickup: {seller.room}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-1">

        {/* WhatsApp */}
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
            className="!bg-[#176b5b] !border-[#176b5b] hover:!bg-[#125448] hover:!border-[#125448] dark:!bg-[#2f8c76] dark:!border-[#2f8c76] dark:hover:!bg-[#26735f] dark:hover:!border-[#26735f] !text-white font-bold py-3"
          >
            Chat on WhatsApp
          </Button>
        </a>

        {/* Contact */}
        <Button
          variant="outline"
          fullWidth
          icon={Phone}
          onClick={onContactClick}
          className="!border-[#d6d3cb] dark:!border-[#35403a] !text-[#5f5c56] dark:!text-[#d0d6d3] hover:!border-[#176b5b] hover:!text-[#176b5b] dark:hover:!border-[#3faf91] dark:hover:!text-[#3faf91] py-2.5"
        >
          View Contact Number
        </Button>

      </div>
    </div>
  );
};