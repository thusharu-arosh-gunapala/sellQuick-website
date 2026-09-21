import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch properties from backend on mount
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const res = await API.get("/properties");
      setAllProperties(res.data);
      setFilteredProperties(res.data); // Initialize filtered list with all properties
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const normalizedLocation = location.trim().toLowerCase();

    const results = allProperties.filter((property) => {
      // Location match
      const matchesLocation =
        !normalizedLocation ||
        (property.location && property.location.toLowerCase().includes(normalizedLocation));
      
      // Type match
      const matchesType = !propertyType || property.type === propertyType;
      
      // Bedrooms match
      const matchesBedrooms = !bedrooms || (property.bedrooms && property.bedrooms >= Number(bedrooms));
      
      // Price match (handles both "$450,000" string or 450000 number from DB)
      const rawPrice = property.price || 0;
      const numericPrice = typeof rawPrice === "string" 
        ? Number(rawPrice.replace(/[^0-9]/g, "")) 
        : Number(rawPrice);
      const matchesPrice = !maxPrice || numericPrice <= Number(maxPrice);

      return matchesLocation && matchesType && matchesBedrooms && matchesPrice;
    });

    setFilteredProperties(results);
  };

  const handleReset = () => {
    setLocation("");
    setPropertyType("");
    setBedrooms("");
    setMaxPrice("");
    setFilteredProperties(allProperties);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-[linear-gradient(120deg,#0f172a_0%,#1e3a8a_55%,#0f172a_100%)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-blue-100 backdrop-blur-md">
            Discover Homes
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Find the right property faster
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
            Browse premium listings and refine your search with smart filters built for your next move.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
            />

            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="">Property Type</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
            </select>

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="">Bedrooms</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>

            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              <FaSearch />
              Search Properties
            </button>
            <button
              onClick={handleReset}
              className="rounded-full border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Available Listings</h2>
            <p className="mt-1 text-sm text-slate-600">
              Showing {filteredProperties.length} properties that match your search.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800">Loading properties...</h3>
            <p className="mt-2 text-slate-600">Please wait while we fetch the latest listings.</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          /* No Results State */
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800">No properties found</h3>
            <p className="mt-2 text-slate-600">Try changing your filters to see more results.</p>
          </div>
        ) : (
          /* Results Grid */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Properties;