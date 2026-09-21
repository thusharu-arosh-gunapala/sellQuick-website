import { useState } from "react";
import PropertyCard from "../components/PropertyCard";

const Search = () => {
  const allProperties = [
    {
      id: 1,
      title: "Luxury Villa",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      price: 450000,
      location: "Colombo",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
    },
    {
      id: 2,
      title: "Modern Apartment",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      price: 300000,
      location: "Kandy",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      id: 3,
      title: "Family House",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      price: 250000,
      location: "Galle",
      type: "House",
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 4,
      title: "Beach Villa",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      price: 600000,
      location: "Matara",
      type: "Villa",
      bedrooms: 5,
      bathrooms: 4,
    },
  ];

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState(allProperties);

  const handleSearch = () => {
    let filtered = allProperties;

    if (location) {
      filtered = filtered.filter((property) =>
        property.location
          .toLowerCase()
          .includes(location.toLowerCase())
      );
    }

    if (propertyType) {
      filtered = filtered.filter(
        (property) => property.type === propertyType
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (property) => property.price <= Number(maxPrice)
      );
    }

    setResults(filtered);
  };

  const handleReset = () => {
    setLocation("");
    setPropertyType("");
    setMaxPrice("");
    setResults(allProperties);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800">
            Find Your Dream Property
          </h1>

          <p className="text-gray-500 mt-3">
            Search houses, apartments, villas and lands
          </p>
        </div>

        {/* Search Box */}

        <div className="bg-white p-6 rounded-3xl shadow-lg mb-10">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-3 rounded-xl outline-none"
            />

            <select
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value)
              }
              className="border p-3 rounded-xl outline-none"
            >
              <option value="">Property Type</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Apartment">
                Apartment
              </option>
            </select>

            <input
              type="number"
              placeholder="Maximum Price"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
              className="border p-3 rounded-xl outline-none"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Search
              </button>

              <button
                onClick={handleReset}
                className="flex-1 bg-gray-300 rounded-xl hover:bg-red-600 hover:text-white transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Search Results
          </h2>

          <span className="text-gray-500">
            {results.length} Properties Found
          </span>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Properties Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search filters
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;