import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">

        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#07100d]/70 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
        />

        {/* Modal */}
        <div
          className={`relative z-10 my-8 w-full ${maxWidth} overflow-hidden rounded-2xl border border-[#e3e0d8] bg-white shadow-2xl animate-fade-in dark:border-[#2a342f] dark:bg-[#111b18]`}
          onClick={(e) => e.stopPropagation()}
        >

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#ebe8e1] px-6 py-4 dark:border-[#2a342f]">
            <h3 className="text-lg font-bold text-[#171717] dark:text-[#f3f4f1]">
              {title}
            </h3>

            <button
              onClick={onClose}
              className="rounded-lg p-1 text-[#99968f] transition-colors hover:bg-[#f1efe9] hover:text-[#363431] dark:text-[#7f8983] dark:hover:bg-[#18201d] dark:hover:text-[#f3f4f1]"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[80vh] overflow-y-auto p-6">
            {children}
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};