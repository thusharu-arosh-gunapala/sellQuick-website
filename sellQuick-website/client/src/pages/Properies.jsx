import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const allProperties = [
    {
      id: 1,
      title: "Luxury Villa",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      price: "$450,000",
      numericPrice: 450000,
      location: "Colombo",
      bedrooms: 4,
      bathrooms: 3,
      type: "Villa",
    },
    {
      id: 2,
      title: "Modern Apartment",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
      price: "$280,000",
      numericPrice: 280000,
      location: "Kandy",
      bedrooms: 2,
      bathrooms: 2,
      type: "Apartment",
    },
    {
      id: 3,
      title: "Family House",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      price: "$320,000",
      numericPrice: 320000,
      location: "Galle",
      bedrooms: 3,
      bathrooms: 2,
      type: "House",
    },
    {
      id: 4,
      title: "Ocean View Villa",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
      price: "$610,000",
      numericPrice: 610000,
      location: "Matara",
      bedrooms: 5,
      bathrooms: 4,
      type: "Villa",
    },
  ];

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  const handleSearch = () => {
    const normalizedLocation = location.trim().toLowerCase();

    const results = allProperties.filter((property) => {
      const matchesLocation =
        !normalizedLocation || property.location.toLowerCase().includes(normalizedLocation);
      const matchesType = !propertyType || property.type === propertyType;
      const matchesBedrooms = !bedrooms || property.bedrooms >= Number(bedrooms);
      const matchesPrice = !maxPrice || property.numericPrice <= Number(maxPrice);

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
      <section className="bg-[linear-gradient(120deg,#0f172a_0%,#1e3a8a_55%,#0f172a_100%)] py-6 text-white sm:py-8">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-6">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-100 backdrop-blur-md">
            Discover Homes
          </span>
          <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Find the right property faster
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-200 sm:text-sm">
            Browse premium listings and refine your search with smart filters built for your next move.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />

            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="">Property Type</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
            </select>

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              <FaSearch />
              Search
            </button>
            <button
              onClick={handleReset}
              className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-red-600 hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Available Listings</h2>
            <p className="mt-1 text-sm text-slate-600">
              Showing {filteredProperties.length} properties that match your search.
            </p>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800">No properties found</h3>
            <p className="mt-2 text-slate-600">Try changing your filters to see more results.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Properties;
