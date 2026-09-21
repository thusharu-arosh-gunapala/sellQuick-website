import { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import API from "../services/api";

const Contact = () => {
  const [settings, setSettings] = useState({
    phone: "+94 77 123 4567",
    email: "info@dreamhome.com",
    address: "Colombo, Sri Lanka",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/settings");
        if (res.data) {
          setSettings({
            phone: res.data.phone || "+94 77 123 4567",
            email: res.data.email || "info@dreamhome.com",
            address: res.data.address || "Colombo, Sri Lanka",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
  };

  const contactItems = [
    {
      icon: <FaPhoneAlt className="text-xl" />,
      title: "Phone Number",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/[^0-9+]/g, "")}`,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      icon: <FaWhatsapp className="text-xl" />,
      title: "WhatsApp",
      value: "Chat with us instantly",
      href: `https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}`,
      accent: "bg-green-50 text-green-600",
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      title: "Email Address",
      value: settings.email,
      href: `mailto:${settings.email}`,
      accent: "bg-rose-50 text-rose-600",
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      title: "Office Address",
      value: settings.address,
      href: "#map",
      accent: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-40">
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#0f172a_0%,#1e3a8a_55%,#0f172a_100%)] py-6 text-white sm:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_32%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-100 backdrop-blur-md">
            Contact Us
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Let’s find your perfect place
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
            Reach out to our expert team for property guidance, bookings, or any questions about your next move.
          </p>
        </div>
      </section>
 
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Get in touch</h2>
            <p className="mt-3 max-w-xl text-lg text-slate-600">
              We’re here to help you with listings, private tours, and tailored real-estate advice.
            </p>

            <div className="mt-6 grid gap-4">
              {contactItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.accent}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Send a message</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">We’ll reach out soon</h2>
            </div>
 
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white"
              />
              <textarea
                rows="5"
                placeholder="Write Your Message..."
                required
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
              >
                Send Message
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={`tel:${settings.phone.replace(/[^0-9+]/g, "")}`} className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            Call Now
          </a>
          <a href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
            WhatsApp Us
          </a>
        </div>
 
        <div id="map" className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <h2 className="text-3xl font-semibold text-slate-900">Find us on the map</h2>
          <div className="mt-6 aspect-[16/9] overflow-hidden rounded-[2rem]">
            <iframe
              className="h-full w-full"
              src="https://maps.google.com/maps?q=Colombo&t=&z=13&ie=UTF8&iwloc=&output=embed"
              title="Google map"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
