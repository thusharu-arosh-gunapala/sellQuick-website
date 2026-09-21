import { Link } from "react-router-dom";
import { FaBed, FaBath, FaMapMarkerAlt, FaHeart, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { getMediaUrl } from "../services/api";

// Ensure you have this in your index.html <head>
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">

const PropertyCard = ({ property }) => {
  const bedrooms = property.bedrooms || property.beds || 0;
  const bathrooms = property.bathrooms || property.baths || 0;
  const listingNo = String(property._id || property.id || "0").slice(-6).toUpperCase();
  const imageSrc = getMediaUrl(
    property.images?.[0] || property.image || ""
  );

  return (
    <motion.div
      whileHover={{ y: -4 }} // Reduced upward movement to prevent harsh side shadows
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.1)] transition-shadow duration-300 hover:shadow-[0_15px_40px_-15px_rgba(15,23,42,0.15)]"
    >
      {/* Corner brackets — appear on hover */}
      {/* <span className="pointer-events-none absolute left-3 top-3 z-20 h-4 w-4 border-l-2 border-t-2 border-[#A9814F] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-50" />
      <span className="pointer-events-none absolute right-3 top-3 z-20 h-4 w-4 border-r-2 border-t-2 border-[#A9814F] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-50" />
      <span className="pointer-events-none absolute bottom-3 left-3 z-20 h-4 w-4 border-b-2 border-l-2 border-[#A9814F] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-50" />
      <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-4 w-4 border-b-2 border-r-2 border-[#A9814F] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-50" /> */}

      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={imageSrc || "https://placehold.co/800x500?text=No+Image"}
          alt={property.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/800x500?text=No+Image";
          }}
          className="h-64 w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

        {/* Top Tags */}
        <div className="absolute left-4 top-4 z-10 flex flex-col items-start gap-2">
          {property.isFeatured && (
            <div className="bg-[#A9814F] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-white shadow-sm">
              Featured
            </div>
          )}
          <div className="bg-white/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-slate-800 shadow-sm">
            For Sale
          </div>
        </div>

        {/* Save Button */}
        <button
          aria-label="Save property"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white shadow-lg backdrop-blur-md transition-all hover:bg-black/40 hover:text-[#A9814F]"
        >
          <FaHeart className="text-sm" />
        </button>

        {/* Bottom Location Tag */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-100">
          <FaMapMarkerAlt className="text-[10px] text-[#A9814F]" />
          <span className="font-['Inter']">{property.location}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6">
        {/* Top Meta Line */}
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-slate-400">
            Property ID: {listingNo}
          </span>
          <span className="relative text-[11px] font-medium uppercase tracking-wider text-slate-600">
            {property.type || "Property"}
            <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-slate-300 transition-all duration-300 group-hover:bg-[#A9814F]"></span>
          </span>
        </div>

        {/* Title & Price */}
        <div className="mb-5 flex flex-col gap-1">
          <h3 className="font-['Fraunces'] text-lg font-normal leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#A9814F]">
            {property.title}
          </h3>
          <p className="font-['Fraunces'] text-2xl font-medium tracking-tight text-slate-900">
            {property.price}
          </p>
        </div>

        {/* Specs */}
        <div className="mb-5 flex items-center gap-5 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-['Inter']">
            <FaBed className="text-[14px] text-slate-400" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 font-['Inter']">
            <FaBath className="text-[14px] text-slate-400" />
            <span>{bathrooms} Baths</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/property/${property._id}`}
          className="group/btn flex items-center justify-between rounded-xl bg-slate-900 px-5 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#A9814F]"
        >
          View Property Details
          <motion.span
            className="inline-flex items-center"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard;