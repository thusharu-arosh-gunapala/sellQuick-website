import { useState, useEffect } from "react";
import { FaSave, FaUpload, FaCheckCircle } from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import API from "../services/api";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  });

  const [preferences, setPreferences] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const [logoPreview, setLogoPreview] = useState("https://via.placeholder.com/150x50?text=Logo");
  const [logoFile, setLogoFile] = useState(null);
  
  const [heroImagePreview, setHeroImagePreview] = useState("https://via.placeholder.com/300x150?text=Hero+Image");
  const [heroImageFile, setHeroImageFile] = useState(null);
  
  const [showToast, setShowToast] = useState(false);

  const labelClass = "block mb-1.5 text-sm font-medium text-slate-700";
  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-slate-900 transition-colors text-sm text-slate-700 placeholder:text-slate-400";
  const fileInputClass = "block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer";

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/settings");
        if (res.data) {
          setSettings({
            siteName: res.data.siteName || "",
            siteDescription: res.data.siteDescription || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
            facebook: res.data.facebook || "",
            instagram: res.data.instagram || "",
            youtube: res.data.youtube || "",
            linkedin: res.data.linkedin || "",
          });
          setPreferences({
            maintenanceMode: res.data.maintenanceMode || false,
            allowRegistrations: res.data.allowRegistrations ?? true,
          });
          if (res.data.logoUrl) {
            setLogoPreview(`http://localhost:5000${res.data.logoUrl}`);
          }
          if (res.data.heroImageUrl) {
            setHeroImagePreview(`http://localhost:5000${res.data.heroImageUrl}`);
          }
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

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Toggle Switches
  const handleToggle = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.new || passwords.confirm) {
      if (passwords.new !== passwords.confirm) {
        setPasswordError("New password and confirm password do not match.");
        return;
      }
      if (passwords.new.length < 6) {
        setPasswordError("Password must be at least 6 characters long.");
        return;
      }
    }
    
    setPasswordError("");
    
    try {
      const formData = new FormData();
      Object.keys(settings).forEach(key => {
        formData.append(key, settings[key]);
      });
      formData.append("maintenanceMode", preferences.maintenanceMode);
      formData.append("allowRegistrations", preferences.allowRegistrations);
      
      if (logoFile) formData.append("logo", logoFile);
      if (heroImageFile) formData.append("heroImage", heroImageFile);

      await API.put("/settings", formData);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto relative">
        
        {/* Success Toast Notification */}
        {showToast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 pl-4 pr-6 py-3 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-5 duration-300">
            <FaCheckCircle className="text-emerald-500" />
            <span className="text-sm font-medium">Settings saved successfully!</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Website Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage website information and profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Website Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Website Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass}>Website Name</label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              
              {/* New Feature: Logo Upload with Preview */}
              <div>
                <label className={labelClass}>Website Logo</label>
                <div className="flex flex-col gap-4">
                  <img 
                    src={logoPreview} 
                    alt="Logo Preview" 
                    className="h-16 w-auto rounded-lg border border-slate-200 p-1 object-contain bg-slate-50 self-start"
                  />
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className={fileInputClass}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
                <label className={labelClass}>Hero Section Background Image</label>
                <div className="flex flex-col gap-4">
                  <img 
                    src={heroImagePreview} 
                    alt="Hero Image Preview" 
                    className="h-32 w-auto max-w-full rounded-lg border border-slate-200 p-1 object-cover bg-slate-50 self-start"
                  />
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                    className={fileInputClass}
                  />
                </div>
            </div>

            <div>
              <label className={labelClass}>Website Description</label>
              <textarea
                rows="3"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className={inputClass}
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
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Office Address</label>
              <textarea
                rows="2"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Section 3: Social Media Links */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Social Media Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Facebook URL</label>
                <input type="text" name="facebook" placeholder="https://facebook.com/..." value={settings.facebook} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Instagram URL</label>
                <input type="text" name="instagram" placeholder="https://instagram.com/..." value={settings.instagram} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>YouTube URL</label>
                <input type="text" name="youtube" placeholder="https://youtube.com/..." value={settings.youtube} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>LinkedIn URL</label>
                <input type="text" name="linkedin" placeholder="https://linkedin.com/..." value={settings.linkedin} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* New Section: Site Preferences (Toggle Switches) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Site Preferences</h2>
            <div className="space-y-4">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-medium text-slate-800">Maintenance Mode</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Temporarily disable access to the frontend website.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="maintenanceMode" checked={preferences.maintenanceMode} onChange={handleToggle} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                </label>
              </div>
              
              {/* Toggle 2 */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="text-sm font-medium text-slate-800">Allow User Registrations</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Enable new customers to create accounts.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="allowRegistrations" checked={preferences.allowRegistrations} onChange={handleToggle} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Section 5: Change Password */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Current Password</label>
                <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} className={inputClass} placeholder="••••••••" />
              </div>
              <div>
                <label className={labelClass}>New Password</label>
                <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} className={inputClass} placeholder="••••••••" />
              </div>
              <div>
                <label className={labelClass}>Confirm Password</label>
                <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} className={inputClass} placeholder="••••••••" />
              </div>
            </div>
            {/* Password Error Message */}
            {passwordError && (
              <p className="mt-4 text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors w-full md:w-auto"
            >
              <FaSave className="text-sm" />
              Save Settings
            </button>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

export default Settings;