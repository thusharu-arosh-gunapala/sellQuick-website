import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import API, { getMediaUrl } from "../services/api";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await API.get("/properties");
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchProperties();
    })();
  }, []);
  // 2. Added state for the search query
  const [searchQuery, setSearchQuery] = useState("");

  const statusStyles = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Sold: "bg-slate-100 text-slate-600",
  };

  // 3. Filter properties based on search query (Title, Location, or ID)
  const filteredProperties = properties.filter((property) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      (property.title || "").toLowerCase().includes(lowerCaseQuery) ||
      (property.location || "").toLowerCase().includes(lowerCaseQuery) ||
      (property._id || "").toLowerCase().includes(lowerCaseQuery)
    );
  });

  // 4. Delete function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await API.delete(`/properties/${id}`);
        setProperties(properties.filter((property) => property._id !== id));
      } catch (error) {
        console.log(error);
        alert("Failed to delete property");
      }
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Properties
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage all property listings
          </p>
        </div>
        <Link
          to="/admin/add-property"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors w-full sm:w-auto"
        >
          <FaPlus className="text-xs" />
          Add Property
        </Link>
      </div>

      {/* Search - Now controls the state */}
      <div className="mb-6 flex items-center gap-3 border border-slate-200 bg-white rounded-xl px-4 py-2.5 focus-within:border-slate-400 transition-colors">
        <FaSearch className="text-slate-400 text-sm flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by title, location, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
        />
      </div>

      {/* --- DESKTOP & TABLET VIEW (md and up) --- */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* 5. Conditional rendering for empty state vs map */}
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <tr key={property._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={getMediaUrl(property.images?.[0])}
                          alt={property.title}
                          className="w-11 h-11 rounded-lg object-cover border border-slate-100"
                        />
                        <div>
                          <h3 className="text-sm font-medium text-slate-800">
                            {property.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {property._id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                      {property.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusStyles[property.status]
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.isFeatured ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#A9814F]/10 text-[#A9814F]">
                          ★ Featured
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Regular</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/edit-property/${property._id}`}
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="text-sm" />
                        </Link>
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-sm text-slate-400">
                    No properties found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MOBILE VIEW (Cards) --- */}
      <div className="md:hidden space-y-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div 
              key={property._id} 
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
            >
              {/* Top Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={getMediaUrl(property.images?.[0])}
                    alt={property.title}
                    className="w-14 h-14 rounded-lg object-cover border border-slate-100"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {property.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {property._id} • {property.location}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    statusStyles[property.status]
                  }`}
                >
                  {property.status}
                </span>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400">Price</p>
                  <p className="text-base font-semibold text-slate-900 mt-0.5">
                    {property.price}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/edit-property/${property._id}`}
                    className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                    title="Edit"
                  >
                    <FaEdit className="text-sm" />
                  </Link>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl text-sm text-slate-400">
            No properties found matching your search.
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Properties;