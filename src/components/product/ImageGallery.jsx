import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export const ImageGallery = ({ images = [] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] rounded-3xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
        No images available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Large Featured Image */}
      <div className="relative group w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 dark:bg-slate-800 border border-gray-200/80 dark:border-slate-800 shadow-md">
        <img
          src={images[selectedImageIndex]}
          alt="Product details preview"
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-slate-900/70 text-white backdrop-blur-md hover:bg-slate-900 transition-colors shadow-lg"
          title="Full screen preview"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails Picker */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          {images.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 shrink-0 cursor-pointer ${
                selectedImageIndex === index
                  ? 'border-blue-600 ring-2 ring-blue-500/20 scale-105 shadow-md'
                  : 'border-gray-200 dark:border-slate-800 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={images[selectedImageIndex]}
            alt="Full size view"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
