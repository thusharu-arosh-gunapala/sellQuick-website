import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PropertyGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images.length) {
    return (
      <div className="bg-gray-100 h-72 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">No Images Available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900/5 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`Property ${currentIndex + 1}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/1200x800?text=Image+Not+Found";
            }}
            className="w-full h-[280px] sm:h-[340px] lg:h-[380px] object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        <div className="absolute inset-x-0 top-4 mx-4 flex items-center justify-between rounded-3xl bg-black/40 px-4 py-3 text-white backdrop-blur-sm shadow-lg">
          <span className="text-sm uppercase tracking-[0.24em] text-slate-100">Photo Gallery</span>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-100">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
        >
          <FaChevronRight />
        </button>

        {/* Full-Screen Toggle Button */}
        <button
          onClick={() => setIsFullScreen(true)}
          className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70 shadow-lg"
          title="View Full Image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          >
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20 transition-colors"
            >
              <FaChevronLeft className="text-xl" />
            </button>

            <img
              src={images[currentIndex]}
              alt={`Property Full ${currentIndex + 1}`}
              className="max-h-[90vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20 transition-colors"
            >
              <FaChevronRight className="text-xl" />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white font-medium text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`group overflow-hidden rounded-[1.5rem] border transition duration-300 ${
              currentIndex === index ? "border-emerald-500 shadow-[0_20px_40px_rgba(16,185,129,0.12)]" : "border-slate-200"
            }`}
          >
            <img
              src={image}
              alt={`Property ${index + 1}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/300x200?text=Image+Not+Found";
              }}
              className="w-full h-24 object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
