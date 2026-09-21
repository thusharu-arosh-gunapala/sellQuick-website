import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaHome } from "react-icons/fa";
import API from "../services/api";

const HeroSection = () => {
  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/settings");
        if (res.data && res.data.heroImageUrl) {
          setHeroImage(`http://localhost:5000${res.data.heroImageUrl}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('${heroImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,6,23,0.88),rgba(15,23,42,0.65),rgba(2,6,23,0.9))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_35%)]" />

      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-6 top-24 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-blue-100 backdrop-blur-md"
            >
              Trusted Real Estate Platform
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
            >
              Find Your
              <span className="block bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Dream Home
              </span>
              Today
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl"
            >
              We help you buy your dream home or sell your property fast — at the best value.

            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/properties"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
              >
                Browse Properties
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/20 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Contact Agent
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 grid gap-6 sm:grid-cols-3"
            >
              {[
                { value: "500+", label: "Properties" },
                { value: "1200+", label: "Happy Clients" },
                { value: "25+", label: "Cities" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-md">
                  <h3 className="text-2xl font-bold text-white">{item.value}</h3>
                  <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="rounded-[1rem] border border-white/20 bg-white/90 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
          >
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Find your perfect home</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Start your search now</h2>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <FaMapMarkerAlt className="text-blue-600" />
                <input type="text" placeholder="Location" className="w-full bg-transparent outline-none" />
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <FaHome className="text-blue-600" />
                <select className="w-full bg-transparent outline-none">
                  <option>Property Type</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Land</option>
                </select>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input type="number" placeholder="Budget" className="w-full bg-transparent outline-none" />
              </div>

              <Link
                to="/Properties"
                className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-600"
              >
                <FaSearch />
                Search Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;