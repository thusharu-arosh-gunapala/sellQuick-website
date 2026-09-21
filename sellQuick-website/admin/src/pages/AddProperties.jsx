import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../services/api";

const AddProperty = () => {
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
    highlights: "",
    amenities: "",
    nearby: "",
    mapLat: "",
    mapLng: "",
    isFeatured: false, // New: Featured toggle state
  });

  const [images, setImages] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [includeVideoTour, setIncludeVideoTour] = useState(false);
  const [includeMap, setIncludeMap] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reusable function to toggle any array-based text field
  const toggleArrayItem = (fieldName, item) => {
    const currentItems = formData[fieldName].split("\n").filter(Boolean);
    let newItems;

    if (currentItems.includes(item)) {
      newItems = currentItems.filter((i) => i !== item);
    } else {
      newItems = [...currentItems, item];
    }

    setFormData({ ...formData, [fieldName]: newItems.join("\n") });
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
      data.append("isFeatured", formData.isFeatured); // New: Append featured state
      
      // Specifications
      data.append("bedrooms", formData.bedrooms);
      data.append("bathrooms", formData.bathrooms);
      data.append("area", formData.area);
      
      // Contact & Media URLs
      data.append("phone", formData.phone);
      data.append("whatsapp", formData.whatsapp);
      data.append("videoUrl", formData.videoUrl);
      
      // Map Location
      data.append("mapLat", includeMap ? formData.mapLat : "");
      data.append("mapLng", includeMap ? formData.mapLng : "");

      // Descriptions
      data.append("description", formData.description);

      // Convert multi-line strings to JSON arrays for backend
      data.append("features", JSON.stringify(formData.features.split("\n").filter(Boolean)));
      data.append("highlights", JSON.stringify(formData.highlights.split("\n").filter(Boolean)));
      data.append("amenities", JSON.stringify(formData.amenities.split("\n").filter(Boolean)));
      data.append("nearby", JSON.stringify(formData.nearby.split("\n").filter(Boolean)));

      // Append Images
      images.forEach((image) => {
        data.append("images", image);
      });

      // Append Video File
      if (videoFile) {
        data.append("videoFile", videoFile);
      }

      const res = await API.post("/properties", data);

      console.log(res.data);
      alert("Property Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed To Add Property");
    }
  };

  // Reusable styling classes
  const labelClass = "block mb-1.5 text-sm font-medium text-slate-700";
  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-slate-900 transition-colors text-sm text-slate-700 placeholder:text-slate-400";
  const fileInputClass = "block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer";

  // Predefined lists for quick select
  const commonFeatures = ["Swimming Pool", "Parking Area", "Security System", "Garden", "Air Conditioning", "CCTV Cameras"];
  const commonHighlights = ["Garage", "24/7 Security", "Garden View", "Air Conditioning", "Solar Power", "Smart Home System"];
  const commonAmenities = ["Swimming Pool", "Gym", "Elevator", "Roof Terrace", "Backup Generator", "Fire Safety System"];

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Add New Property
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create a new property listing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
          
          {/* Section 1: Basic Information */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Property Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="Luxury Modern Villa" required />
              </div>
              <div>
                <label className={labelClass}>Price</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} className={inputClass} placeholder="$450,000" required />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="Colombo" required />
              </div>
              <div>
                <label className={labelClass}>Property Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className={inputClass} required>
                  <option value="">Select Type</option>
                  <option>Villa</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Land</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Sold</option>
                </select>
              </div>

              {/* New: Featured Property Toggle */}
              <div className="flex items-center justify-between md:col-span-2 mt-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div>
                  <label className="text-sm font-medium text-slate-700">Featured Property</label>
                  <p className="text-xs text-slate-500 mt-0.5">Showcase this property on the homepage.</p>
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
            </div>
          </div>

          <div className="border-t border-slate-100 my-8"></div>

          {/* Section 2: Specifications */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className={inputClass} placeholder="4" />
              </div>
              <div>
                <label className={labelClass}>Bathrooms</label>
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className={inputClass} placeholder="3" />
              </div>
              <div>
                <label className={labelClass}>Area Size</label>
                <input type="text" name="area" value={formData.area} onChange={handleChange} className={inputClass} placeholder="10 perch" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 my-8"></div>

          {/* Section 3: Media & Contact */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Media & Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Contact Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+94 77 123 4567" />
              </div>
              <div>
                <label className={labelClass}>WhatsApp Number</label>
                <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className={inputClass} placeholder="+94 77 123 4567" />
              </div>
              
              <div className="md:col-span-2 mt-2">
                <label className={labelClass}>Property Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
                  className={fileInputClass}
                />
                
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video bg-slate-50">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = [...images];
                                newImages.splice(index, 1);
                                setImages(newImages);
                              }}
                              className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
                              title="Remove Image"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => {
                                if (index > 0) {
                                  const newImages = [...images];
                                  [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
                                  setImages(newImages);
                                }
                              }}
                              className={`p-1.5 rounded-full bg-white text-slate-900 shadow-sm transition-colors ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-200'}`}
                              disabled={index === 0}
                              title="Move Left"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            
                            <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 rounded-md">
                              {index + 1}
                            </span>
                            
                            <button
                              type="button"
                              onClick={() => {
                                if (index < images.length - 1) {
                                  const newImages = [...images];
                                  [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
                                  setImages(newImages);
                                }
                              }}
                              className={`p-1.5 rounded-full bg-white text-slate-900 shadow-sm transition-colors ${index === images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-200'}`}
                              disabled={index === images.length - 1}
                              title="Move Right"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between md:col-span-2 mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div>
                  <label className="text-sm font-medium text-slate-700">Video Tour (Optional)</label>
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
                <>
                  <div className="md:col-span-1 mt-2">
                    <label className={labelClass}>Upload Property Video</label>
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={(e) => setVideoFile(e.target.files[0])} 
                      className={fileInputClass} 
                    />
                  </div>

                  <div className="md:col-span-1 mt-2">
                    <label className={labelClass}>External Video URL</label>
                    <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} className={inputClass} placeholder="https://youtube.com/watch?v=..." />
                    <p className="mt-1 text-xs text-slate-400">Embed a YouTube/Vimeo link.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100 my-8"></div>

          {/* Section 4: Map Location */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Map Location
            </h3>
            
            <div className="flex items-center justify-between mb-5 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div>
                <label className="text-sm font-medium text-slate-700">Include Map Location (Optional)</label>
                <p className="text-xs text-slate-500 mt-0.5">Show a map location for this property.</p>
              </div>
              <button
                type="button"
                onClick={() => setIncludeMap(!includeMap)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  includeMap ? "bg-slate-900" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    includeMap ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {includeMap && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Latitude</label>
                  <input type="text" name="mapLat" value={formData.mapLat} onChange={handleChange} className={inputClass} placeholder="6.9271" />
                </div>
                <div>
                  <label className={labelClass}>Longitude</label>
                  <input type="text" name="mapLng" value={formData.mapLng} onChange={handleChange} className={inputClass} placeholder="79.8612" />
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-slate-400">
                    Tip: You can get these coordinates by right-clicking on a location in Google Maps.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 my-8"></div>

          {/* Section 5: Features, Highlights & Amenities */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Features & Amenities
            </h3>
            
            {/* Quick Features Toggles */}
            <div className="mb-6">
              <label className={labelClass}>General Features</label>
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {commonFeatures.map((feat) => (
                  <button
                    type="button"
                    key={feat}
                    onClick={() => toggleArrayItem("features", feat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                      formData.features.split("\n").includes(feat)
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {feat}
                  </button>
                ))}
              </div>
              <textarea rows="3" name="features" value={formData.features} onChange={handleChange} className={inputClass} placeholder="One feature per line..."></textarea>
            </div>

            {/* Quick Highlights Toggles */}
            <div className="mb-6">
              <label className={labelClass}>Property Highlights</label>
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {commonHighlights.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleArrayItem("highlights", item)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                      formData.highlights.split("\n").includes(item)
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <textarea rows="3" name="highlights" value={formData.highlights} onChange={handleChange} className={inputClass} placeholder="One highlight per line..."></textarea>
            </div>

            {/* Quick Amenities Toggles */}
            <div className="mb-6">
              <label className={labelClass}>Building Amenities</label>
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {commonAmenities.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleArrayItem("amenities", item)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                      formData.amenities.split("\n").includes(item)
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <textarea rows="3" name="amenities" value={formData.amenities} onChange={handleChange} className={inputClass} placeholder="One amenity per line..."></textarea>
            </div>
          </div>

          <div className="border-t border-slate-100 my-8"></div>

          {/* Section 6: Descriptions */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Detailed Information
            </h3>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Description</label>
                <textarea rows="5" name="description" value={formData.description} onChange={handleChange} className={inputClass} placeholder="Write a detailed description of the property..."></textarea>
              </div>
              <div>
                <label className={labelClass}>Nearby Locations</label>
                <textarea rows="3" name="nearby" value={formData.nearby} onChange={handleChange} className={inputClass} placeholder="One per line (e.g., Schools, Hospitals, Shopping Malls)"></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Save Property
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProperty;