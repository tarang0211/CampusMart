import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export const ImageGallery = ({ images = [] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-3xl border border-[#e3e0d8] bg-[#f1efe9] text-[#99968f] dark:border-[#2a342f] dark:bg-[#18201d] dark:text-[#7f8983]">
        No images available
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Large Featured Image */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#e3e0d8] bg-[#f1efe9] shadow-md dark:border-[#2a342f] dark:bg-[#18201d]">
        <img
          src={images[selectedImageIndex]}
          alt="Product details preview"
          className="h-full w-full object-cover"
        />

        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 rounded-xl bg-[#111614]/80 p-2.5 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-[#111614]"
          title="Full screen preview"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnails Picker */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          {images.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'scale-105 border-[#176b5b] ring-2 ring-[#176b5b]/20 shadow-md dark:border-[#3faf91] dark:ring-[#3faf91]/20'
                  : 'border-[#e3e0d8] opacity-70 hover:opacity-100 dark:border-[#2a342f]'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07100d]/95 p-4 backdrop-blur-md">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Close image preview"
          >
            <X className="h-6 w-6" />
          </button>

          <img
            src={images[selectedImageIndex]}
            alt="Full size view"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};