import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPhone,
  FaArrowLeft,
  FaHome,
  FaCar,
  FaShieldAlt,
  FaTree,
  FaSnowflake,
  FaCamera,
  FaCheck,
} from "react-icons/fa";

import PropertyGallery from "../components/PropertyGallery";
import PropertyCard from "../components/PropertyCard";
import API, { getMediaUrl } from "../services/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperty = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProperty();
  }, [id]);

  // Loading state with a spinner that matches the UI aesthetic
  if (loading || !property) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-['Inter']">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A9814F]"></div>
      </div>
    );
  }

  // Fallbacks in case the API doesn't return these specific fields
  const rawImages =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : property.image
      ? [property.image]
      : [];
  const images = rawImages.map(getMediaUrl).filter(Boolean);
  const detailItems = property.details || [];
  const relatedProperties = property.relatedProperties || []; // Assuming API might return this, otherwise empty

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 font-['Inter']">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        
        {/* Back Navigation & Breadcrumbs */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-200/80 pb-4">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 shadow-sm transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95"
          >
            <FaArrowLeft className="text-[11px]" />
            Back to Properties
          </Link>

          {/* Breadcrumb Path */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link to="/" className="hover:text-slate-700 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-slate-700 transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-slate-900 truncate max-w-[200px]">{property.title}</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          
          {/* Left Column */}
          <div className="space-y-8">
            <PropertyGallery images={images} />

            {/* Title & Meta */}
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.3em] text-[#A9814F]">
                Featured Property
              </span>
              <h1 className="mt-3 font-['Fraunces'] text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl">
                {property.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <p className="font-['Fraunces'] text-3xl font-medium text-slate-900">
                  {property.price}
                </p>
                {property.location && (
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <FaMapMarkerAlt className="text-[#A9814F]" />
                    <span className="tracking-wide">{property.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-slate-200"></div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: <FaRulerCombined />, label: "Area Size(Perch)", value: property.area },
                { icon: <FaBed />, label: "Bedrooms", value: `${property.bedrooms} Beds` },
                { icon: <FaBath />, label: "Bathrooms", value: `${property.bathrooms} Baths` },
               
              ].map((stat, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-[#A9814F]">
                    {stat.icon}
                  </div>
                  <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="font-['Fraunces'] text-2xl font-medium tracking-tight text-slate-900">
                  About this Property
                </h2>
                <p className="mt-4 leading-8 text-slate-600">{property.description}</p>
              </div>
            )}

            {/* Property Details List */}
            {detailItems.length > 0 && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <h3 className="mb-5 font-['Fraunces'] text-xl font-medium tracking-tight text-slate-900">
                  Property Details
                </h3>
                <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {detailItems.map((item, index) => (
                    <div key={`${item.text}-${index}`} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] ${item.highlight ? "bg-[#A9814F] text-white" : "bg-slate-100 text-slate-400"}`}>
                        <FaCheck />
                      </span>
                      <span className={`text-sm ${item.highlight ? "font-medium text-slate-800" : "text-slate-500"}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <FaHome className="text-[#A9814F]" />
                <h2 className="font-['Fraunces'] text-2xl font-medium tracking-tight text-slate-900">
                  Property Highlights
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { icon: <FaCar />, label: "Garage" },
                  { icon: <FaShieldAlt />, label: "24/7 Security" },
                  { icon: <FaTree />, label: "Garden View" },
                  { icon: <FaSnowflake />, label: "Air Conditioning" },
                ].map((item) => (
                  <div key={item.label} className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all hover:border-[#A9814F]/30 hover:bg-slate-50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors group-hover:bg-[#A9814F]">
                      {item.icon}
                    </div>
                    <p className="font-semibold tracking-tight text-slate-900">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:sticky lg:top-12 lg:self-start">
            <div className="space-y-6">
              
              {/* Concierge Card */}
              <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <div className="bg-slate-900 p-8 text-white">
                  <p className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-[0.2em] text-[#A9814F]">
                    PROPERTY ID: {String(property._id || property.id || "0").slice(-6).toUpperCase()}
                  </p>
                  <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-400">Sale Price</p>
                  <h2 className="mt-2 font-['Fraunces'] text-4xl font-medium tracking-tight">
                    {property.price}
                  </h2>
                </div>

                <div className="p-8">
                  <div className="space-y-4 border-b border-slate-100 pb-6 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Type</span>
                      <span className="font-semibold text-slate-900">Modern Villa</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Area Size (Perch)</span>
                      <span className="font-semibold text-slate-900">{property.area}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Bedrooms</span>
                      <span className="font-semibold text-slate-900">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Bathrooms</span>
                      <span className="font-semibold text-slate-900">{property.bathrooms}</span>
                    </div>

                  </div>

                  <div className="mt-6 space-y-3">
                    {property.phone && (
                      <a
                        href={`tel:${property.phone}`}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-4 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-slate-800"
                      >
                        <FaPhone />
                        Call Agent
                      </a>
                    )}
                    {property.whatsapp && (
                      <a
                        href={`https://wa.me/${property.whatsapp}?text=${encodeURIComponent(`Hello, I'm interested in property (ID: ${property._id || property.id}) - ${property.title}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 transition-all hover:bg-slate-50"
                      >
                        <FaWhatsapp className="text-lg text-[#25D366]" />
                        Message on WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Agent Card */}
              <div className="flex items-center gap-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Agent"
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="font-['Fraunces'] text-xl font-medium tracking-tight text-slate-900">Rohan Perera</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">Property Consultant</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Full Width Sections */}
        
        {/* Video Tour */}
        {(property.videoUrl || property.video) && (
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <FaCamera className="text-[#A9814F]" />
              <h2 className="font-['Fraunces'] text-2xl font-medium tracking-tight text-slate-900">Video Tour</h2>
            </div>
            <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              {property.videoUrl ? (
                <iframe
                  className="h-full w-full"
                  src={property.videoUrl.includes('watch?v=') ? property.videoUrl.replace('watch?v=', 'embed/') : property.videoUrl}
                  title="Property tour video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  className="h-full w-full object-cover"
                  controls
                  src={getMediaUrl(property.video)}
                ></video>
              )}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="mt-16 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          <h2 className="font-['Fraunces'] text-2xl font-medium tracking-tight text-slate-900">Building Amenities</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Swimming Pool",
              "Parking Area",
              "Security System",
              "Garden",
              "Air Conditioning",
              "CCTV Cameras",
            ].map((service) => (
              <div key={service} className="flex items-center gap-3 border border-slate-100 bg-slate-50/50 rounded-xl px-4 py-4 text-sm font-medium text-slate-700">
                <span className="flex h-2 w-2 rounded-full bg-[#A9814F]"></span>
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Location Map */}
        <div className="mt-16">
          <h2 className="mb-6 font-['Fraunces'] text-2xl font-medium tracking-tight text-slate-900">Location</h2>
          <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            <iframe
              className="h-full w-full grayscale-[20%]"
              src={`https://www.google.com/maps?q=${property.location || 'Colombo'}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              title="Property location map"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-20">
            <div className="mb-8 text-center">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.3em] text-[#A9814F]">
                Continue Searching
              </span>
              <h2 className="mt-3 font-['Fraunces'] text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
                Related Properties
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProperties.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;