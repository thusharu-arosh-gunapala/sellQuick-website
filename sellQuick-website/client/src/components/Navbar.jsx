import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.jpg";

// Helper component for desktop links to handle active states cleanly
const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 group ${
        isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {children}
      {/* Animated underline */}
      <span
        className={`absolute inset-x-4 bottom-0 h-0.5 origin-left transform rounded-full bg-blue-600 transition-transform duration-300 ease-out ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo - Cleaned up */}
        <Link 
          to="/" 
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src={logo}
            alt="Sell Quick logo"
            className="h-11 w-11 rounded-xl object-cover shadow-sm ring-1 ring-slate-200"
          />
          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight text-slate-900">Sell Quick</p>
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Property</p>
          </div>
        </Link>

        {/* Desktop Menu - Removed bubble, added animated underlines */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Desktop CTA - Refined */}
        <div className="hidden md:flex items-center pl-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-600 hover:shadow-md hover:shadow-blue-500/20"
          >
            Book Visit
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button - Refined */}
        <button
          className="rounded-lg p-2 text-2xl text-slate-800 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu - Smoother animation and cleaner layout */}
      <div
        className={`overflow-hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {[
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
            { name: "Contact", path: "/contact" }
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-600"
            >
              Book Visit
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;