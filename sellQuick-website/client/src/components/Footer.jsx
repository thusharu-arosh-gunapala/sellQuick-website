import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#09090b] text-zinc-300">
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-60 w-[50rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-transparent blur-[100px]" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:py-12">
        
        {/* Compact Modern Top CTA */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to find your dream property?
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Let our experts guide you through every step of the journey.
            </p>
          </div>
          <a 
            href="#contact" 
            className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 hover:gap-3"
          >
            Contact Us Today
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4 lg:gap-10">
          
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-white">DreamHome</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
              Premium listings, modern service, and trusted local advice.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[
                { Icon: FaFacebookF, href: "#", label: "Facebook" },
                { Icon: FaInstagram, href: "#", label: "Instagram" },
                { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
                { Icon: FaWhatsapp, href: "https://wa.me/94771234567", label: "WhatsApp" },
              ].map(({ Icon, href, label }, i) => (
                <a 
                  key={i}
                  href={href} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="text-xs" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {["Home", "Properties", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().split(" ")[0]}`} 
                    className="group inline-flex items-center text-zinc-300 transition-colors hover:text-white"
                  >
                    <span className="mr-0 h-1 w-0 rounded-full bg-white transition-all duration-300 group-hover:mr-2 group-hover:w-3"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Our Expertise</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {["Luxury Villas", "Apartments", "Commercial", "Lands & Plots", "Holiday Homes"].map((item) => (
                <li key={item} className="text-zinc-300 transition-colors hover:text-white cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Contact</h4>
            <div className="mt-4 space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5 text-zinc-300">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-xs text-zinc-500" />
                <span>Colombo, Sri Lanka</span>
              </div>
              <a href="tel:+94771234567" className="flex items-center gap-2.5 text-zinc-300 transition-colors hover:text-white">
                <FaPhone className="flex-shrink-0 text-xs text-zinc-500" />
                +94 77 123 4567
              </a>
              <a href="mailto:info@dreamhome.com" className="flex items-center gap-2.5 text-zinc-300 transition-colors hover:text-white">
                <FaEnvelope className="flex-shrink-0 text-xs text-zinc-500" />
                info@dreamhome.com
              </a>
              
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 transition-colors hover:bg-emerald-500/20"
              >
                <FaWhatsapp />
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>

        {/* Compact Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row">
          <p>© 2026 DreamHome. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;