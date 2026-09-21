import { useState, useEffect } from "react";
import { FaSave, FaCheckCircle, FaAddressBook } from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import API from "../services/api";

const ContactUpdate = () => {
  const [settings, setSettings] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [showToast, setShowToast] = useState(false);

  const labelClass = "block mb-1.5 text-sm font-medium text-slate-700";
  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-slate-900 transition-colors text-sm text-slate-700 placeholder:text-slate-400";

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/settings");
        if (res.data) {
          setSettings({
            email: res.data.email || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(settings).forEach((key) => {
        formData.append(key, settings[key]);
      });

      await API.put("/settings", formData);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto relative">
        {/* Success Toast Notification */}
        {showToast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 pl-4 pr-6 py-3 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-5 duration-300">
            <FaCheckCircle className="text-emerald-500" />
            <span className="text-sm font-medium">Contact settings saved successfully!</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-3">
            <FaAddressBook className="text-slate-700" />
            Contact Page Update
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Update the contact information displayed on the public Contact page.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Contact Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="info@yourdomain.com"
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="+94 77 123 4567"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Office Address</label>
              <textarea
                rows="3"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className={inputClass}
                placeholder="123 Main Street, City"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors w-full md:w-auto"
            >
              <FaSave className="text-sm" />
              Save Contact Info
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ContactUpdate;
