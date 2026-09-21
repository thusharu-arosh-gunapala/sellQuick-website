import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import API from "../services/api";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
  const [includeVideoTour, setIncludeVideoTour] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    phone: "",
    whatsapp: "",
    videoUrl: "",
    status: "Active",
    description: "",
    features: "",
    nearby: "",
    isFeatured: false,
  });

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);

      setFormData({
        title: res.data.title || "",
        price: res.data.price || "",
        location: res.data.location || "",
        type: res.data.type || "",
        bedrooms: res.data.bedrooms || "",
        bathrooms: res.data.bathrooms || "",
        area: res.data.area || "",
        phone: res.data.phone || "",
        whatsapp: res.data.whatsapp || "",
        videoUrl: res.data.videoUrl || "",
        status: res.data.status || "Active",
        description: res.data.description || "",
        isFeatured: Boolean(res.data.isFeatured),

        features:
          Array.isArray(res.data.features)
            ? res.data.features.join("\n")
            : "",

        nearby:
          Array.isArray(res.data.nearby)
            ? res.data.nearby.join("\n")
            : "",
      });

      if (res.data.videoUrl || res.data.video) {
        setIncludeVideoTour(true);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Failed to load property");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Basic Info
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("type", formData.type);
      data.append("status", formData.status);
      data.append("isFeatured", formData.isFeatured);
      
      // Specifications
      data.append("bedrooms", Number(formData.bedrooms));
      data.append("bathrooms", Number(formData.bathrooms));
      data.append("area", formData.area);
      
      // Contact & Media URLs
      data.append("phone", formData.phone);
      data.append("whatsapp", formData.whatsapp);
      if (includeVideoTour) {
        data.append("videoUrl", formData.videoUrl);
      } else {
        data.append("videoUrl", "");
      }
      
      // Descriptions
      data.append("description", formData.description);

      // Convert multi-line strings to JSON arrays for backend
      data.append("features", JSON.stringify(formData.features.split("\n").filter((item) => item.trim())));
      data.append("nearby", JSON.stringify(formData.nearby.split("\n").filter((item) => item.trim())));

      // Append Video File
      if (includeVideoTour && videoFile) {
        data.append("videoFile", videoFile);
      }

      await API.put(`/properties/${id}`, data);

      alert("Property Updated Successfully");

      navigate("/properties");
    } catch (error) {
      console.error(error);
      alert("Failed to Update Property");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <h2 className="text-2xl font-semibold">
            Loading Property...
          </h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit Property
          </h1>

          <p className="text-gray-500 mt-2">
            Update property information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Property Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Price
              </label>

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Property Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Select Property Type</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Bedrooms
              </label>

              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Bathrooms
              </label>

              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Area
              </label>

              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            {/* Featured Property Toggle */}
            <div className="flex items-center justify-between md:col-span-2 mt-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="text-sm font-medium text-slate-800">Featured Property</label>
                <p className="text-xs text-slate-500 mt-0.5">Showcase this property in the Featured section on the homepage.</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.isFeatured ? "bg-slate-900" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.isFeatured ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                WhatsApp
              </label>

              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">
              Features (One Per Line)
            </label>

            <textarea
              rows="6"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">
              Nearby Locations (One Per Line)
            </label>

            <textarea
              rows="4"
              name="nearby"
              value={formData.nearby}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
            />
          </div>

          {/* Video Tour Toggle */}
          <div className="flex items-center justify-between mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="text-sm font-medium text-slate-800">Video Tour (Optional)</label>
              <p className="text-xs text-slate-500 mt-0.5">Include a virtual video tour for this property.</p>
            </div>
            <button
              type="button"
              onClick={() => setIncludeVideoTour(!includeVideoTour)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                includeVideoTour ? "bg-slate-900" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  includeVideoTour ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {includeVideoTour && (
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block mb-2 font-medium">Upload Property Video</label>
                <input 
                  type="file" 
                  accept="video/*" 
                  onChange={(e) => setVideoFile(e.target.files[0])} 
                  className="w-full border rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer" 
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">External Video URL</label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="mt-1 text-xs text-slate-400">Embed a YouTube/Vimeo link.</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4">

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Update Property
            </button>

            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="bg-gray-300 hover:bg-gray-400 px-8 py-4 rounded-xl font-semibold"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </AdminLayout>
  );
};

export default EditProperty;