import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import PropertyCard from "../components/PropertyCard";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import API from "../services/api";

// Inline SVG Icons for a minimalist look
const IconVerified = () => (
  <svg className="w-8 h-8 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const IconAgent = () => (
  <svg className="w-8 h-8 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const IconPrice = () => (
  <svg className="w-8 h-8 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
);
const IconStar = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
);

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);
  const scrollRef = useRef(null);

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: "Nimal Perera",
      role: "Homeowner",
      avatar: "https://i.pravatar.cc/150?img=12",
      text: "The service was exceptional. I found my dream home within a week. Highly professional and transparent process!",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Investor",
      avatar: "https://i.pravatar.cc/150?img=5",
      text: "As an overseas investor, I needed a team I could trust. They handled everything perfectly. Great ROI so far.",
    },
    {
      id: 3,
      name: "Aruni Silva",
      role: "Tenant",
      avatar: "https://i.pravatar.cc/150?img=9",
      text: "Smooth renting experience. The team was very responsive to my queries and maintenance requests. Highly recommended.",
    },
    {
      id: 4,
      name: "David Chen",
      role: "Business Owner",
      avatar: "https://i.pravatar.cc/150?img=15",
      text: "Found the perfect commercial space for my startup. The agents understood my requirements perfectly and delivered fast.",
    },
  ];

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Auto-play slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties");
      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  // Only properties explicitly marked as featured
  const featuredProperties = properties.filter((p) => p.isFeatured === true);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Properties Section */}
      <section className="py-20 bg-slate-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Centered Header & Controls */}
          <div className="mb-12 text-center relative max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#A9814F]">
              <FaStar className="text-[10px]" /> Handpicked Selection
            </span>
            <h2 className="mt-3 font-['Fraunces'] text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl">
              Featured Properties
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Explore our top-tier properties handpicked for luxury living and exceptional investment.
            </p>
          </div>

          {/* Controls & View All Bar */}
          <div className="mb-8 flex items-center justify-end">
            {/* Navigation Arrows */}
            {featuredProperties.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollLeft}
                  aria-label="Scroll left"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95"
                >
                  <FaChevronLeft className="text-sm" />
                </button>
                <button
                  onClick={scrollRight}
                  aria-label="Scroll right"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95"
                >
                  <FaChevronRight className="text-sm" />
                </button>
              </div>
            )}
          </div>

          {/* Horizontal Scroll Carousel */}
          {featuredProperties.length > 0 ? (
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-1 no-scrollbar scrollbar-none snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featuredProperties.map((property, idx) => (
                <motion.div
                  key={property._id || property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="w-[320px] sm:w-[360px] lg:w-[390px] flex-shrink-0 snap-start"
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
              <p className="font-['Fraunces'] text-xl text-slate-700">No Featured Properties Available</p>
              <p className="mt-2 text-sm text-slate-500">
                Check back soon or explore all available properties.
              </p>
              <Link
                to="/properties"
                className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white hover:bg-[#A9814F] transition-colors"
              >
                View All Listings
              </Link>
            </div>
          )}

          {/* Browse All Properties Button */}
          {featuredProperties.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Link
                to="/properties"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#A9814F] hover:shadow-xl"
              >
                Browse All Properties
                <FaChevronRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">Our Values</span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Why Choose Us</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { Icon: IconVerified, title: "Verified Listings", desc: "All properties are carefully checked and verified before publishing." },
              { Icon: IconAgent, title: "Trusted Agents", desc: "Professional property consultants ready to assist you 24/7." },
              { Icon: IconPrice, title: "Best Prices", desc: "Competitive market prices with excellent investment opportunities." },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                <feature.Icon />
                <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="leading-relaxed text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            {[
              { num: "500+", label: "Properties Listed" },
              { num: "1.2K+", label: "Happy Clients" },
              { num: "25+", label: "Cities Covered" }
            ].map((stat, index) => (
              <div key={index} className="transition-transform duration-500 hover:scale-110">
                <h3 className="text-5xl font-bold tracking-tight text-slate-900">{stat.num}</h3>
                <p className="mt-2 text-lg font-medium text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews Section (AUTO-SLIDER) */}
      <section className="bg-gray-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">Testimonials</span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">What Our Clients Say</h2>
          </div>

          {/* Slider Container */}
          <div className="relative mx-auto max-w-3xl overflow-hidden">
            <div className="relative h-[380px] md:h-[300px]">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`absolute inset-0 flex flex-col items-center justify-start text-center transition-all duration-700 ease-in-out ${
                    index === currentReview
                      ? "opacity-100 translate-y-0 z-10"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >
                  <div className="mb-6 flex">
                    {[...Array(5)].map((_, i) => <IconStar key={i} />)}
                  </div>
                  <p className="mb-8 max-w-2xl text-xl leading-relaxed text-gray-600 italic md:text-2xl">
                    "{review.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-blue-100"
                    />
                    <div className="ml-4 text-left">
                      <p className="font-bold text-slate-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="mt-8 flex justify-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentReview
                      ? "w-8 bg-blue-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 text-center shadow-2xl sm:px-16">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900 opacity-40"></div>
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Find Your Dream Property Today</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
                Contact our expert team today for professional assistance and personalized property recommendations.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;