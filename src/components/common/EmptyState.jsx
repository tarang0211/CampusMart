import React from "react";
import { Plus } from "lucide-react";
import { Button } from "./Button";

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="w-full rounded-3xl border border-[#26352f] bg-[#121b18] px-6 py-16 sm:px-10 sm:py-20 text-center">
      <div className="mx-auto w-20 h-20 rounded-2xl bg-[#193a32] border border-[#245247] flex items-center justify-center mb-7">
        {Icon && (
          <Icon className="w-9 h-9 text-[#43b89b]" />
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f1f5f3]">
        {title}
      </h2>

      <p className="max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed text-[#9aa9a3]">
        {description}
      </p>

      {actionLabel && onAction && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="primary"
            icon={Plus}
            onClick={onAction}
            className="bg-[#2f9f87] hover:bg-[#278b76] text-white shadow-lg shadow-[#2f9f87]/20"
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};